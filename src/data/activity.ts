import type { ActionKey } from '@/lib/icons'

export interface ActivityItem {
  action: ActionKey
  name: string
  sub: string
  amt: string
  pos?: boolean
  neutral?: boolean
  date: string
}

export interface ActivityGroup {
  month: string
  items: ActivityItem[]
}

// Empty by default — activity is appended by the demo store as actions happen.
export const recentActivity: ActivityItem[] = []

export const activityHistory: ActivityGroup[] = []
