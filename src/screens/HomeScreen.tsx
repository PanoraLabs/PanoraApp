import { motion } from 'framer-motion'
import {
  Zap,
  Coins,
  ArrowLeftRight,
  Scroll,
  ChevronRight,
  TrendingUp,
  Thermometer,
  Droplets,
  Sprout as SoilIcon,
  Sun,
  type LucideIcon,
} from 'lucide-react'
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
import { formatUsd } from '@/lib/format'

interface ActionPill {
  Icon: LucideIcon
  label: string
  action: () => void
}

export function HomeScreen() {
  const { setScreen, openSheet } = useAppStore()
  const profile = useUserProfile()
  const stats = useHomeStats()
  const vaults = useActiveVaults()
  const recent = useRecentActivity()
  const iot = useIoTFeed()
  const allOptimal = iot.lux >= 17

  const actionPills: ActionPill[] = [
    { Icon: Zap, label: 'Invest', action: () => setScreen('explore', 'explore') },
    { Icon: Coins, label: 'Claim', action: () => openSheet('claim') },
    { Icon: ArrowLeftRight, label: 'Trade', action: () => setScreen('market', 'market') },
    { Icon: Scroll, label: 'Passport', action: () => setScreen('passport') },
  ]

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-forest via-[#0D3520] to-[#153D25] px-[22px] pt-5 pb-7 relative overflow-hidden">
        <div className="absolute w-[200px] h-[200px] -top-20 -right-15 rounded-full border border-white/5" />
        <div className="absolute w-[120px] h-[120px] -bottom-[30px] -left-5 rounded-full border border-white/5" />

        <div className="flex items-center justify-between mb-[18px] relative z-[1]">
          <div>
            <div className="text-xs text-white/45 mb-0.5">{profile.greeting}</div>
            <div className="text-xl font-semibold text-white tracking-tight">{profile.name}</div>
          </div>
          <button
            onClick={() => setScreen('wallet', 'wallet')}
            className="w-[38px] h-[38px] rounded-full bg-gold flex items-center justify-center text-[13px] font-semibold text-white border-2 border-white/20 cursor-pointer"
          >
            {profile.initials}
          </button>
        </div>

        <div className="relative z-[1] mb-4">
          <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Total Value</div>
          <div className="font-serif text-4xl text-white tracking-tight leading-none mb-2">
            <AnimatedCounter value={profile.totalPortfolioValue} format={formatUsd} />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-sprout/15 border border-sprout/25 px-2.5 py-1 rounded-full">
            <TrendingUp className="size-3 text-sprout" />
            {profile.gainPercent > 0 && (
              <span className="text-sprout text-[12px] font-semibold">+{profile.gainPercent}%</span>
            )}
            <span className="text-white/55 text-[11px]">{profile.gainAmount}</span>
          </div>
        </div>

        <div className="flex gap-2 relative z-[1]">
          {actionPills.map((pill) => (
            <button
              key={pill.label}
              onClick={pill.action}
              className="flex-1 bg-white/8 border border-white/10 rounded-[14px] py-2.5 px-2.5 flex flex-col items-center gap-1 cursor-pointer active:bg-white/15 transition-all duration-150"
            >
              <pill.Icon className="size-[18px] text-white/85" strokeWidth={2.2} />
              <div className="text-[11px] text-white/65 font-medium">{pill.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
        <div className="px-[22px] pt-[18px]">
          {/* Claimable Banner */}
          {profile.claimableValue > 0 && (
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => openSheet('claim')}
              className="bg-gradient-to-br from-gold to-amber rounded-xl px-3 py-2.5 flex items-center gap-2.5 mb-[18px] cursor-pointer"
            >
              <div className="w-9 h-9 rounded-[10px] bg-white/20 flex items-center justify-center shrink-0">
                <Coins className="size-4 text-white" strokeWidth={2.2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-white/85 uppercase tracking-wider">Ready to claim</div>
                <div className="font-serif text-base text-white leading-tight">
                  <AnimatedCounter value={profile.claimableValue} format={formatUsd} />
                </div>
                <div className="text-[10px] text-white/70 leading-tight mt-px truncate">{profile.claimableSource}</div>
              </div>
              <ChevronRight className="size-4 text-white/70 shrink-0" />
            </motion.div>
          )}

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
            <div className="text-[15px] font-semibold text-forest">My Vaults</div>
            <button onClick={() => setScreen('explore', 'explore')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              Find more →
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
          {vaults.length === 0 ? (
            <button
              onClick={() => setScreen('explore', 'explore')}
              className="shrink-0 w-[210px] bg-card-bg border border-dashed border-leaf/40 rounded-[18px] p-4 text-left cursor-pointer active:bg-leaf/5 transition-colors"
            >
              <div className="text-[12px] font-semibold text-forest mb-1">Start your first vault</div>
              <div className="text-[11px] text-stone leading-relaxed">
                Add cash and pick a crop to begin earning.
              </div>
              <div className="text-[11px] text-leaf font-semibold mt-2">Browse vaults →</div>
            </button>
          ) : (
            vaults.map((v) => (
              <motion.div key={v.name} variants={staggerItem} className="shrink-0">
                <VaultCard
                  vault={v}
                  onClick={() =>
                    openSheet('vault-detail', {
                      vaultCode: v.name,
                      vaultSub: v.type,
                      crop: v.crop,
                      apyLabel: v.apy,
                      daysLeftLabel: v.daysLeft,
                      pct: v.pct,
                      loc: v.loc,
                    })
                  }
                />
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="px-[22px]">
          {/* Crop Health */}
          <div className="flex items-center justify-between mb-3 mt-1.5">
            <div className="text-[15px] font-semibold text-forest">Crop Health</div>
            <div className="text-[11px] text-stone flex items-center gap-1">
              <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout" />
              {allOptimal ? 'All farms healthy' : 'Needs attention'}
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-2 mb-[18px]"
          >
            {([
              { Icon: Thermometer, label: 'Temperature', value: `${iot.temp}°C`, ok: true, spark: 'pulse' as const },
              { Icon: Droplets, label: 'Humidity', value: `${iot.rh}%`, ok: true, spark: 'wave' as const },
              { Icon: SoilIcon, label: 'Soil pH', value: iot.ph, ok: true, spark: 'rise' as const },
              { Icon: Sun, label: 'Light', value: `${iot.lux}k lux`, ok: iot.lux >= 17, spark: 'sun' as const },
            ]).map((item) => (
              <motion.div key={item.label} variants={staggerItem}>
                <IoTCard label={item.label} value={item.value} ok={item.ok} Icon={item.Icon} spark={item.spark} />
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-forest">Recent Activity</div>
            <button onClick={() => setScreen('activity')} className="text-xs text-leaf font-medium border-none bg-transparent cursor-pointer">
              See all →
            </button>
          </div>
          {recent.length === 0 ? (
            <div className="text-[11px] text-stone text-center py-3">
              No activity yet. Add cash to get started.
            </div>
          ) : (
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {recent.map((a, i) => (
                <motion.div key={`${a.sub}-${i}`} variants={staggerItem}>
                  <ActivityRow item={a} compactNeutral />
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
