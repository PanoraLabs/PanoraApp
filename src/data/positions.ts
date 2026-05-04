export interface Position {
  emoji: string
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
    emoji: '🌶️',
    code: 'CHILI-GH-SUBANG-Q2',
    sub: 'Greenhouse · West Java',
    val: 'Rp 10M',
    profit: '+Rp 1.8M',
    pct: 72,
    profitColor: 'text-sprout',
  },
  {
    emoji: '☕',
    code: 'COFFEE-TORAJA-Q1',
    sub: 'Export RWA · Sulawesi',
    val: 'Rp 25M',
    profit: '+Rp 5.5M',
    pct: 67,
    profitColor: 'text-sprout',
  },
  {
    emoji: '🧅',
    code: 'SHALLOT-BREBES-Q2',
    sub: 'Greenhouse · Central Java',
    val: 'Rp 8M',
    profit: 'Day 30/100',
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
  { color: '#C8961E', label: 'Export RWA 35%' },
  { color: 'rgba(255,255,255,0.3)', label: 'Bulk 10%' },
]

export interface Milestone {
  dot: string
  icon: string
  title: string
  sub: string
}

export const portfolioMilestones: Milestone[] = [
  {
    dot: 'bg-sprout text-white',
    icon: '✓',
    title: 'Setup & Seeds (40%)',
    sub: 'Disbursed Apr 2 · Rp 4,000,000',
  },
  {
    dot: 'bg-gold text-white',
    icon: '!',
    title: 'Mid-Season Nutrients (30%)',
    sub: 'Awaiting PoA verification',
  },
  {
    dot: 'bg-surface border-[1.5px] border-input text-stone',
    icon: '3',
    title: 'Harvest & Logistics (30%)',
    sub: 'Pending · Est. Jun 28',
  },
]
