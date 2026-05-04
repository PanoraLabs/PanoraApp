import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useExploreFilters, useExploreVaults } from '@/hooks/useVaults'
import { ExploreVaultCard } from '@/components/shared/ExploreVaultCard'
import { Input } from '@/components/ui/input'
import { staggerContainer, staggerItem } from '@/motion/variants'
import { cn } from '@/lib/utils'

export function ExploreScreen() {
  const { openSheet, showToast } = useAppStore()
  const filters = useExploreFilters()
  const vaults = useExploreVaults()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Explore Vaults" action={{ label: 'Filter', onClick: () => showToast('🔍 Filter opened') }} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Search */}
          <div className="relative mb-3.5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm z-10">🔍</span>
            <Input
              className="h-auto py-3 pl-10 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest placeholder:text-stone focus-visible:border-leaf focus-visible:ring-0 transition-colors"
              placeholder="Search vaults, commodities..."
            />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-[18px] pb-0.5">
            {filters.map((f) => (
              <div
                key={f.label}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer shrink-0',
                  f.active
                    ? 'bg-forest text-white font-semibold'
                    : 'bg-card-bg border-[1.5px] border-input text-stone'
                )}
              >
                {f.label}
              </div>
            ))}
          </div>

          {/* Vault cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-3"
          >
            {vaults.map((v) => (
              <motion.div key={v.name} variants={staggerItem}>
                <ExploreVaultCard
                  vault={v}
                  onClick={() => (v.highlight ? openSheet('stake') : openSheet('vault-detail'))}
                  onStake={() => openSheet('stake')}
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
