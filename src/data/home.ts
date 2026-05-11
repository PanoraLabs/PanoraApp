export interface HomeStat {
  val: string
  label: string
  sub: string
}

export const homeStats: HomeStat[] = [
  { val: '$0', label: 'Invested', sub: '0 vaults' },
  { val: '0%', label: 'Avg Return', sub: 'per year' },
  { val: '$0', label: 'Total Profit', sub: 'this year' },
]

export interface IoTReading {
  temp: string
  rh: string
  ph: string
  lux: number
}

export const iotInitial: IoTReading = {
  temp: '0',
  rh: '0',
  ph: '0',
  lux: 0,
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
  totalPortfolioValue: 0,
  claimableValue: 0,
  claimableSource: 'From your Cacao Flores harvest',
  gainPercent: 0,
  gainAmount: '+$0 this month',
}
