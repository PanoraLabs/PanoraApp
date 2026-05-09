import { portfolioAllocations, portfolioMilestones } from '@/data/positions'
import { useDemoStore } from '@/store/demo-store'

export function usePositions() {
  return useDemoStore((s) => s.positions)
}

export function usePortfolioAllocations() {
  return portfolioAllocations
}

export function usePortfolioMilestones() {
  return portfolioMilestones
}
