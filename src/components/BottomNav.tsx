import { useAppStore } from '@/store/app-store'
import type { Screen } from '@/store/app-store'

const tabs: { id: Screen; icon: string; label: string }[] = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'explore', icon: '🔍', label: 'Explore' },
  { id: 'portfolio', icon: '📊', label: 'Portfolio' },
  { id: 'market', icon: '🔄', label: 'Market' },
  { id: 'wallet', icon: '👛', label: 'Wallet' },
]

export function BottomNav() {
  const { navTab, setScreen } = useAppStore()

  return (
    <div className="h-[82px] flex items-start justify-around pt-3 px-2 bg-card-bg border-t border-border shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setScreen(tab.id, tab.id)}
          className="flex flex-col items-center gap-1 min-w-[56px] cursor-pointer border-none bg-transparent p-0.5 px-1 relative"
        >
          <span className={`text-[22px] leading-none transition-transform duration-150 ${navTab === tab.id ? '-translate-y-px' : ''}`}>
            {tab.icon}
          </span>
          <span className={`text-[9.5px] font-medium tracking-tight transition-colors duration-150 ${navTab === tab.id ? 'text-leaf' : 'text-stone'}`}>
            {tab.label}
          </span>
          {tab.id === 'wallet' && (
            <span className="absolute top-0 right-1 bg-danger text-white text-[8px] font-bold rounded-full px-1 py-px border-[1.5px] border-surface">
              3
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
