import { AnimatePresence, motion } from 'framer-motion'
import { valueFade } from '@/motion/variants'

interface IoTCardProps {
  label: string
  value: string
  ok: boolean
}

export function IoTCard({ label, value, ok }: IoTCardProps) {
  return (
    <div className="bg-surface rounded-xl p-3">
      <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">{label}</div>
      <div className="font-serif text-[22px] text-forest leading-none mb-0.5 h-[22px] relative">
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
      <div className={`text-[10px] font-semibold ${ok ? 'text-sprout' : 'text-gold'}`}>
        {ok ? '✓ Optimal' : '⚠ Low'}
      </div>
    </div>
  )
}
