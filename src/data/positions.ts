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

export const positions: Position[] = [
  {
    crop: 'chili',
    code: 'Red Chili · Subang',
    sub: 'Greenhouse · West Java',
    val: '$0',
    profit: '+$0',
    pct: 0,
    profitColor: 'text-sprout',
  },
  {
    crop: 'coffee',
    code: 'Toraja Arabica',
    sub: 'Coffee Export · Sulawesi',
    val: '$0',
    profit: '+$0',
    pct: 0,
    profitColor: 'text-sprout',
  },
  {
    crop: 'shallot',
    code: 'Shallot · Brebes',
    sub: 'Greenhouse · Central Java',
    val: '$0',
    profit: '0 days to go',
    pct: 0,
    profitColor: 'text-gold',
    gold: true,
  },
]

export interface PortfolioAllocation {
  color: string
  label: string
}

export const portfolioAllocations: PortfolioAllocation[] = [
  { color: '#5DBB7A', label: 'Greenhouse 0%' },
  { color: '#C8961E', label: 'Coffee & Spice 0%' },
  { color: 'rgba(255,255,255,0.3)', label: 'Grains 0%' },
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
