import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  pct: number
  variant?: 'leaf' | 'gold' | 'stone'
  className?: string
}

const FILL: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  leaf: 'bg-gradient-to-r from-leaf to-sprout',
  gold: 'bg-gradient-to-r from-gold to-amber',
  stone: 'bg-stone',
}

export function ProgressBar({ pct, variant = 'leaf', className }: ProgressBarProps) {
  return (
    <div className={cn('h-1 bg-surface rounded-full overflow-hidden', className)}>
      <motion.div
        className={cn('h-full rounded-full', FILL[variant])}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6 }}
      />
    </div>
  )
}
