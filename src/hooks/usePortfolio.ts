import { portfolioAllocations as fallbackAllocations, portfolioMilestones, type PortfolioAllocation } from '@/data/positions'
import { useDemoStore } from '@/store/demo-store'
import { parseUsd } from '@/lib/format'
import type { CropKey } from '@/lib/icons'

export function usePositions() {
  return useDemoStore((s) => s.positions)
}

const CROP_CATEGORY: Record<CropKey, { label: string; color: string }> = {
  chili: { label: 'Greenhouse', color: '#5DBB7A' },
  shallot: { label: 'Greenhouse', color: '#5DBB7A' },
  coffee: { label: 'Coffee & Spice', color: '#C8961E' },
  vanilla: { label: 'Coffee & Spice', color: '#C8961E' },
  cacao: { label: 'Coffee & Spice', color: '#C8961E' },
  rice: { label: 'Grains', color: 'rgba(255,255,255,0.55)' },
}

export function usePortfolioAllocations(): PortfolioAllocation[] {
  const positions = useDemoStore((s) => s.positions)
  if (positions.length === 0) return fallbackAllocations

  const byCategory = new Map<string, { color: string; total: number }>()
  let grand = 0
  for (const p of positions) {
    const cat = CROP_CATEGORY[p.crop] ?? { label: 'Other', color: 'rgba(255,255,255,0.3)' }
    const usd = parseUsd(p.val)
    grand += usd
    const prev = byCategory.get(cat.label)
    byCategory.set(cat.label, { color: cat.color, total: (prev?.total ?? 0) + usd })
  }
  if (grand === 0) return fallbackAllocations

  return [...byCategory.entries()].map(([label, { color, total }]) => ({
    color,
    label: `${label} ${Math.round((total / grand) * 100)}%`,
  }))
}

export function usePortfolioMilestones() {
  return portfolioMilestones
}

// Aggregate values across all positions: how much invested, what's the est. profit at harvest,
// what's the weighted average APY, and overall gain %.
export function usePortfolioSummary() {
  const positions = useDemoStore((s) => s.positions)
  const activeVaults = useDemoStore((s) => s.activeVaults)

  let investedUsd = 0
  let estProfitUsd = 0
  let weightedApy = 0

  for (const p of positions) {
    const principal = parseUsd(p.val)
    investedUsd += principal
    // Only count profit when the label looks monetary (has $ or compact suffix).
    const profitMatch = /\+\$?[\d,.]+[kMB]?/i.exec(p.profit)
    const positionEst = profitMatch ? parseUsd(profitMatch[0]) : 0
    estProfitUsd += positionEst
    // Pull APY from the matching vault, else infer from this position's est. profit.
    const vault = activeVaults.find((v) => v.name === p.code)
    const apy = vault
      ? parseFloat(vault.apy) || 0
      : principal > 0
        ? (positionEst / principal) * 100
        : 0
    weightedApy += apy * principal
  }

  const avgApy = investedUsd > 0 ? Math.round(weightedApy / investedUsd) : 0
  const gainPercent = investedUsd > 0 ? Math.round((estProfitUsd / investedUsd) * 100) : 0

  return { investedUsd, estProfitUsd, avgApy, gainPercent }
}
