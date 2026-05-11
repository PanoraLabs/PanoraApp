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

// Empty by default — populated by the demo store as the user invests.
export const activeVaults: ActiveVault[] = []

export const exploreVaults: ExploreVault[] = [
  {
    crop: 'chili',
    type: 'Greenhouse · West Java',
    name: 'Red Chili · Subang',
    loc: 'Subang',
    status: 'Open',
    statusClass: 'bg-leaf/15 text-leaf',
    target: '$120k',
    apy: '18%',
    duration: '90 days',
    funded: 62,
  },
  {
    crop: 'vanilla',
    type: 'Spice Export · Central Java',
    name: 'Vanilla · Temanggung',
    loc: 'Temanggung',
    status: 'Closes in 48h',
    statusClass: 'bg-gold text-white',
    target: '$95k',
    apy: '24%',
    duration: '120 days',
    funded: 81,
    highlight: true,
  },
  {
    crop: 'coffee',
    type: 'Coffee Export · Sulawesi',
    name: 'Toraja Arabica Coffee',
    loc: 'Toraja',
    status: 'Sold out',
    statusClass: 'bg-stone/12 text-stone',
    target: '$200k',
    apy: '15%',
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
    target: '$80k',
    apy: '12%',
    duration: '75 days',
    funded: 34,
  },
  {
    crop: 'shallot',
    type: 'Greenhouse · Central Java',
    name: 'Shallot · Brebes',
    loc: 'Brebes',
    status: 'Open',
    statusClass: 'bg-leaf/15 text-leaf',
    target: '$60k',
    apy: '16%',
    duration: '60 days',
    funded: 22,
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
