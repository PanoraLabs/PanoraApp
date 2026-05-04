import { Home, Compass, PieChart, ArrowLeftRight, User, type LucideIcon } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import type { Screen } from '@/store/app-store'

const tabs: { id: Screen; Icon: LucideIcon; label: string }[] = [
  { id: 'home', Icon: Home, label: 'Home' },
  { id: 'explore', Icon: Compass, label: 'Discover' },
  { id: 'portfolio', Icon: PieChart, label: 'Portfolio' },
  { id: 'market', Icon: ArrowLeftRight, label: 'Trade' },
  { id: 'wallet', Icon: User, label: 'Account' },
]

export function BottomNav() {
  const { navTab, setScreen } = useAppStore()

  return (
    <div
      className="flex items-start justify-around pt-3 px-2 bg-card-bg border-t border-border shrink-0"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      {tabs.map((tab) => {
        const active = navTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id, tab.id)}
            className="flex flex-col items-center gap-1 min-w-[56px] cursor-pointer border-none bg-transparent p-0.5 px-1 relative"
          >
            <tab.Icon
              className={cn(
                'size-[22px] transition-all duration-150',
                active ? 'text-leaf -translate-y-px' : 'text-stone'
              )}
              strokeWidth={active ? 2.4 : 2}
            />
            <span className={cn('text-[9.5px] font-medium tracking-tight transition-colors duration-150', active ? 'text-leaf' : 'text-stone')}>
              {tab.label}
            </span>
            {tab.id === 'wallet' && (
              <span className="absolute top-0 right-1 bg-danger text-white text-[8px] font-bold rounded-full px-1 py-px border-[1.5px] border-surface">
                3
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
