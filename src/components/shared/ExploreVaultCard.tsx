import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { StatTile } from './StatTile'
import { StatusBadge, statusToneFromClass } from './StatusBadge'
import { CropIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { ExploreVault } from '@/data/vaults'

interface ExploreVaultCardProps {
  vault: ExploreVault
  onClick?: () => void
  onStake?: () => void
}

export function ExploreVaultCard({ vault: v, onClick, onStake }: ExploreVaultCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'bg-card-bg rounded-[18px] p-4 cursor-pointer',
        v.highlight ? 'border-[1.5px] border-gold relative overflow-hidden' : 'border border-border'
      )}
    >
      {v.highlight && (
        <div className="absolute top-2.5 right-3.5 inline-flex items-center gap-1 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          <Sparkles className="size-2.5" />
          {v.status}
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <CropIcon crop={v.crop} size="lg" />
          <div>
            <div className="text-[10px] text-stone uppercase tracking-wider">{v.type}</div>
            <div className="text-base font-semibold text-forest">{v.name}</div>
            <div className="text-[11px] text-stone inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {v.loc}
            </div>
          </div>
        </div>
        {!v.highlight && (
          <StatusBadge tone={statusToneFromClass(v.statusClass)}>{v.status}</StatusBadge>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <StatTile label="Goal" value={v.target} />
        <StatTile label="Est. return" value={v.apy} valueClass="text-sprout" />
        <StatTile label={v.durationLabel ?? 'Duration'} value={v.duration} />
      </div>
      {v.highlight ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onStake?.()
          }}
          className="w-full py-2.5 rounded-[14px] bg-gold text-white font-sans text-[15px] font-semibold border-none cursor-pointer"
        >
          Invest now →
        </button>
      ) : (
        <>
          <div className="flex justify-between text-[10px] text-stone mb-1">
            <span>Funded</span>
            <span className="font-serif text-forest">{v.funded}%</span>
          </div>
          <ProgressBar pct={v.funded} variant={v.full ? 'stone' : 'leaf'} />
        </>
      )}
    </motion.div>
  )
}
