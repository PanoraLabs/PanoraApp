import {
  Flame,
  Coffee,
  Sprout,
  Flower2,
  Wheat,
  Bean,
  Coins,
  ArrowDownToLine,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type CropKey = 'chili' | 'coffee' | 'shallot' | 'vanilla' | 'rice' | 'cacao'

interface IconStyle {
  Icon: LucideIcon
  fg: string
  bg: string
}

const CROPS: Record<CropKey, IconStyle> = {
  chili: { Icon: Flame, fg: 'text-red-600', bg: 'bg-red-50' },
  coffee: { Icon: Coffee, fg: 'text-amber-800', bg: 'bg-amber-50' },
  shallot: { Icon: Sprout, fg: 'text-fuchsia-700', bg: 'bg-fuchsia-50' },
  vanilla: { Icon: Flower2, fg: 'text-orange-500', bg: 'bg-orange-50' },
  rice: { Icon: Wheat, fg: 'text-yellow-700', bg: 'bg-yellow-50' },
  cacao: { Icon: Bean, fg: 'text-stone-700', bg: 'bg-stone-100' },
}

type Size = 'sm' | 'md' | 'lg' | 'xl'

const SIZE_DIMS: Record<Size, string> = {
  sm: 'w-8 h-8 [&_svg]:size-4',
  md: 'w-10 h-10 [&_svg]:size-[18px]',
  lg: 'w-11 h-11 [&_svg]:size-[20px]',
  xl: 'w-14 h-14 [&_svg]:size-[26px]',
}

interface CropIconProps {
  crop: CropKey
  size?: Size
  className?: string
}

export function CropIcon({ crop, size = 'md', className }: CropIconProps) {
  const { Icon, fg, bg } = CROPS[crop]
  return (
    <div className={cn('rounded-[10px] flex items-center justify-center shrink-0', bg, fg, SIZE_DIMS[size], className)}>
      <Icon strokeWidth={2.2} />
    </div>
  )
}

export type ActionKey = 'profit' | 'invest' | 'milestone'

const ACTIONS: Record<ActionKey, IconStyle> = {
  profit: { Icon: Coins, fg: 'text-gold', bg: 'bg-gold/15' },
  invest: { Icon: ArrowDownToLine, fg: 'text-stone', bg: 'bg-stone/15' },
  milestone: { Icon: Trophy, fg: 'text-leaf', bg: 'bg-leaf/15' },
}

interface ActionIconProps {
  action: ActionKey
  size?: Size
  className?: string
}

export function ActionIcon({ action, size = 'md', className }: ActionIconProps) {
  const { Icon, fg, bg } = ACTIONS[action]
  return (
    <div className={cn('rounded-[10px] flex items-center justify-center shrink-0', bg, fg, SIZE_DIMS[size], className)}>
      <Icon strokeWidth={2.2} />
    </div>
  )
}
