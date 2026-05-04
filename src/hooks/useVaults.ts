import { activeVaults, exploreVaults, exploreFilters } from '@/data/vaults'

export function useActiveVaults() {
  return activeVaults
}

export function useExploreVaults() {
  return exploreVaults
}

export function useExploreFilters() {
  return exploreFilters
}
