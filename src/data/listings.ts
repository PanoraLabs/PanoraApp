export interface MarketListing {
  emoji: string
  code: string
  day: string
  price: string
  chg: string
  up: boolean
}

export const marketListings: MarketListing[] = [
  {
    emoji: '🌶️',
    code: 'CHILI-GH-SUBANG-Q2',
    day: 'Day 65 of 90 · Greenhouse',
    price: 'Rp 10,850,000',
    chg: '↑ +8.5% vs entry',
    up: true,
  },
  {
    emoji: '☕',
    code: 'COFFEE-HYB-TORAJA-Q1',
    day: 'Day 120 of 180 · Export RWA',
    price: 'Rp 25,200,000',
    chg: '↑ +12.1% vs entry',
    up: true,
  },
  {
    emoji: '🧅',
    code: 'SHALLOT-GH-BREBES-Q2',
    day: 'Day 30 of 100 · Greenhouse',
    price: 'Rp 5,050,000',
    chg: '↑ +1.0% vs entry',
    up: true,
  },
  {
    emoji: '🌾',
    code: 'RICE-OPEN-KARAWANG-Q2',
    day: 'Day 88 of 130 · Bulk',
    price: 'Rp 8,400,000',
    chg: '↑ +5.2% vs entry',
    up: true,
  },
  {
    emoji: '🌸',
    code: 'VANILLA-HYB-TEMANGGUNG',
    day: 'Day 14 of 270 · Export RWA',
    price: 'Rp 4,800,000',
    chg: '↓ −2.1% vs entry',
    up: false,
  },
]
