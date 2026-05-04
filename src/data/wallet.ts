export interface ParticipationToken {
  emoji: string
  code: string
  principal: string
}

export interface Claimable {
  code: string
  settledOn: string
  amount: string
}

export const walletAddress = '5xKj...Ab3mPqRst'

export const walletBalances = {
  usdc: '$2,840',
  sol: '4.21',
}

export const claimables: Claimable[] = [
  {
    code: 'CACAO-FLORES-Q4-25',
    settledOn: 'Settled Apr 10, 2026',
    amount: 'Rp 1,820,000',
  },
]

export const participationTokens: ParticipationToken[] = [
  { emoji: '🌶️', code: 'PT-CHILI-GH-Q2', principal: 'Rp 10M principal' },
  { emoji: '☕', code: 'PT-COFFEE-TORAJA-Q1', principal: 'Rp 25M principal' },
  { emoji: '🧅', code: 'PT-SHALLOT-BREBES-Q2', principal: 'Rp 8M principal' },
]
