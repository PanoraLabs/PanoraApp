import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { StatTile } from './StatTile'
import { StatusBadge } from './StatusBadge'
import { CropIcon } from '@/lib/icons'
import type { ActiveVault } from '@/data/vaults'

interface VaultCardProps {
  vault: ActiveVault
  onClick?: () => void
}

export function VaultCard({ vault: v, onClick }: VaultCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card-bg border border-border rounded-[18px] p-4 min-w-[210px] shrink-0 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <CropIcon crop={v.crop} size="lg" />
        <StatusBadge tone={v.status === 'Growing' ? 'leaf-soft' : 'gold-soft'}>
          {v.status}
        </StatusBadge>
      </div>
      <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">{v.type}</div>
      <div className="text-[15px] font-semibold text-forest mb-0.5">{v.name}</div>
      <div className="text-[11px] text-stone mb-3 inline-flex items-center gap-1">
        <MapPin className="size-3" />
        {v.loc}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <StatTile label="You invested" value={v.staked} />
        <StatTile label="Est. return" value={v.apy} valueClass="text-sprout" />
      </div>
      <div className="flex justify-between text-[10px] text-stone mb-1">
        <span>{v.daysLeft}</span>
        <span className={`font-serif ${v.gold ? 'text-gold' : 'text-forest'}`}>{v.pct}%</span>
      </div>
      <ProgressBar pct={v.pct} variant={v.gold ? 'gold' : 'leaf'} />
    </motion.div>
  )
}
