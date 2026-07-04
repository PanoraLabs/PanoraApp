import { useCallback, useEffect, useMemo } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import {
  useWallets as useSolanaWallets,
  useCreateWallet as useCreateSolanaWallet,
} from '@privy-io/react-auth/solana'
import { useAppStore, type StoredUser } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { getProfile, putProfile, setApiTokenGetter, type ProfileRow } from '@/lib/api'

// Module-level guards so the fetch and wallet creation each happen once per
// Privy id across the whole app, regardless of how many components mount
// useUser. A useRef-based guard is per-instance and gets reset on unmount —
// which caused an infinite refetch loop here, since `isLoadingProfile` toggles
// AuthGate, which unmounts/remounts children that also call useUser.
let fetchedForId: string | null = null
let fetchInFlightForId: string | null = null
let creatingWalletForId: string | null = null
let hydratedForId: string | null = null

export type AppUser = StoredUser

interface UseUserReturn {
  user: AppUser | null
  isReady: boolean
  isAuthenticated: boolean
  hasProfile: boolean
  isLoadingProfile: boolean
  walletAddress: string | null
  googleName: string | null
  googleEmail: string | null
  googleAvatar: string | null
  saveProfile: (name: string) => Promise<void>
  updateName: (name: string) => Promise<void>
  signOut: () => Promise<void>
}

function rowToUser(row: ProfileRow): AppUser {
  return {
    id: row.id,
    privyId: row.privy_id,
    email: row.email,
    name: row.name,
    walletAddress: row.wallet_address,
    avatarUrl: row.avatar_url,
  }
}

export function useUser(): UseUserReturn {
  const { ready, authenticated, user: privyUser, getAccessToken, logout } = usePrivy()
  const { wallets } = useSolanaWallets()
  const { createWallet } = useCreateSolanaWallet()

  const profile = useAppStore((s) => s.user)
  const setProfile = useAppStore((s) => s.setUser)
  const isLoadingProfile = useAppStore((s) => s.isLoadingProfile)
  const setIsLoadingProfile = useAppStore((s) => s.setIsLoadingProfile)

  const walletAddress = useMemo<string | null>(() => {
    if (wallets[0]?.address) return wallets[0].address
    const linked = privyUser?.linkedAccounts ?? []
    type Linked = { type?: string; chainType?: string; address?: string }
    const solana = (linked as Linked[]).find(
      (a) => a?.type === 'wallet' && a?.chainType === 'solana' && Boolean(a?.address)
    )
    return solana?.address ?? null
  }, [wallets, privyUser?.linkedAccounts])

  // Wire Privy's JWT getter to the core-services API client (/app/* bearer auth).
  useEffect(() => {
    const tokenGetter = async () => {
      try {
        return (await getAccessToken()) ?? null
      } catch {
        return null
      }
    }
    setApiTokenGetter(tokenGetter)
  }, [getAccessToken])

  // Hydrate investor state (cash/positions/activeVaults/claimables) from
  // core-services once per authenticated user. Module-guarded like the profile
  // fetch so remounts don't refetch.
  useEffect(() => {
    if (!ready || !authenticated || !privyUser?.id) {
      hydratedForId = null
      return
    }
    if (hydratedForId === privyUser.id) return
    hydratedForId = privyUser.id
    useDemoStore.getState().hydrate()
  }, [ready, authenticated, privyUser?.id])

  // Auto-create a Solana embedded wallet if Privy didn't on login. Guarded at
  // module scope so multiple useUser consumers don't each fire a creation.
  useEffect(() => {
    if (!ready || !authenticated || walletAddress) return
    const id = privyUser?.id ?? '__anon__'
    if (creatingWalletForId === id) return
    creatingWalletForId = id
    createWallet()
      .catch((err) => {
        console.warn('[useUser] createWallet:', err)
      })
      .finally(() => {
        if (creatingWalletForId === id) creatingWalletForId = null
      })
  }, [ready, authenticated, walletAddress, privyUser?.id, createWallet])

  // Fetch profile exactly once per Privy user id, deduped at module scope.
  // A per-instance ref isn't enough: AuthGate flips on `isLoadingProfile`,
  // which unmounts other useUser consumers and resets their refs — that was
  // causing an infinite refetch loop.
  useEffect(() => {
    if (!ready || !authenticated || !privyUser?.id) {
      fetchedForId = null
      fetchInFlightForId = null
      return
    }
    if (fetchedForId === privyUser.id || fetchInFlightForId === privyUser.id) return
    fetchInFlightForId = privyUser.id
    setIsLoadingProfile(true)
    const id = privyUser.id
    getProfile()
      .then((row) => {
        fetchedForId = id
        setProfile(row ? rowToUser(row) : null)
      })
      .catch((err) => {
        console.error('[useUser] fetchProfile failed', err)
        // Mark as fetched so we don't loop on a failed request — user can
        // retry via the splash escape hatch (sign out).
        fetchedForId = id
        setProfile(null)
      })
      .finally(() => {
        if (fetchInFlightForId === id) fetchInFlightForId = null
        setIsLoadingProfile(false)
      })
  }, [ready, authenticated, privyUser?.id, setProfile, setIsLoadingProfile])

  const saveProfile = useCallback(
    async (name: string) => {
      if (!privyUser?.id) throw new Error('Not authenticated')
      if (!walletAddress) throw new Error('Wallet not ready yet')
      const email = privyUser.email?.address ?? privyUser.google?.email ?? null
      const row = await putProfile({ email, name, walletAddress, avatarUrl: null })
      setProfile(rowToUser(row))
    },
    [privyUser?.id, privyUser?.email?.address, privyUser?.google?.email, walletAddress, setProfile]
  )

  const updateName = useCallback(
    async (name: string) => {
      if (!privyUser?.id) throw new Error('Not authenticated')
      const wallet = walletAddress ?? profile?.walletAddress
      if (!wallet) throw new Error('Wallet not ready yet')
      const email = privyUser.email?.address ?? privyUser.google?.email ?? profile?.email ?? null
      const row = await putProfile({ email, name, walletAddress: wallet, avatarUrl: profile?.avatarUrl ?? null })
      setProfile(rowToUser(row))
    },
    [privyUser?.id, privyUser?.email?.address, privyUser?.google?.email, walletAddress, profile, setProfile]
  )

  const signOut = useCallback(async () => {
    await logout()
    setProfile(null)
  }, [logout, setProfile])

  return {
    user: profile,
    isReady: ready,
    isAuthenticated: authenticated,
    hasProfile: profile !== null,
    isLoadingProfile,
    walletAddress,
    googleName: privyUser?.google?.name ?? null,
    googleEmail: privyUser?.google?.email ?? null,
    googleAvatar: null,
    saveProfile,
    updateName,
    signOut,
  }
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '?'
}
