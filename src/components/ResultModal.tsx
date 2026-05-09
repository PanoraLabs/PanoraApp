import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'

export function ResultModal() {
  const { result, hideResult } = useAppStore()
  const isOpen = result !== null
  const kind = result?.kind ?? 'success'
  const isSuccess = kind === 'success'

  const ringColor = isSuccess ? '#5BB85C' : '#E5484D'
  const haloFrom = isSuccess ? 'from-sprout/15' : 'from-red-500/15'
  const haloTo = isSuccess ? 'to-sprout/0' : 'to-red-500/0'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-center justify-center px-7 backdrop-blur-sm"
          style={{ background: 'rgba(13,43,26,0.55)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) hideResult()
          }}
        >
          <motion.div
            className="w-full bg-card-bg rounded-3xl p-6 pt-8 text-center shadow-xl"
            initial={{ scale: 0.9, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          >
            {/* Animated icon */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${haloFrom} ${haloTo}`} />
              <motion.svg
                viewBox="0 0 80 80"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                {isSuccess ? (
                  <motion.path
                    d="M26 41 L36 51 L55 31"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.32, ease: 'easeOut' }}
                  />
                ) : (
                  <>
                    <motion.path
                      d="M28 28 L52 52"
                      fill="none"
                      stroke={ringColor}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.28, duration: 0.22, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M52 28 L28 52"
                      fill="none"
                      stroke={ringColor}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.42, duration: 0.22, ease: 'easeOut' }}
                    />
                  </>
                )}
              </motion.svg>
            </div>

            <div className="text-lg font-semibold text-forest mb-1.5">{result?.title}</div>
            {result?.message && (
              <div className="text-[13px] text-stone leading-relaxed mb-5 px-2">{result.message}</div>
            )}

            <button
              onClick={hideResult}
              className={`w-full py-3 rounded-[14px] font-sans text-[14px] font-semibold border-none cursor-pointer transition-colors ${
                isSuccess
                  ? 'bg-forest text-white active:bg-moss'
                  : 'bg-red-50 text-red-600 active:bg-red-100'
              }`}
            >
              {result?.primaryLabel ?? (isSuccess ? 'Done' : 'Try again')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
