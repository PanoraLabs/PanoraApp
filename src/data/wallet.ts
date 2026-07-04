import type { CropKey } from '@/lib/icons'

export interface ParticipationToken {
  crop: CropKey
  code: string
  principal: string
}

export interface Claimable {
  code: string
  settledOn: string
  amount: string
}

export const walletAddress = '5xKj...PqRst'

export const walletBalances = {
  cash: '$0',
  cashLabel: 'USDC',
  fees: '0 SOL',
}

// Claimables come from core-services now (derived from completed positions).
export const claimables: Claimable[] = []

// Empty by default — populated when the user invests.
export const participationTokens: ParticipationToken[] = []
