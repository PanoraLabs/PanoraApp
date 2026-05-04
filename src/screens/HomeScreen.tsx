import { motion } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { useActiveVaults } from '@/hooks/useVaults'
import { useRecentActivity } from '@/hooks/useActivity'
import { useHomeStats, useIoTFeed, useUserProfile } from '@/hooks/useHome'

export function HomeScreen() {
  const { setScreen, openSheet } = useAppStore()
  const profile = useUserProfile()
  const stats = useHomeStats()
  const vaults = useActiveVaults()
  const recent = useRecentActivity()
  const iot = useIoTFeed()

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-forest via-[#0D3520] to-[#153D25] px-[22px] pt-5 pb-7 relative overflow-hidden shrink-0">
        {/* Decorative circles */}
        <div className="absolute w-[200px] h-[200px] -top-20 -right-15 rounded-full border border-white/5" />
        <div className="absolute w-[120px] h-[120px] -bottom-[30px] -left-5 rounded-full border border-white/5" />

        <div className="flex items-center justify-between mb-[18px] relative z-[1]">
          <div>
            <div className="text-xs text-white/45 mb-0.5">{profile.greeting}</div>
            <div className="font-serif text-xl text-white tracking-tight">{profile.name}</div>
          </div>
          <button
            onClick={() => setScreen('wallet', 'wallet')}
            className="w-[38px] h-[38px] rounded-full bg-gold flex items-center justify-center font-serif text-[15px] text-white border-2 border-white/20 cursor-pointer"
          >
            {profile.initials}
          </button>
        </div>

        <div className="relative z-[1] mb-4">
          <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Total Portfolio</div>
          <div className="font-serif text-4xl text-white tracking-tight leading-none mb-0.5">{profile.totalPortfolio}</div>
          <div className="text-xs text-sprout">{profile.monthlyChange}</div>
        </div>

        <div className="flex gap-2 relative z-[1]">
          {[
            { icon: '⚡', label: 'Stake', action: () => openSheet('stake') },
            { icon: '💰', label: 'Claim', action: () => openSheet('claim') },
            { icon: '🔄', label: 'Market', action: () => setScreen('market', 'market') },
            { icon: '🌿', label: 'NFT', action: () => setScreen('passport') },
          ].map((pill) => (
            <button
              key={pill.label}
              onClick={pill.action}
              className="flex-1 bg-white/8 border border-white/10 rounded-[14px] py-2.5 px-2.5 text-center cursor-pointer active:bg-white/15 transition-all duration-150"
            >
              <div className="text-lg mb-1">{pill.icon}</div>
              <div className="text-[11px] text-white/60 font-medium">{pill.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Claimable Banner */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => openSheet('claim')}
            className="bg-gradient-to-br from-gold to-amber rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-[18px] cursor-pointer"
          >
            <div className="text-[26px]">💰</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-white/80 mb-px">Ready to Claim</div>
              <div className="font-serif text-xl text-white">{profile.claimable}</div>
            </div>
            <div className="text-white/70 text-xl">›</div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5 mb-[18px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card-bg border border-border rounded-[14px] p-3.5 text-center">
                <div className="font-serif text-[22px] text-forest leading-none mb-0.5">{stat.val}</div>
                <div className="text-[10px] text-stone uppercase tracking-wider">{stat.label}</div>
                <div className="text-[10px] text-sprout mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="font-serif text-[17px] text-forest">Active Vaults</div>
            <button onClick={() => setScreen('explore', 'explore')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              Explore more →
            </button>
          </div>
        </div>

        {/* Vault horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mx-0 px-[22px] pb-1">
          {vaults.map((v) => (
            <motion.div
              key={v.name}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSheet('vault-detail')}
              className="bg-card-bg border border-border rounded-[18px] p-4 min-w-[210px] shrink-0 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[26px]">{v.emoji}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${v.status === 'Active' ? 'bg-leaf/15 text-leaf' : 'bg-gold/15 text-gold'}`}>
                  {v.status}
                </span>
              </div>
              <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">{v.type}</div>
              <div className="font-serif text-[15px] text-forest mb-0.5">{v.name}</div>
              <div className="text-[11px] text-stone mb-3">📍 {v.loc}</div>
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <div className="bg-surface rounded-lg p-2">
                  <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Staked</div>
                  <div className="text-sm font-medium text-forest">{v.staked}</div>
                </div>
                <div className="bg-surface rounded-lg p-2">
                  <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Est. APY</div>
                  <div className="text-sm font-medium text-sprout">{v.apy}</div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-stone mb-1">
                <span>Day {v.day}</span>
                <span className={`font-semibold ${v.gold ? 'text-gold' : 'text-forest'}`}>{v.pct}%</span>
              </div>
              <div className="h-1 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${v.gold ? 'bg-gradient-to-r from-gold to-amber' : 'bg-gradient-to-r from-leaf to-sprout'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${v.pct}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-[22px]">
          {/* IoT Feed */}
          <div className="flex items-center justify-between mb-3 mt-1.5">
            <div className="font-serif text-[17px] text-forest">Live IoT Feed</div>
            <div className="text-[11px] text-stone">
              <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout mr-1 align-middle" />
              CHILI-GH
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-[18px]">
            {[
              { label: 'Temperature', val: `${iot.temp}°C`, ok: true },
              { label: 'Humidity', val: `${iot.rh}%`, ok: true },
              { label: 'Soil pH', val: iot.ph, ok: true },
              { label: 'Light', val: `${iot.lux}k`, ok: iot.lux >= 17 },
            ].map((item) => (
              <div key={item.label} className="bg-surface rounded-xl p-3">
                <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">{item.label}</div>
                <div className="font-serif text-[22px] text-forest leading-none mb-0.5">{item.val}</div>
                <div className={`text-[10px] font-semibold ${item.ok ? 'text-sprout' : 'text-gold'}`}>
                  {item.ok ? '✓ Optimal' : '⚠ Low'}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="flex items-center justify-between mb-3">
            <div className="font-serif text-[17px] text-forest">Recent Activity</div>
            <button onClick={() => setScreen('activity')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              See all →
            </button>
          </div>
          {recent.map((a) => (
            <div key={a.sub} className="flex items-center gap-3 p-3 bg-surface rounded-[14px] mb-2 cursor-pointer active:bg-forest/5 transition-colors">
              <div className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[17px] shrink-0 ${a.bg}`}>
                {a.icon}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-forest mb-px">{a.name}</div>
                <div className="text-[11px] text-stone">{a.sub}</div>
              </div>
              <div>
                <div className={`text-sm font-semibold text-right ${a.pos ? 'text-sprout' : a.neutral ? 'text-stone text-xs' : 'text-ink'}`}>
                  {a.amt}
                </div>
                <div className="text-[10px] text-stone text-right mt-px">{a.date}</div>
              </div>
            </div>
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
