import type { Variants, Transition } from 'framer-motion'

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
}

export const sheetSpring: Transition = {
  type: 'spring',
  damping: 28,
  stiffness: 300,
}

export const valueFade: Variants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 4, transition: { duration: 0.15 } },
}
