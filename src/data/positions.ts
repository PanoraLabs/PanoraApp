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

// Empty until the user has investments — allocations come from live positions.
export const portfolioAllocations: PortfolioAllocation[] = []

export type MilestoneState = 'done' | 'pending' | 'upcoming'

export interface Milestone {
  state: MilestoneState
  label: string
  title: string
  sub: string
}

export const portfolioMilestones: Milestone[] = []
