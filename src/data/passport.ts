export interface PassportMeta {
  label: string
  value: string
}

export interface PassportNFT {
  bg: string
  id: string
  name: string
  meta: PassportMeta[]
}

export const passportNFTs: PassportNFT[] = [
  {
    bg: 'bg-forest',
    id: 'PAN-2026-0041',
    name: 'Red Chili · Subang Greenhouse',
    meta: [
      { label: 'Farmer', value: 'FRM-0291' },
      { label: 'Harvest date', value: 'Jun 28, 2026' },
      { label: 'Yield', value: '2.4 ton' },
      { label: 'Location', value: '−6.57°, 107.6°' },
    ],
  },
  {
    bg: 'bg-gold',
    id: 'PAN-2026-0028',
    name: 'Toraja Arabica Coffee',
    meta: [
      { label: 'Farmer', value: 'FRM-0105' },
      { label: 'Harvest date', value: 'Sep 14, 2026' },
      { label: 'Yield', value: '8.1 ton' },
      { label: 'Grade', value: 'Specialty G1' },
    ],
  },
  {
    bg: 'bg-[#2C4A3E]',
    id: 'PAN-2025-0091',
    name: 'Cacao · Flores Season 1',
    meta: [
      { label: 'Farmer', value: 'FRM-0067' },
      { label: 'Harvest date', value: 'Nov 2, 2025' },
      { label: 'Yield', value: '5.7 ton' },
      { label: 'Certified', value: 'Rainforest Alliance' },
    ],
  },
]
