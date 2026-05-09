import { useDemoStore } from '@/store/demo-store'
import { useAppStore } from '@/store/app-store'
import { useLongPress } from '@/hooks/useLongPress'

export function StatusBar() {
  const reset = useDemoStore((s) => s.reset)
  const showResult = useAppStore((s) => s.showResult)

  // Long-press the (invisible) safe-area strip for ~1.5s to reset demo state.
  // The handler also clears persisted localStorage via the persist middleware.
  const longPress = useLongPress(() => {
    useDemoStore.persist.clearStorage()
    reset()
    showResult({
      kind: 'success',
      title: 'Demo state reset',
      message: 'All cash, positions, claims, and listings restored to their seed values.',
    })
  })

  return (
    <div
      aria-hidden
      className="shrink-0 bg-forest"
      style={{ height: 'max(env(safe-area-inset-top, 0px), 8px)' }}
      {...longPress}
    />
  )
}
