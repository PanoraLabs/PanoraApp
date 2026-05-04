interface StatPillProps {
  value: string
  label: string
  sub?: string
}

export function StatPill({ value, label, sub }: StatPillProps) {
  return (
    <div className="bg-card-bg border border-border rounded-[14px] p-3.5 text-center">
      <div className="font-serif text-[22px] text-forest leading-none mb-0.5">{value}</div>
      <div className="text-[10px] text-stone uppercase tracking-wider">{label}</div>
      {sub && <div className="text-[10px] text-sprout mt-0.5">{sub}</div>}
    </div>
  )
}
