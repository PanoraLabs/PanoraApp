import { ChevronRight, type LucideIcon } from 'lucide-react'

interface SettingsRowProps {
  Icon: LucideIcon
  label: string
  hint?: string
  trailing?: string
  onClick?: () => void
  tone?: 'default' | 'danger'
}

export function SettingsRow({ Icon, label, hint, trailing, onClick, tone = 'default' }: SettingsRowProps) {
  const isDanger = tone === 'danger'
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3.5 py-3 bg-transparent border-none cursor-pointer text-left active:bg-surface/60 transition-colors"
    >
      <div
        className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${
          isDanger ? 'bg-red-50 text-red-600' : 'bg-leaf/10 text-leaf'
        }`}
      >
        <Icon className="size-[18px]" strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-sans text-[13px] font-semibold ${isDanger ? 'text-red-600' : 'text-forest'}`}>{label}</div>
        {hint && <div className="text-[11px] text-stone truncate">{hint}</div>}
      </div>
      {trailing && <span className="text-[11px] text-stone shrink-0">{trailing}</span>}
      <ChevronRight className="size-4 text-stone shrink-0" />
    </button>
  )
}

interface SettingsGroupProps {
  title: string
  children: React.ReactNode
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <div className="mb-4">
      <div className="text-[10px] text-stone uppercase tracking-widest mb-2 px-1">{title}</div>
      <div className="bg-card-bg border border-border rounded-2xl divide-y divide-border overflow-hidden">
        {children}
      </div>
    </div>
  )
}
