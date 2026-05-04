import { useEffect, useState } from 'react'
import { homeStats, iotInitial, userProfile, type IoTReading } from '@/data/home'

export function useHomeStats() {
  return homeStats
}

export function useUserProfile() {
  return userProfile
}

function jitter(base: number, range: number) {
  return (base + (Math.random() - 0.5) * range).toFixed(1)
}

export function useIoTFeed(intervalMs = 5000): IoTReading {
  const [iot, setIot] = useState<IoTReading>(iotInitial)

  useEffect(() => {
    const id = setInterval(() => {
      setIot({
        temp: jitter(28, 1.5),
        rh: jitter(82, 4),
        ph: parseFloat(jitter(6.4, 0.3)).toFixed(1),
        lux: Math.round(parseFloat(jitter(18000, 2000)) / 1000),
      })
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return iot
}
