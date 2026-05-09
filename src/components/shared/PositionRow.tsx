import { motion } from 'framer-motion'
import { CropIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { Position } from '@/data/positions'

interface PositionRowProps {
  position: Position
  onClick?: () => void
}

export function PositionRow({ position: p, onClick }: PositionRowProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-3 p-3.5 bg-surface rounded-[14px] cursor-pointer mb-2 active:bg-forest/5 transition-colors"
    >
      <CropIcon crop={p.crop} size="md" />
      <div className="flex-1">
        <div className="text-[13px] font-medium text-forest">{p.code}</div>
        <div className="text-[11px] text-stone mt-px">{p.sub}</div>
        <div className="mt-1.5 h-1 bg-card-bg rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full',
              p.gold ? 'bg-gradient-to-r from-gold to-amber' : 'bg-gradient-to-r from-leaf to-sprout'
            )}
            style={{ width: `${p.pct}%` }}
          />
        </div>
      </div>
      <div className="text-right">
        <div className="font-serif text-base text-forest">{p.val}</div>
        <div className={cn('text-[11px] mt-px', p.profitColor)}>{p.profit}</div>
      </div>
    </motion.div>
  )
}
