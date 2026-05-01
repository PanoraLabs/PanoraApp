import { useEffect, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  })

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
    }, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-[50px] px-7 pt-3.5 flex items-center justify-between shrink-0 relative z-10 bg-forest">
      <div className="text-[15px] font-semibold text-white tracking-tight">{time}</div>
      <div className="flex items-center gap-1.5 text-xs text-white/80">📶 🔋</div>
    </div>
  )
}
