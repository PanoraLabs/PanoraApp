import { claimables, participationTokens, walletAddress, walletBalances } from '@/data/wallet'

export function useWallet() {
  return { address: walletAddress, balances: walletBalances }
}

export function useClaimables() {
  return claimables
}

export function useParticipationTokens() {
  return participationTokens
}
