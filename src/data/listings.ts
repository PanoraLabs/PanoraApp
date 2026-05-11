import type { CropKey } from '@/lib/icons'

export interface MarketListing {
  crop: CropKey
  code: string
  day: string
  price: string
  chg: string
  up: boolean
}

export const marketListings: MarketListing[] = [
  {
    crop: 'chili',
    code: 'Red Chili · Subang',
    day: '0 days to harvest · Greenhouse',
    price: '$0',
    chg: '+0% vs entry',
    up: true,
  },
  {
    crop: 'coffee',
    code: 'Toraja Arabica',
    day: '0 days to harvest · Coffee',
    price: '$0',
    chg: '+0% vs entry',
    up: true,
  },
  {
    crop: 'shallot',
    code: 'Shallot · Brebes',
    day: '0 days to harvest · Greenhouse',
    price: '$0',
    chg: '+0% vs entry',
    up: true,
  },
  {
    crop: 'rice',
    code: 'Karawang Rice',
    day: '0 days to harvest · Grains',
    price: '$0',
    chg: '+0% vs entry',
    up: true,
  },
  {
    crop: 'vanilla',
    code: 'Vanilla · Temanggung',
    day: '0 days to harvest · Spice',
    price: '$0',
    chg: '+0% vs entry',
    up: true,
  },
]
