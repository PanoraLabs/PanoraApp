import { useUser } from '@/hooks/useUser'
import { useDemoStore } from '@/store/demo-store'
import { formatUsdCompact } from '@/lib/format'
import { walletAddress as fallbackAddress } from '@/data/wallet'

function shortenAddress(addr: string, head = 4, tail = 4): string {
  if (addr.length <= head + tail + 3) return addr
  return `${addr.slice(0, head)}...${addr.slice(-tail)}`
}

export function useWallet() {
  const { user } = useUser()
  const cashUsd = useDemoStore((s) => s.cashUsd)
  const feesSol = useDemoStore((s) => s.feesSol)
  const address = user?.walletAddress ? shortenAddress(user.walletAddress) : fallbackAddress
  return {
    address,
    fullAddress: user?.walletAddress ?? null,
    balances: {
      cash: formatUsdCompact(cashUsd),
      cashLabel: 'USD',
      fees: `${feesSol.toFixed(2)} SOL`,
    },
  }
}

export function useClaimables() {
  return useDemoStore((s) => s.claimables)
}

export function useParticipationTokens() {
  return useDemoStore((s) => s.participationTokens)
}
