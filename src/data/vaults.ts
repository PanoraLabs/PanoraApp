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

// Explore vaults come from core-services now (GET /app/vaults).
export const exploreVaults: ExploreVault[] = []

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
