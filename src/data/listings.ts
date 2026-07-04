import type { CropKey } from '@/lib/icons'

export interface MarketListing {
  crop: CropKey
  code: string
  day: string
  price: string
  chg: string
  up: boolean
  owned?: boolean
}

// Marketplace listings come from core-services now (GET /app/market/listings).
export const marketListings: MarketListing[] = []
