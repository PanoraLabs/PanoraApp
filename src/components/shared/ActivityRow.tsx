import { ActionIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { ActivityItem } from '@/data/activity'

interface ActivityRowProps {
  item: ActivityItem
  compactNeutral?: boolean
}

export function ActivityRow({ item: a, compactNeutral = false }: ActivityRowProps) {
  const neutralAmtClass = compactNeutral ? 'text-stone text-xs' : 'text-stone text-[11px]'
  return (
    <div className="flex items-center gap-3 p-3 bg-surface rounded-[14px] mb-2 cursor-pointer active:bg-forest/5 transition-colors">
      <ActionIcon action={a.action} size="md" />
      <div className="flex-1">
        <div className="text-[13px] font-medium text-forest mb-px">{a.name}</div>
        <div className="text-[11px] text-stone">{a.sub}</div>
      </div>
      <div>
        <div className={cn('font-serif text-base text-right', a.pos ? 'text-sprout' : a.neutral ? neutralAmtClass : 'text-ink')}>
          {a.amt}
        </div>
        <div className="text-[10px] text-stone text-right mt-px">{a.date}</div>
      </div>
    </div>
  )
}
