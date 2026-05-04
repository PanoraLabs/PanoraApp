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
    day: '25 days to harvest · Greenhouse',
    price: 'Rp 10,850,000',
    chg: '+8.5% vs entry',
    up: true,
  },
  {
    crop: 'coffee',
    code: 'Toraja Arabica',
    day: '60 days to harvest · Coffee',
    price: 'Rp 25,200,000',
    chg: '+12.1% vs entry',
    up: true,
  },
  {
    crop: 'shallot',
    code: 'Shallot · Brebes',
    day: '70 days to harvest · Greenhouse',
    price: 'Rp 5,050,000',
    chg: '+1.0% vs entry',
    up: true,
  },
  {
    crop: 'rice',
    code: 'Karawang Rice',
    day: '42 days to harvest · Grains',
    price: 'Rp 8,400,000',
    chg: '+5.2% vs entry',
    up: true,
  },
  {
    crop: 'vanilla',
    code: 'Vanilla · Temanggung',
    day: '256 days to harvest · Spice',
    price: 'Rp 4,800,000',
    chg: '−2.1% vs entry',
    up: false,
  },
]
