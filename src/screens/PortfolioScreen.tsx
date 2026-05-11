import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle, TrendingUp } from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { usePortfolioAllocations, usePortfolioMilestones, usePositions } from '@/hooks/usePortfolio'
import { PositionRow } from '@/components/shared/PositionRow'
import { staggerContainer, staggerItem } from '@/motion/variants'
import { cn } from '@/lib/utils'
import type { MilestoneState } from '@/data/positions'

const MILESTONE_STATE: Record<MilestoneState, { className: string; render: (label: string) => React.ReactNode }> = {
  done: {
    className: 'bg-sprout text-white',
    render: () => <Check className="size-3" strokeWidth={3} />,
  },
  pending: {
    className: 'bg-gold text-white',
    render: () => <AlertCircle className="size-3" strokeWidth={2.5} />,
  },
  upcoming: {
    className: 'bg-surface border-[1.5px] border-input text-stone',
    render: (label) => <span className="text-[10px] font-bold leading-none">{label}</span>,
  },
}

export function PortfolioScreen() {
  const openSheet = useAppStore((s) => s.openSheet)
  const positions = usePositions()
  const allocations = usePortfolioAllocations()
  const milestones = usePortfolioMilestones()
  const [activeTab, setActiveTab] = useState<'active' | 'settled'>('active')

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="My Portfolio" showBack={false} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Summary card */}
          <div className="bg-gradient-to-br from-forest to-[#153D28] rounded-[20px] p-5 mb-[18px] text-center">
            <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1.5">Total Value</div>
            <div className="font-serif text-[38px] text-white tracking-tight mb-1">$0</div>
            <div className="text-[13px] text-sprout inline-flex items-center gap-1 justify-center">
              <TrendingUp className="size-3.5" />
              Earned so far: $0
            </div>
            <div className="mt-4 flex items-center justify-center gap-5">
              <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#5DBB7A" strokeWidth="16" strokeDasharray="238.6" strokeDashoffset="238.6" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#C8961E" strokeWidth="16" strokeDasharray="238.6" strokeDashoffset="238.6" transform="rotate(162 50 50)" />
              </svg>
              <div className="flex flex-col gap-1.5">
                {allocations.map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                    <div className="text-[11px] text-white/60">{l.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Positions header */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-forest">My Investments</div>
            <div className="flex gap-1.5">
              {(['active', 'settled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[10px] cursor-pointer transition-colors',
                    activeTab === tab
                      ? 'bg-forest text-white font-semibold'
                      : 'bg-surface text-stone font-medium border-[1.5px] border-input'
                  )}
                >
                  {tab === 'active' ? 'Active' : 'Settled'}
                </button>
              ))}
            </div>
          </div>

          {/* Position items */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {positions.map((p) => (
              <motion.div key={p.code} variants={staggerItem}>
                <PositionRow position={p} onClick={() => openSheet('vault-detail')} />
              </motion.div>
            ))}
          </motion.div>

          {/* Milestone Tracker */}
          <div className="flex items-center justify-between mb-3 mt-1.5">
            <div className="text-[15px] font-semibold text-forest">How my money is being used</div>
            <div className="text-[11px] text-stone">Red Chili · Subang</div>
          </div>
          <div className="bg-card-bg border border-border rounded-[18px] p-[18px] mb-3.5">
            {milestones.map((m, i) => {
              const style = MILESTONE_STATE[m.state]
              return (
                <div key={i} className="flex gap-3 pb-3.5 relative">
                  {i < milestones.length - 1 && <div className="absolute left-[11px] top-[26px] bottom-0 w-[1.5px] bg-border" />}
                  <div className={cn('w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center', style.className)}>
                    {style.render(m.label)}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="text-[13px] font-medium text-forest mb-0.5">{m.title}</div>
                    <div className="text-[11px] text-stone">{m.sub}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
