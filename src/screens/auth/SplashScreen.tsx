import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'

export function SplashScreen({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-forest via-[#0D3520] to-[#153D25] items-center justify-center px-8">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center mb-5"
      >
        <Sprout className="size-8 text-white" strokeWidth={2.2} />
      </motion.div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-2xl font-semibold text-white mb-1.5 tracking-tight"
      >
        Panora
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-[13px] text-white/50 text-center"
      >
        {subtitle ?? 'Setting things up...'}
      </motion.div>
    </div>
  )
}
