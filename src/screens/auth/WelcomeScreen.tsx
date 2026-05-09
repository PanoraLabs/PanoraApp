import { motion } from 'framer-motion'
import { Sprout, ArrowRight } from 'lucide-react'

interface WelcomeScreenProps {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-forest via-[#0D3520] to-[#153D25] px-7 pt-14 pb-9 relative overflow-hidden">
      <div className="absolute w-[260px] h-[260px] -top-24 -right-20 rounded-full border border-white/5" />
      <div className="absolute w-[180px] h-[180px] -bottom-12 -left-12 rounded-full border border-white/5" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mb-7 relative z-10"
      >
        <Sprout className="size-7 text-white" strokeWidth={2.2} />
      </motion.div>

      <motion.h1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-[34px] font-semibold text-white leading-tight tracking-tight mb-3 relative z-10"
      >
        Invest in Indonesian harvests.
      </motion.h1>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-[15px] text-white/65 leading-relaxed mb-auto relative z-10"
      >
        Back real farms, follow the crops live, and earn a share of the harvest. No crypto knowledge needed.
      </motion.p>

      <motion.button
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        onClick={onContinue}
        className="w-full mt-8 py-4 rounded-[16px] bg-gold text-white font-sans text-[15px] font-semibold border-none cursor-pointer flex items-center justify-center gap-2 relative z-10 active:bg-amber transition-colors"
      >
        Get started
        <ArrowRight className="size-4" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="text-[11px] text-white/40 text-center mt-3 relative z-10"
      >
        By continuing you agree to our Terms & Privacy.
      </motion.div>
    </div>
  )
}
