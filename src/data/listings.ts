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

// Seed marketplace — three other-user listings the demo user can buy from.
export const marketListings: MarketListing[] = [
  {
    crop: 'chili',
    code: 'Red Chili · Subang',
    day: '45 days to harvest · Greenhouse',
    price: '$1,200',
    chg: '+12% vs entry',
    up: true,
  },
  {
    crop: 'coffee',
    code: 'Toraja Arabica',
    day: '120 days to harvest · Coffee',
    price: '$2,800',
    chg: '+8% vs entry',
    up: true,
  },
  {
    crop: 'rice',
    code: 'Karawang Rice',
    day: '60 days to harvest · Grains',
    price: '$650',
    chg: '+5% vs entry',
    up: true,
  },
]
