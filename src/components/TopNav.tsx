import { ChevronLeft } from 'lucide-react'
import { useAppStore } from '@/store/app-store'

interface TopNavProps {
  title: string
  action?: { label: string; onClick: () => void }
  showBack?: boolean
}

export function TopNav({ title, action, showBack = true }: TopNavProps) {
  const setScreen = useAppStore((s) => s.setScreen)

  return (
    <div className="bg-card-bg px-5 pt-3.5 pb-3 border-b border-border flex items-center gap-2.5 shrink-0">
      {showBack && (
        <button
          onClick={() => setScreen('home', 'home')}
          className="w-[34px] h-[34px] rounded-full bg-surface border-none flex items-center justify-center cursor-pointer text-forest shrink-0"
        >
          <ChevronLeft className="size-[18px]" strokeWidth={2.4} />
        </button>
      )}
      <div className="text-[15px] font-semibold text-forest flex-1">{title}</div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-[13px] font-semibold text-leaf border-none bg-transparent cursor-pointer p-0"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
