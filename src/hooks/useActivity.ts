import { useDemoStore } from '@/store/demo-store'

export function useRecentActivity() {
  return useDemoStore((s) => s.recentActivity)
}

export function useActivityHistory() {
  return useDemoStore((s) => s.activityHistory)
}
