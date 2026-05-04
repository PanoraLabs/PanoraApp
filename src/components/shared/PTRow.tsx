import { CropIcon } from '@/lib/icons'
import type { ParticipationToken } from '@/data/wallet'

interface PTRowProps {
  token: ParticipationToken
  onList?: () => void
}

export function PTRow({ token: t, onList }: PTRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface rounded-[14px]">
      <div className="flex items-center gap-2.5">
        <CropIcon crop={t.crop} size="sm" />
        <div>
          <div className="text-[13px] font-medium text-forest">{t.code}</div>
          <div className="text-[11px] text-stone">{t.principal}</div>
        </div>
      </div>
      <button
        onClick={onList}
        className="px-4 py-2 rounded-[10px] bg-surface text-forest text-[13px] font-semibold border-[1.5px] border-input cursor-pointer"
      >
        Sell
      </button>
    </div>
  )
}
