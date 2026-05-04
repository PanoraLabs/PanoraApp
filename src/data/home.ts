export interface HomeStat {
  val: string
  label: string
  sub: string
}

export const homeStats: HomeStat[] = [
  { val: 'Rp48M', label: 'Staked', sub: 'Active' },
  { val: '17.4%', label: 'Avg Yield', sub: '3 vaults' },
  { val: 'Rp8.4M', label: 'Est. Profit', sub: 'All vaults' },
]

export interface IoTReading {
  temp: string
  rh: string
  ph: string
  lux: number
}

export const iotInitial: IoTReading = {
  temp: '28.0',
  rh: '82.0',
  ph: '6.4',
  lux: 18,
}

export interface UserProfile {
  greeting: string
  name: string
  initials: string
  totalPortfolioValue: number
  claimableValue: number
  monthlyChange: string
}

export const userProfile: UserProfile = {
  greeting: 'Good morning,',
  name: 'Agung Wibowo 🌿',
  initials: 'AW',
  totalPortfolioValue: 48_200_000,
  claimableValue: 1_820_000,
  monthlyChange: '↑ +Rp 5M this month · 3 active vaults',
}
