import type { CropKey } from '@/lib/icons'

export interface Position {
  crop: CropKey
  code: string
  sub: string
  val: string
  profit: string
  pct: number
  profitColor: string
  gold?: boolean
}

// Empty by default — populated by the demo store as the user invests.
export const positions: Position[] = []

export interface PortfolioAllocation {
  color: string
  label: string
}

// Fallback shown only when the user has no investments yet.
export const portfolioAllocations: PortfolioAllocation[] = [
  { color: '#5DBB7A', label: 'Greenhouse —' },
  { color: '#C8961E', label: 'Coffee & Spice —' },
  { color: 'rgba(255,255,255,0.3)', label: 'Grains —' },
]

export type MilestoneState = 'done' | 'pending' | 'upcoming'

export interface Milestone {
  state: MilestoneState
  label: string
  title: string
  sub: string
}

export const portfolioMilestones: Milestone[] = [
  {
    state: 'done',
    label: '1',
    title: 'Seeds & setup paid',
    sub: 'Apr 2 · $0 sent to farmer',
  },
  {
    state: 'pending',
    label: '2',
    title: 'Mid-season check',
    sub: 'Waiting for farm verification',
  },
  {
    state: 'upcoming',
    label: '3',
    title: 'Harvest & shipping',
    sub: 'Estimated Jun 28',
  },
]
