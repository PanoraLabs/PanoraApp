import { cn } from '@/lib/utils'

interface StatTileProps {
  label: string
  value: string
  valueClass?: string
  className?: string
}

export function StatTile({ label, value, valueClass = 'text-forest', className }: StatTileProps) {
  return (
    <div className={cn('bg-surface rounded-lg p-2', className)}>
      <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">{label}</div>
      <div className={cn('font-serif text-[15px] leading-none', valueClass)}>{value}</div>
    </div>
  )
}
