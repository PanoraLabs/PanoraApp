import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'

const filters = [
  { label: 'All', active: true },
  { label: '🌶️ Greenhouse', active: false },
  { label: '☕ Export RWA', active: false },
  { label: '🌾 Bulk', active: false },
  { label: '🆕 Open Now', active: false },
]

const vaults = [
  {
    emoji: '🌶️', type: 'Greenhouse · West Java', name: 'Red Chili Subang', loc: 'Subang',
    status: 'Active', statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 20M', apy: '18%', duration: '90 days', funded: 78, highlight: false,
  },
  {
    emoji: '🌸', type: 'Export RWA · Central Java', name: 'Vanilla Temanggung', loc: 'Temanggung',
    status: 'OPEN · 48h left', statusClass: 'bg-gold text-white',
    target: 'Rp 50M', apy: '24%', duration: 'Rp 1M', funded: 0, highlight: true,
    durationLabel: 'Min Stake',
  },
  {
    emoji: '☕', type: 'Export RWA · Sulawesi', name: 'Toraja Arabica Coffee', loc: 'Toraja',
    status: 'Full', statusClass: 'bg-stone/12 text-stone',
    target: 'Rp 100M', apy: '22%', duration: '6 mos', funded: 100, full: true,
  },
  {
    emoji: '🌾', type: 'Bulk Commodity · West Java', name: 'Karawang Premium Rice', loc: 'Karawang',
    status: 'Open', statusClass: 'bg-leaf/15 text-leaf',
    target: 'Rp 200M', apy: '11%', duration: '130d', funded: 55,
  },
]

export function ExploreScreen() {
  const { openSheet, showToast } = useAppStore()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Explore Vaults" action={{ label: 'Filter', onClick: () => showToast('🔍 Filter opened') }} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Search */}
          <div className="relative mb-3.5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">🔍</span>
            <input
              className="w-full py-3 pl-10 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
              placeholder="Search vaults, commodities..."
            />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-[18px] pb-0.5">
            {filters.map((f) => (
              <div
                key={f.label}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer shrink-0 ${
                  f.active
                    ? 'bg-forest text-white font-semibold'
                    : 'bg-card-bg border-[1.5px] border-input text-stone'
                }`}
              >
                {f.label}
              </div>
            ))}
          </div>

          {/* Vault cards */}
          <div className="flex flex-col gap-3">
            {vaults.map((v) => (
              <motion.div
                key={v.name}
                whileTap={{ scale: 0.98 }}
                onClick={() => v.highlight ? openSheet('stake') : openSheet('vault-detail')}
                className={`bg-card-bg rounded-[18px] p-4 cursor-pointer ${v.highlight ? 'border-[1.5px] border-gold relative overflow-hidden' : 'border border-border'}`}
              >
                {v.highlight && (
                  <div className="absolute top-2.5 right-3.5 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    🆕 {v.status}
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="text-[28px]">{v.emoji}</div>
                    <div>
                      <div className="text-[10px] text-stone uppercase tracking-wider">{v.type}</div>
                      <div className="font-serif text-base text-forest">{v.name}</div>
                      <div className="text-[11px] text-stone">📍 {v.loc}</div>
                    </div>
                  </div>
                  {!v.highlight && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${v.statusClass}`}>
                      {v.status}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-surface rounded-lg p-2">
                    <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Target</div>
                    <div className="text-[13px] font-medium text-forest">{v.target}</div>
                  </div>
                  <div className="bg-surface rounded-lg p-2">
                    <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Est. APY</div>
                    <div className="text-[13px] font-medium text-sprout">{v.apy}</div>
                  </div>
                  <div className="bg-surface rounded-lg p-2">
                    <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">{v.durationLabel ?? 'Duration'}</div>
                    <div className="text-[13px] font-medium text-forest">{v.duration}</div>
                  </div>
                </div>
                {v.highlight ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); openSheet('stake') }}
                    className="w-full py-2.5 rounded-[14px] bg-gold text-white font-sans text-[15px] font-semibold border-none cursor-pointer"
                  >
                    Stake Now →
                  </button>
                ) : (
                  <>
                    <div className="flex justify-between text-[10px] text-stone mb-1">
                      <span>Funded</span>
                      <span className="font-semibold text-forest">{v.funded}%</span>
                    </div>
                    <div className="h-1 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${v.full ? 'bg-stone' : 'bg-gradient-to-r from-leaf to-sprout'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${v.funded}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
