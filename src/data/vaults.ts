export type VaultStatus = 'Active' | 'Growing' | 'Open' | 'OPEN · 48h left' | 'Full'

export interface ActiveVault {
  emoji: string
  status: VaultStatus
  type: string
  name: string
  loc: string
  staked: string
  apy: string
  day: string
  pct: number
  gold?: boolean
}

export interface ExploreVault {
  emoji: string
  type: string
  name: string
  loc: string
  status: string
  statusClass: string
  target: string
  apy: string
  duration: string
  durationLabel?: string
  funded: number
  highlight?: boolean
  full?: boolean
}

export const activeVaults: ActiveVault[] = [
  {
    emoji: '🌶️',
    status: 'Active',
    type: 'Greenhouse · West Java',
    name: 'Red Chili Subang',
    loc: 'Subang, West Java',
    staked: 'Rp 10M',
    apy: '18%',
    day: '65/90',
    pct: 72,
  },
  {
    emoji: '☕',
    status: 'Active',
    type: 'Export RWA · Sulawesi',
    name: 'Toraja Arabica',
    loc: 'Toraja, South Sulawesi',
    staked: 'Rp 25M',
    apy: '22%',
    day: '120/180',
    pct: 67,
  },
  {
    emoji: '🧅',
    status: 'Growing',
    type: 'Greenhouse · Central Java',
    name: 'Shallot Brebes',
    loc: 'Brebes, Central Java',
    staked: 'Rp 8M',
    apy: '16%',
    day: '30/100',
    pct: 30,
    gold: true,
  },
]

export const exploreVaults: ExploreVault[] = [
  {
    emoji: '🌶️',
    type: 'Greenhouse · West Java',
    name: 'Red Chili Subang',
    loc: 'Subang',
    status: 'Active',
    statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 20M',
    apy: '18%',
    duration: '90 days',
    funded: 78,
  },
  {
    emoji: '🌸',
    type: 'Export RWA · Central Java',
    name: 'Vanilla Temanggung',
    loc: 'Temanggung',
    status: 'OPEN · 48h left',
    statusClass: 'bg-gold text-white',
    target: 'Rp 50M',
    apy: '24%',
    duration: 'Rp 1M',
    durationLabel: 'Min Stake',
    funded: 0,
    highlight: true,
  },
  {
    emoji: '☕',
    type: 'Export RWA · Sulawesi',
    name: 'Toraja Arabica Coffee',
    loc: 'Toraja',
    status: 'Full',
    statusClass: 'bg-stone/12 text-stone',
    target: 'Rp 100M',
    apy: '22%',
    duration: '6 mos',
    funded: 100,
    full: true,
  },
  {
    emoji: '🌾',
    type: 'Bulk Commodity · West Java',
    name: 'Karawang Premium Rice',
    loc: 'Karawang',
    status: 'Open',
    statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 200M',
    apy: '11%',
    duration: '130d',
    funded: 55,
  },
]

export interface ExploreFilter {
  label: string
  active: boolean
}

export const exploreFilters: ExploreFilter[] = [
  { label: 'All', active: true },
  { label: '🌶️ Greenhouse', active: false },
  { label: '☕ Export RWA', active: false },
  { label: '🌾 Bulk', active: false },
  { label: '🆕 Open Now', active: false },
]
