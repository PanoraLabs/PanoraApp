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
    val: 'Rp 10M',
    profit: '+Rp 1.8M',
    pct: 72,
    profitColor: 'text-sprout',
  },
  {
    crop: 'coffee',
    code: 'Toraja Arabica',
    sub: 'Coffee Export · Sulawesi',
    val: 'Rp 25M',
    profit: '+Rp 5.5M',
    pct: 67,
    profitColor: 'text-sprout',
  },
  {
    crop: 'shallot',
    code: 'Shallot · Brebes',
    sub: 'Greenhouse · Central Java',
    val: 'Rp 8M',
    profit: '70 days to go',
    pct: 30,
    profitColor: 'text-gold',
    gold: true,
  },
]

export interface PortfolioAllocation {
  color: string
  label: string
}

export const portfolioAllocations: PortfolioAllocation[] = [
  { color: '#5DBB7A', label: 'Greenhouse 55%' },
  { color: '#C8961E', label: 'Coffee & Spice 35%' },
  { color: 'rgba(255,255,255,0.3)', label: 'Grains 10%' },
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
    sub: 'Apr 2 · Rp 4,000,000 sent to farmer',
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
