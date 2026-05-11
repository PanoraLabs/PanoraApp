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

export const claimables: Claimable[] = [
  {
    code: 'Cacao Flores · 2025',
    settledOn: 'Settled Apr 10, 2026',
    amount: '$0',
  },
]

export const participationTokens: ParticipationToken[] = [
  { crop: 'chili', code: 'Red Chili · Subang', principal: '$0 invested' },
  { crop: 'coffee', code: 'Toraja Arabica', principal: '$0 invested' },
  { crop: 'shallot', code: 'Shallot · Brebes', principal: '$0 invested' },
]
