import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'

const nfts = [
  {
    bg: 'bg-forest',
    id: '#PAN-2026-0041',
    name: 'Red Chili · Subang GH',
    meta: [
      { label: 'Farmer ID', value: 'FRM-0291' },
      { label: 'Harvest Date', value: 'Jun 28, 2026' },
      { label: 'Yield', value: '2.4 ton' },
      { label: 'Location', value: '−6.57°, 107.6°' },
    ],
  },
  {
    bg: 'bg-gold',
    id: '#PAN-2026-0028',
    name: 'Toraja Arabica Coffee',
    meta: [
      { label: 'Farmer ID', value: 'FRM-0105' },
      { label: 'Harvest Date', value: 'Sep 14, 2026' },
      { label: 'Yield', value: '8.1 ton' },
      { label: 'Grade', value: 'Specialty G1' },
    ],
  },
  {
    bg: 'bg-[#2C4A3E]',
    id: '#PAN-2025-0091',
    name: 'Flores Cacao · Season 1',
    meta: [
      { label: 'Farmer ID', value: 'FRM-0067' },
      { label: 'Harvest Date', value: 'Nov 2, 2025' },
      { label: 'Yield', value: '5.7 ton' },
      { label: 'Cert.', value: 'Rainforest Alliance' },
    ],
  },
]

export function PassportScreen() {
  const showToast = useAppStore((s) => s.showToast)

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="NFT Passport" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          <div className="text-[13px] text-stone leading-relaxed mb-[18px]">
            cNFT certificates minted on Solana for every harvested batch — immutable proof of origin.
          </div>

          {nfts.map((nft) => (
            <div key={nft.id} className={`${nft.bg} rounded-[18px] p-[18px] relative overflow-hidden mb-3 cursor-pointer`}>
              <div className="absolute -top-10 -right-10 w-[130px] h-[130px] rounded-full bg-white/7" />
              <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">cNFT · {nft.id}</div>
              <div className="font-serif text-[17px] text-white mb-3">{nft.name}</div>
              <div className="grid grid-cols-2 gap-2">
                {nft.meta.map((m) => (
                  <div key={m.label}>
                    <div className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">{m.label}</div>
                    <div className="text-xs text-white/85">{m.value}</div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-1 bg-white/15 text-white/90 px-2.5 py-1 rounded-full text-[10px] font-semibold mt-2.5">
                ✓ EUDR Compliant
              </div>
            </div>
          ))}

          {/* Verify */}
          <div className="bg-card-bg border border-border rounded-[18px] p-[18px] mt-1">
            <div className="text-sm font-medium text-forest mb-2.5">Verify a Passport</div>
            <input
              className="w-full py-3 px-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors mb-2.5"
              placeholder="Enter cNFT ID (e.g. PAN-2026-0041)"
            />
            <button
              onClick={() => showToast('✓ NFT verified on Solana mainnet')}
              className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
            >
              Verify On-Chain
            </button>
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
