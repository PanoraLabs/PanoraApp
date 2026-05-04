export interface HomeStat {
  val: string
  label: string
  sub: string
}

export const homeStats: HomeStat[] = [
  { val: 'Rp48M', label: 'Invested', sub: '3 vaults' },
  { val: '17.4%', label: 'Avg Return', sub: 'per year' },
  { val: 'Rp8.4M', label: 'Total Profit', sub: 'this year' },
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
  claimableSource: string
  gainPercent: number
  gainAmount: string
}

export const userProfile: UserProfile = {
  greeting: 'Good morning,',
  name: 'Agung Wibowo',
  initials: 'AW',
  totalPortfolioValue: 48_200_000,
  claimableValue: 1_820_000,
  claimableSource: 'From your Cacao Flores harvest',
  gainPercent: 12.4,
  gainAmount: '+Rp 5M this month',
}
