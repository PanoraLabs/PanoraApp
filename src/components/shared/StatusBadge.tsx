import { cva, type VariantProps } from 'class-variance-authority'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusVariants = cva('rounded-full text-[10px] font-semibold px-2 py-0.5 h-auto border-0', {
  variants: {
    tone: {
      'leaf-soft': 'bg-leaf/15 text-leaf',
      'gold-soft': 'bg-gold/15 text-gold',
      'gold-solid': 'bg-gold text-white',
      'stone-soft': 'bg-stone/12 text-stone',
    },
  },
  defaultVariants: { tone: 'leaf-soft' },
})

export type StatusTone = NonNullable<VariantProps<typeof statusVariants>['tone']>

interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return <Badge className={cn(statusVariants({ tone }), className)}>{children}</Badge>
}

const TONE_BY_CLASS: Record<string, StatusTone> = {
  'bg-leaf/15 text-leaf': 'leaf-soft',
  'bg-gold/15 text-gold': 'gold-soft',
  'bg-gold text-white': 'gold-solid',
  'bg-stone/12 text-stone': 'stone-soft',
}

export function statusToneFromClass(legacy: string): StatusTone {
  return TONE_BY_CLASS[legacy] ?? 'leaf-soft'
}
