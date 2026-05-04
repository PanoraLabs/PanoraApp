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
  cash: '$2,840',
  cashLabel: 'USDC',
  fees: '4.21 SOL',
}

export const claimables: Claimable[] = [
  {
    code: 'Cacao Flores · 2025',
    settledOn: 'Settled Apr 10, 2026',
    amount: 'Rp 1,820,000',
  },
]

export const participationTokens: ParticipationToken[] = [
  { crop: 'chili', code: 'Red Chili · Subang', principal: 'Rp 10M invested' },
  { crop: 'coffee', code: 'Toraja Arabica', principal: 'Rp 25M invested' },
  { crop: 'shallot', code: 'Shallot · Brebes', principal: 'Rp 8M invested' },
]
