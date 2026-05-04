import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useActivityHistory } from '@/hooks/useActivity'
import { ActivityRow } from '@/components/shared/ActivityRow'
import { staggerContainer, staggerItem } from '@/motion/variants'

export function ActivityScreen() {
  const activities = useActivityHistory()
  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Activity" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {activities.map((group) => (
              <div key={group.month}>
                <motion.div
                  variants={staggerItem}
                  className="text-[11px] font-semibold text-stone uppercase tracking-widest mb-2.5 mt-1"
                >
                  {group.month}
                </motion.div>
                {group.items.map((a, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <ActivityRow item={a} />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
