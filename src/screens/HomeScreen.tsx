import { motion } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { useActiveVaults } from '@/hooks/useVaults'
import { useRecentActivity } from '@/hooks/useActivity'
import { useHomeStats, useIoTFeed, useUserProfile } from '@/hooks/useHome'
import { VaultCard } from '@/components/shared/VaultCard'
import { StatPill } from '@/components/shared/StatPill'
import { IoTCard } from '@/components/shared/IoTCard'
import { ActivityRow } from '@/components/shared/ActivityRow'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { staggerContainer, staggerItem } from '@/motion/variants'
import { formatRupiah } from '@/lib/format'

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
          <div className="font-serif text-4xl text-white tracking-tight leading-none mb-0.5">
            <AnimatedCounter value={profile.totalPortfolioValue} format={formatRupiah} />
          </div>
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
              <div className="font-serif text-xl text-white">
                <AnimatedCounter value={profile.claimableValue} format={formatRupiah} />
              </div>
            </div>
            <div className="text-white/70 text-xl">›</div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-3 gap-2.5 mb-[18px]"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <StatPill value={s.val} label={s.label} sub={s.sub} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-between mb-3">
            <div className="font-serif text-[17px] text-forest">Active Vaults</div>
            <button onClick={() => setScreen('explore', 'explore')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              Explore more →
            </button>
          </div>
        </div>

        {/* Vault horizontal scroll */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex gap-3 overflow-x-auto hide-scrollbar mx-0 px-[22px] pb-1"
        >
          {vaults.map((v) => (
            <motion.div key={v.name} variants={staggerItem} className="shrink-0">
              <VaultCard vault={v} onClick={() => openSheet('vault-detail')} />
            </motion.div>
          ))}
        </motion.div>

        <div className="px-[22px]">
          {/* IoT Feed */}
          <div className="flex items-center justify-between mb-3 mt-1.5">
            <div className="font-serif text-[17px] text-forest">Live IoT Feed</div>
            <div className="text-[11px] text-stone">
              <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout mr-1 align-middle" />
              CHILI-GH
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-2.5 mb-[18px]"
          >
            {[
              { label: 'Temperature', value: `${iot.temp}°C`, ok: true },
              { label: 'Humidity', value: `${iot.rh}%`, ok: true },
              { label: 'Soil pH', value: iot.ph, ok: true },
              { label: 'Light', value: `${iot.lux}k`, ok: iot.lux >= 17 },
            ].map((item) => (
              <motion.div key={item.label} variants={staggerItem}>
                <IoTCard label={item.label} value={item.value} ok={item.ok} />
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <div className="flex items-center justify-between mb-3">
            <div className="font-serif text-[17px] text-forest">Recent Activity</div>
            <button onClick={() => setScreen('activity')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              See all →
            </button>
          </div>
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {recent.map((a) => (
              <motion.div key={a.sub} variants={staggerItem}>
                <ActivityRow item={a} compactNeutral />
              </motion.div>
            ))}
          </motion.div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
