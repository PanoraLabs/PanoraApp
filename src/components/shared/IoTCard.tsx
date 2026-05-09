import { AnimatePresence, motion } from 'framer-motion'
import { Check, AlertTriangle, type LucideIcon } from 'lucide-react'
import { valueFade } from '@/motion/variants'

interface IoTCardProps {
  label: string
  value: string
  ok: boolean
  Icon?: LucideIcon
  spark?: 'wave' | 'pulse' | 'rise' | 'sun'
}

const sparkPaths: Record<NonNullable<IoTCardProps['spark']>, string> = {
  wave: 'M0 22 Q12 14 24 22 T48 22 T72 22 T96 22',
  pulse: 'M0 22 L14 22 L18 12 L22 30 L26 18 L30 22 L96 22',
  rise: 'M0 28 C18 26 30 22 48 18 S78 12 96 8',
  sun: 'M0 22 Q24 8 48 22 T96 22',
}

export function IoTCard({ label, value, ok, Icon, spark = 'wave' }: IoTCardProps) {
  const tone = ok ? 'text-sprout' : 'text-gold'
  const stroke = ok ? '#5BB85C' : '#D4A437'

  return (
    <div className="bg-surface rounded-xl px-2.5 py-2 relative overflow-hidden">
      {/* Decorative sparkline backdrop */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-8 opacity-[0.18] pointer-events-none"
        viewBox="0 0 96 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`fill-${spark}-${ok ? 'ok' : 'warn'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.45" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${sparkPaths[spark]} L96 32 L0 32 Z`} fill={`url(#fill-${spark}-${ok ? 'ok' : 'warn'})`} />
        <path d={sparkPaths[spark]} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      <div className="flex items-center justify-between mb-0.5 relative">
        <div className="text-[10px] text-stone uppercase tracking-wider">{label}</div>
        {Icon && <Icon className={`size-3.5 ${tone} opacity-70`} strokeWidth={2.2} />}
      </div>

      <div className="font-serif text-[22px] text-forest leading-none mb-1 h-[22px] relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            variants={valueFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className={`text-[10px] font-semibold inline-flex items-center gap-1 relative ${tone}`}>
        {ok ? <Check className="size-3" /> : <AlertTriangle className="size-3" />}
        {ok ? 'Optimal' : 'Low'}
      </div>
    </div>
  )
}
