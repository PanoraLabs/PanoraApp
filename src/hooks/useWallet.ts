import { claimables, participationTokens, walletAddress, walletBalances } from '@/data/wallet'
import { useUser } from '@/hooks/useUser'

function shortenAddress(addr: string, head = 4, tail = 4): string {
  if (addr.length <= head + tail + 3) return addr
  return `${addr.slice(0, head)}...${addr.slice(-tail)}`
}

export function useWallet() {
  const { user } = useUser()
  const address = user?.walletAddress ? shortenAddress(user.walletAddress) : walletAddress
  return { address, fullAddress: user?.walletAddress ?? null, balances: walletBalances }
}

export function useClaimables() {
  return claimables
}

export function useParticipationTokens() {
  return participationTokens
}
