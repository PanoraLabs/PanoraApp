interface IoTCardProps {
  label: string
  value: string
  ok: boolean
}

export function IoTCard({ label, value, ok }: IoTCardProps) {
  return (
    <div className="bg-surface rounded-xl p-3">
      <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">{label}</div>
      <div className="font-serif text-[22px] text-forest leading-none mb-0.5">{value}</div>
      <div className={`text-[10px] font-semibold ${ok ? 'text-sprout' : 'text-gold'}`}>
        {ok ? '✓ Optimal' : '⚠ Low'}
      </div>
    </div>
  )
}
