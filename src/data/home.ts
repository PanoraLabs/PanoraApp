export interface HomeStat {
  val: string
  label: string
  sub: string
}

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

// Neutral defaults — the real identity comes from the authed Privy user; the
// numeric fields are overwritten by usePortfolioSummary.
export const userProfile: UserProfile = {
  greeting: 'Good morning,',
  name: '',
  initials: '',
  totalPortfolioValue: 0,
  claimableValue: 0,
  claimableSource: 'Invest in a vault to start earning',
  gainPercent: 0,
  gainAmount: '+$0 this month',
}
