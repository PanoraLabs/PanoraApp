import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'

export function PortfolioScreen() {
  const openSheet = useAppStore((s) => s.openSheet)

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="My Portfolio" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Summary card */}
          <div className="bg-gradient-to-br from-forest to-[#153D28] rounded-[20px] p-5 mb-[18px] text-center">
            <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1.5">Total Portfolio Value</div>
            <div className="font-serif text-[38px] text-white tracking-tight mb-1">Rp 48,200,000</div>
            <div className="text-[13px] text-sprout">↑ Total Profit Earned: Rp 12.4M</div>
            <div className="mt-4 flex items-center justify-center gap-5">
              <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#5DBB7A" strokeWidth="16" strokeDasharray="238.6" strokeDashoffset="107.4" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#C8961E" strokeWidth="16" strokeDasharray="238.6" strokeDashoffset="155.1" transform="rotate(162 50 50)" />
              </svg>
              <div className="flex flex-col gap-1.5">
                {[
                  { color: '#5DBB7A', label: 'Greenhouse 55%' },
                  { color: '#C8961E', label: 'Export RWA 35%' },
                  { color: 'rgba(255,255,255,0.3)', label: 'Bulk 10%' },
                ].map((l) => (
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
            <div className="font-serif text-[17px] text-forest">All Positions</div>
            <div className="flex gap-1.5">
              <div className="px-2.5 py-1 bg-forest text-white rounded-full text-[10px] font-semibold cursor-pointer">Active</div>
              <div className="px-2.5 py-1 bg-surface text-stone rounded-full text-[10px] font-medium cursor-pointer border-[1.5px] border-input">Settled</div>
            </div>
          </div>

          {/* Position items */}
          {[
            { emoji: '🌶️', code: 'CHILI-GH-SUBANG-Q2', sub: 'Greenhouse · West Java', val: 'Rp 10M', profit: '+Rp 1.8M', pct: 72, profitColor: 'text-sprout' },
            { emoji: '☕', code: 'COFFEE-TORAJA-Q1', sub: 'Export RWA · Sulawesi', val: 'Rp 25M', profit: '+Rp 5.5M', pct: 67, profitColor: 'text-sprout' },
            { emoji: '🧅', code: 'SHALLOT-BREBES-Q2', sub: 'Greenhouse · Central Java', val: 'Rp 8M', profit: 'Day 30/100', pct: 30, profitColor: 'text-gold', gold: true },
          ].map((p) => (
            <motion.div
              key={p.code}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSheet('vault-detail')}
              className="flex items-center gap-3 p-3.5 bg-surface rounded-[14px] cursor-pointer mb-2 active:bg-forest/5 transition-colors"
            >
              <div className="text-[22px]">{p.emoji}</div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-forest">{p.code}</div>
                <div className="text-[11px] text-stone mt-px">{p.sub}</div>
                <div className="mt-1.5 h-1 bg-card-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.gold ? 'bg-gradient-to-r from-gold to-amber' : 'bg-gradient-to-r from-leaf to-sprout'}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-forest">{p.val}</div>
                <div className={`text-[11px] mt-px ${p.profitColor}`}>{p.profit}</div>
              </div>
            </motion.div>
          ))}

          {/* Milestone Tracker */}
          <div className="flex items-center justify-between mb-3 mt-1.5">
            <div className="font-serif text-[17px] text-forest">Milestone Tracker</div>
            <div className="text-[11px] text-stone">CHILI-GH-Q2</div>
          </div>
          <div className="bg-card-bg border border-border rounded-[18px] p-[18px] mb-3.5">
            {[
              { dot: 'bg-sprout text-white', icon: '✓', title: 'Setup & Seeds (40%)', sub: 'Disbursed Apr 2 · Rp 4,000,000' },
              { dot: 'bg-gold text-white', icon: '!', title: 'Mid-Season Nutrients (30%)', sub: 'Awaiting PoA verification' },
              { dot: 'bg-surface border-[1.5px] border-input text-stone', icon: '3', title: 'Harvest & Logistics (30%)', sub: 'Pending · Est. Jun 28' },
            ].map((m, i) => (
              <div key={i} className="flex gap-3 pb-3.5 relative">
                {i < 2 && <div className="absolute left-[11px] top-[26px] bottom-0 w-[1.5px] bg-border" />}
                <div className={`w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${m.dot}`}>
                  {m.icon}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-[13px] font-medium text-forest mb-0.5">{m.title}</div>
                  <div className="text-[11px] text-stone">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
