import { useEffect, useState } from 'react'
import { exploreFilters, type ExploreVault } from '@/data/vaults'
import type { CropKey } from '@/lib/icons'
import { useDemoStore } from '@/store/demo-store'
import { getExploreVaults, type ApiExploreVault } from '@/lib/api'

export function useActiveVaults() {
  return useDemoStore((s) => s.activeVaults)
}

// Presentation-only class, derived from the funding status the API returns.
function statusClass(status: string): string {
  if (status === 'Sold out') return 'bg-stone/12 text-stone'
  return 'bg-leaf/15 text-leaf'
}

function toLocal(v: ApiExploreVault): ExploreVault {
  return { ...v, crop: v.crop as CropKey, statusClass: statusClass(v.status) }
}

// Explore feed now comes from core-services (single source of truth). Starts
// empty, fills after fetch — call sites already handle an empty array.
export function useExploreVaults() {
  const [vaults, setVaults] = useState<ExploreVault[]>([])
  useEffect(() => {
    let alive = true
    getExploreVaults()
      .then((rows) => { if (alive) setVaults(rows.map(toLocal)) })
      .catch((err) => { console.warn('[useVaults] getExploreVaults:', err); if (alive) setVaults([]) })
    return () => { alive = false }
  }, [])
  return vaults
}

export function useExploreFilters() {
  return exploreFilters
}
