import { TopNav } from '@/components/TopNav'
import { useActivityHistory } from '@/hooks/useActivity'
import { ActivityRow } from '@/components/shared/ActivityRow'

export function ActivityScreen() {
  const activities = useActivityHistory()
  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Activity" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {activities.map((group) => (
            <div key={group.month}>
              <div className="text-[11px] font-semibold text-stone uppercase tracking-widest mb-2.5 mt-1">
                {group.month}
              </div>
              {group.items.map((a, i) => (
                <ActivityRow key={i} item={a} />
              ))}
            </div>
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
