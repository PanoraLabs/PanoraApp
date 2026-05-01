import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'

export function Toast() {
  const toast = useAppStore((s) => s.toast)

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="absolute bottom-24 left-1/2 bg-forest text-white py-2.5 px-5 rounded-full text-[13px] font-medium z-[100] whitespace-nowrap flex items-center gap-1.5"
          initial={{ x: '-50%', y: 20, opacity: 0 }}
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: 20, opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
