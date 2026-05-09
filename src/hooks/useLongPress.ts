import { useCallback, useRef } from 'react'

interface LongPressOptions {
  ms?: number
}

export function useLongPress(onLongPress: () => void, { ms = 1500 }: LongPressOptions = {}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const start = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      onLongPress()
    }, ms)
  }, [ms, onLongPress])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
  }
}
