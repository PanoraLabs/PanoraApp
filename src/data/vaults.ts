import type { CropKey } from '@/lib/icons'

export type VaultStatus = 'Growing' | 'Early stage' | 'Open' | 'Closing soon' | 'Sold out'

export interface ActiveVault {
  crop: CropKey
  status: VaultStatus
  type: string
  name: string
  loc: string
  staked: string
  apy: string
  daysLeft: string
  pct: number
  gold?: boolean
}

export interface ExploreVault {
  crop: CropKey
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
    crop: 'chili',
    status: 'Growing',
    type: 'Greenhouse · West Java',
    name: 'Red Chili · Subang',
    loc: 'Subang, West Java',
    staked: 'Rp 10M',
    apy: '18%',
    daysLeft: '25 days to harvest',
    pct: 72,
  },
  {
    crop: 'coffee',
    status: 'Growing',
    type: 'Coffee Export · Sulawesi',
    name: 'Toraja Arabica',
    loc: 'Toraja, South Sulawesi',
    staked: 'Rp 25M',
    apy: '22%',
    daysLeft: '60 days to harvest',
    pct: 67,
  },
  {
    crop: 'shallot',
    status: 'Early stage',
    type: 'Greenhouse · Central Java',
    name: 'Shallot · Brebes',
    loc: 'Brebes, Central Java',
    staked: 'Rp 8M',
    apy: '16%',
    daysLeft: '70 days to harvest',
    pct: 30,
    gold: true,
  },
]

export const exploreVaults: ExploreVault[] = [
  {
    crop: 'chili',
    type: 'Greenhouse · West Java',
    name: 'Red Chili · Subang',
    loc: 'Subang',
    status: 'Open',
    statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 20M',
    apy: '18%',
    duration: '90 days',
    funded: 78,
  },
  {
    crop: 'vanilla',
    type: 'Spice Export · Central Java',
    name: 'Vanilla · Temanggung',
    loc: 'Temanggung',
    status: 'Closes in 48h',
    statusClass: 'bg-gold text-white',
    target: 'Rp 50M',
    apy: '24%',
    duration: 'Rp 1M',
    durationLabel: 'Min Stake',
    funded: 0,
    highlight: true,
  },
  {
    crop: 'coffee',
    type: 'Coffee Export · Sulawesi',
    name: 'Toraja Arabica Coffee',
    loc: 'Toraja',
    status: 'Sold out',
    statusClass: 'bg-stone/12 text-stone',
    target: 'Rp 100M',
    apy: '22%',
    duration: '6 months',
    funded: 100,
    full: true,
  },
  {
    crop: 'rice',
    type: 'Bulk Grains · West Java',
    name: 'Karawang Premium Rice',
    loc: 'Karawang',
    status: 'Open',
    statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 200M',
    apy: '11%',
    duration: '130 days',
    funded: 55,
  },
]

export interface ExploreFilter {
  label: string
  active: boolean
}

export const exploreFilters: ExploreFilter[] = [
  { label: 'All', active: true },
  { label: 'Vegetables', active: false },
  { label: 'Coffee & Spice', active: false },
  { label: 'Grains', active: false },
  { label: 'Just opened', active: false },
]
