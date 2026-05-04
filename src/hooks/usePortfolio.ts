import { positions, portfolioAllocations, portfolioMilestones } from '@/data/positions'

export function usePositions() {
  return positions
}

export function usePortfolioAllocations() {
  return portfolioAllocations
}

export function usePortfolioMilestones() {
  return portfolioMilestones
}
