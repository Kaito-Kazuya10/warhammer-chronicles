import { useDiceStore, type CampaignRoll } from '@/store/diceStore'

function RollEntry({ roll }: { roll: CampaignRoll }) {
  const time = new Date(roll.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isNat20 = roll.isNat20
  const isNat1 = roll.isNat1

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md border transition-colors ${
        isNat20
          ? 'bg-amber-500/10 border-amber-500/30'
          : isNat1
            ? 'bg-red-500/10 border-red-500/30'
            : 'bg-stone-800/30 border-stone-700/15'
      }`}
    >
      <span className="text-[9px] text-stone-600 font-mono shrink-0">{time}</span>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-stone-300 truncate block">
          {roll.characterName && (
            <span className="text-amber-400/60 mr-1">{roll.characterName}</span>
          )}
          {roll.label}
        </span>
        <span className="text-[10px] text-stone-600">{roll.diceExpression}</span>
      </div>
      <span
        className={`text-sm font-mono font-bold shrink-0 ${
          isNat20 ? 'text-amber-400' : isNat1 ? 'text-red-400' : 'text-stone-200'
        }`}
      >
        {roll.total}
      </span>
      {isNat20 && <span className="text-[9px] text-amber-500 tracking-wider">NAT 20</span>}
      {isNat1 && <span className="text-[9px] text-red-500 tracking-wider">NAT 1</span>}
    </div>
  )
}

export default function LiveRollFeed() {
  const campaignRolls = useDiceStore(s => s.campaignRolls)

  return (
    <div className="mt-6">
      <h4 className="text-[10px] text-stone-500 uppercase tracking-widest mb-2">
        Live Roll Feed
      </h4>
      {campaignRolls.length === 0 ? (
        <p className="text-xs text-stone-600 py-2">No rolls yet this session.</p>
      ) : (
        <div className="grid gap-1.5 max-h-[400px] overflow-y-auto">
          {campaignRolls.slice(0, 20).map(roll => (
            <RollEntry key={roll.id} roll={roll} />
          ))}
        </div>
      )}
    </div>
  )
}
