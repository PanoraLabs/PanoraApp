export interface ActivityItem {
  icon: string
  bg: string
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
    icon: '💰',
    bg: 'bg-gold/15',
    name: 'Profit Claim',
    sub: 'CACAO-FLORES-Q4-25',
    amt: '+Rp 2.9M',
    pos: true,
    date: 'Apr 10',
  },
  {
    icon: '📥',
    bg: 'bg-stone/10',
    name: 'Stake',
    sub: 'SHALLOT-GH-BREBES-Q2',
    amt: '−Rp 8M',
    pos: false,
    date: 'Apr 2',
  },
  {
    icon: '🏆',
    bg: 'bg-leaf/15',
    name: 'Milestone 2',
    sub: 'COFFEE-HYB-TORAJA',
    amt: 'Disbursed',
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
        icon: '💰',
        bg: 'bg-gold/15',
        name: 'Profit Claim',
        sub: 'CACAO-FLORES-Q4-25 · tx: 5xKj...3mPq',
        amt: '+Rp 2.9M',
        pos: true,
        date: 'Apr 10',
      },
      {
        icon: '📥',
        bg: 'bg-stone/10',
        name: 'Stake',
        sub: 'SHALLOT-GH-BREBES-Q2 · tx: 2nBx...9kLm',
        amt: '−Rp 8M',
        pos: false,
        date: 'Apr 2',
      },
    ],
  },
  {
    month: 'March 2026',
    items: [
      {
        icon: '🏆',
        bg: 'bg-leaf/15',
        name: 'Milestone 2 Disbursed',
        sub: 'COFFEE-HYB-TORAJA-Q1 · 30% released',
        amt: 'On-chain',
        neutral: true,
        date: 'Mar 28',
      },
      {
        icon: '📥',
        bg: 'bg-stone/10',
        name: 'Stake',
        sub: 'COFFEE-HYB-TORAJA-Q1 · tx: 8aVc...4dEf',
        amt: '−Rp 25M',
        pos: false,
        date: 'Mar 5',
      },
      {
        icon: '📥',
        bg: 'bg-stone/10',
        name: 'Stake',
        sub: 'CHILI-GH-SUBANG-Q2 · tx: 1kLo...6mNo',
        amt: '−Rp 10M',
        pos: false,
        date: 'Mar 22',
      },
    ],
  },
]
