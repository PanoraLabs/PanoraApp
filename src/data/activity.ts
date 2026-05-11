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

export const recentActivity: ActivityItem[] = [
  {
    action: 'profit',
    name: 'Profit received',
    sub: 'Cacao Flores · settled',
    amt: '+$0',
    pos: true,
    date: 'Apr 10',
  },
  {
    action: 'invest',
    name: 'New investment',
    sub: 'Shallot · Brebes',
    amt: '−$0',
    pos: false,
    date: 'Apr 2',
  },
  {
    action: 'milestone',
    name: 'Milestone paid',
    sub: 'Toraja Arabica · mid-season',
    amt: 'On record',
    pos: false,
    neutral: true,
    date: 'Mar 28',
  },
]

export const activityHistory: ActivityGroup[] = [
  {
    month: 'April 2026',
    items: [
      {
        action: 'profit',
        name: 'Profit received',
        sub: 'Cacao Flores · settled',
        amt: '+$0',
        pos: true,
        date: 'Apr 10',
      },
      {
        action: 'invest',
        name: 'New investment',
        sub: 'Shallot · Brebes',
        amt: '−$0',
        pos: false,
        date: 'Apr 2',
      },
    ],
  },
  {
    month: 'March 2026',
    items: [
      {
        action: 'milestone',
        name: 'Milestone paid',
        sub: 'Toraja Arabica · 0% released',
        amt: 'On record',
        neutral: true,
        date: 'Mar 28',
      },
      {
        action: 'invest',
        name: 'New investment',
        sub: 'Toraja Arabica',
        amt: '−$0',
        pos: false,
        date: 'Mar 5',
      },
      {
        action: 'invest',
        name: 'New investment',
        sub: 'Red Chili · Subang',
        amt: '−$0',
        pos: false,
        date: 'Mar 22',
      },
    ],
  },
]
