import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  format: (n: number) => string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, format, duration = 1.2, className }: AnimatedCounterProps) {
  const mv = useMotionValue(0)
  const display = useTransform(mv, (v) => format(Math.round(v)))

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [value, duration, mv])

  return <motion.span className={className}>{display}</motion.span>
}
