import { TopNav } from '@/components/TopNav'

const activities = [
  {
    month: 'April 2026',
    items: [
      { icon: '💰', bg: 'bg-gold/15', name: 'Profit Claim', sub: 'CACAO-FLORES-Q4-25 · tx: 5xKj...3mPq', amt: '+Rp 2.9M', pos: true, date: 'Apr 10' },
      { icon: '📥', bg: 'bg-stone/10', name: 'Stake', sub: 'SHALLOT-GH-BREBES-Q2 · tx: 2nBx...9kLm', amt: '−Rp 8M', pos: false, date: 'Apr 2' },
    ],
  },
  {
    month: 'March 2026',
    items: [
      { icon: '🏆', bg: 'bg-leaf/15', name: 'Milestone 2 Disbursed', sub: 'COFFEE-HYB-TORAJA-Q1 · 30% released', amt: 'On-chain', neutral: true, date: 'Mar 28' },
      { icon: '📥', bg: 'bg-stone/10', name: 'Stake', sub: 'COFFEE-HYB-TORAJA-Q1 · tx: 8aVc...4dEf', amt: '−Rp 25M', pos: false, date: 'Mar 5' },
      { icon: '📥', bg: 'bg-stone/10', name: 'Stake', sub: 'CHILI-GH-SUBANG-Q2 · tx: 1kLo...6mNo', amt: '−Rp 10M', pos: false, date: 'Mar 22' },
    ],
  },
]

export function ActivityScreen() {
  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Activity" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {activities.map((group) => (
            <div key={group.month}>
              <div className="text-[11px] font-semibold text-stone uppercase tracking-widest mb-2.5 mt-1">
                {group.month}
              </div>
              {group.items.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-surface rounded-[14px] mb-2 cursor-pointer active:bg-forest/5 transition-colors"
                >
                  <div className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[17px] shrink-0 ${a.bg}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-forest mb-px">{a.name}</div>
                    <div className="text-[11px] text-stone">{a.sub}</div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold text-right ${a.pos ? 'text-sprout' : a.neutral ? 'text-stone text-[11px]' : 'text-ink'}`}>
                      {a.amt}
                    </div>
                    <div className="text-[10px] text-stone text-right mt-px">{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
