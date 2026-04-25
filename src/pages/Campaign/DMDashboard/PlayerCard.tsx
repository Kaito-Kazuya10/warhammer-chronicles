import type { Character } from '@/types/character'

interface PlayerCardProps {
  character: Character
  onClick: () => void
}

function hpColor(current: number, max: number): string {
  if (max === 0) return 'bg-stone-700'
  const ratio = current / max
  if (ratio <= 0) return 'bg-red-900'
  if (ratio <= 0.25) return 'bg-red-500'
  if (ratio <= 0.5) return 'bg-yellow-500'
  return 'bg-green-500'
}

function classResourceLabel(character: Character): { label: string; value: string; color: string } | null {
  const cls = character.class?.toLowerCase() ?? ''

  if (cls.includes('psyker') && character.warpBar !== undefined) {
    return { label: 'Warp', value: `${character.warpBar}/20`, color: 'text-purple-400' }
  }
  if (cls.includes('augmenticist') && character.powerCells) {
    return { label: 'Cells', value: `${character.powerCells.current}/${character.powerCells.max}`, color: 'text-cyan-400' }
  }
  if (cls.includes('zealot')) {
    return { label: 'Faith', value: `${character.faith}`, color: 'text-yellow-400' }
  }
  if (cls.includes('gene') && character.geneSurgesRemaining !== undefined) {
    return { label: 'Surge', value: `${character.geneSurgesRemaining}`, color: 'text-emerald-400' }
  }
  return null
}

export default function PlayerCard({ character, onClick }: PlayerCardProps) {
  const hpPct = character.maxHitPoints > 0
    ? Math.max(0, Math.min(100, (character.currentHitPoints / character.maxHitPoints) * 100))
    : 0

  const resource = classResourceLabel(character)

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-44 rounded-lg border border-stone-700/20 bg-stone-800/30 hover:bg-stone-800/50 transition-colors p-3 text-left cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-2">
        {character.portrait ? (
          <img
            src={character.portrait}
            alt=""
            className="w-8 h-8 rounded-full object-cover border border-stone-700/30"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-stone-800/50 border border-stone-700/30 flex items-center justify-center text-[9px] font-bold text-stone-600">
            {character.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-stone-200 truncate">{character.name}</p>
          <p className="text-[10px] text-stone-500">
            Lvl {character.level} {character.class}
          </p>
        </div>
      </div>

      {/* HP bar */}
      <div className="h-1.5 rounded-full bg-stone-900/50 overflow-hidden mb-1">
        <div
          className={`h-full rounded-full transition-all ${hpColor(character.currentHitPoints, character.maxHitPoints)}`}
          style={{ width: `${hpPct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-stone-600 font-mono">
          {character.currentHitPoints}/{character.maxHitPoints}
        </span>
        {resource && (
          <span className={`text-[9px] font-mono ${resource.color}`}>
            {resource.label} {resource.value}
          </span>
        )}
      </div>
    </button>
  )
}
