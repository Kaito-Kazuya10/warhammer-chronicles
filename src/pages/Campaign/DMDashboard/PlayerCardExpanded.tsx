import { useState } from 'react'
import type { Character } from '@/types/character'
import { useCharacterStore } from '@/store/characterStore'
import CharacterNotePanel from './CharacterNotePanel'

interface PlayerCardExpandedProps {
  character: Character
  campaignId: string
  onClose: () => void
}

function StatRow({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-800/30">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={`text-xs font-mono ${color ?? 'text-slate-300'}`}>{value}</span>
    </div>
  )
}

function hpColor(current: number, max: number): string {
  if (max === 0) return 'bg-slate-700'
  const ratio = current / max
  if (ratio <= 0) return 'bg-red-900'
  if (ratio <= 0.25) return 'bg-red-500'
  if (ratio <= 0.5) return 'bg-yellow-500'
  return 'bg-green-500'
}

type GmField = 'corruption' | 'faith' | 'warpExposure' | 'geneticInstability'

function GmSlider({
  label,
  value,
  max,
  color,
  onChange,
}: {
  label: string
  value: number
  max: number
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div className="py-1">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
        <span className={`text-xs font-mono ${color}`}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1 accent-amber-500 cursor-pointer"
      />
    </div>
  )
}

export default function PlayerCardExpanded({ character, campaignId, onClose }: PlayerCardExpandedProps) {
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const [hpAmount, setHpAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'stats' | 'notes'>('stats')

  const hpPct = character.maxHitPoints > 0
    ? Math.max(0, Math.min(100, (character.currentHitPoints / character.maxHitPoints) * 100))
    : 0

  const applyDamage = () => {
    const amount = parseInt(hpAmount, 10)
    if (isNaN(amount) || amount <= 0) return
    const newHp = Math.max(0, character.currentHitPoints - amount)
    updateCharacter(character.id, { currentHitPoints: newHp })
    setHpAmount('')
  }

  const applyHeal = () => {
    const amount = parseInt(hpAmount, 10)
    if (isNaN(amount) || amount <= 0) return
    const newHp = Math.min(character.maxHitPoints, character.currentHitPoints + amount)
    updateCharacter(character.id, { currentHitPoints: newHp })
    setHpAmount('')
  }

  const setGmField = (field: GmField, value: number) => {
    updateCharacter(character.id, { [field]: value })
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-[#1a1d22] border-l border-slate-700/30 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/20">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {character.portrait ? (
            <img src={character.portrait} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-700/30" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/30 flex items-center justify-center text-xs font-bold text-slate-600">
              {character.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{character.name}</p>
            <p className="text-[10px] text-slate-500">
              Lvl {character.level} {character.class} · {character.race}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-300 text-lg transition-colors"
        >
          &times;
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/20">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-colors ${
            activeTab === 'stats' ? 'text-amber-400 border-b border-amber-400' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-colors ${
            activeTab === 'notes' ? 'text-amber-400 border-b border-amber-400' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          Notes
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {activeTab === 'notes' ? (
          <CharacterNotePanel campaignId={campaignId} characterId={character.id} />
        ) : (
        <>
        {/* HP */}
        <div>
          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Hit Points</h4>
          <div className="h-2 rounded-full bg-slate-900/50 overflow-hidden mb-1">
            <div
              className={`h-full rounded-full transition-all ${hpColor(character.currentHitPoints, character.maxHitPoints)}`}
              style={{ width: `${hpPct}%` }}
            />
          </div>
          <div className="flex gap-3 text-xs font-mono">
            <span className="text-slate-300">{character.currentHitPoints}/{character.maxHitPoints}</span>
            {character.temporaryHitPoints > 0 && (
              <span className="text-cyan-400">+{character.temporaryHitPoints} temp</span>
            )}
          </div>

          {/* DM damage/heal controls */}
          <div className="mt-2 flex gap-1.5">
            <input
              type="number"
              min={1}
              value={hpAmount}
              onChange={e => setHpAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1 bg-slate-900/50 border border-slate-700/30 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              onKeyDown={e => {
                if (e.key === 'Enter') applyDamage()
              }}
            />
            <button
              onClick={applyDamage}
              className="px-2 py-1 rounded text-[10px] tracking-wider bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
            >
              DMG
            </button>
            <button
              onClick={applyHeal}
              className="px-2 py-1 rounded text-[10px] tracking-wider bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-all"
            >
              HEAL
            </button>
          </div>
        </div>

        {/* Class resources */}
        <div>
          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Class Resources</h4>
          {character.warpBar !== undefined && (
            <StatRow label="Warp Bar" value={`${character.warpBar}/20`} color="text-purple-400" />
          )}
          {character.powerCells && (
            <StatRow label="Power Cells" value={`${character.powerCells.current}/${character.powerCells.max}`} color="text-cyan-400" />
          )}
          {character.geneSurgesRemaining !== undefined && (
            <StatRow label="Gene-Surge" value={character.geneSurgesRemaining} color="text-emerald-400" />
          )}
          {character.classResourceCurrent !== undefined && (
            <StatRow label="Class Resource" value={character.classResourceCurrent} />
          )}
        </div>

        {/* Combat */}
        <div>
          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Combat</h4>
          <StatRow label="Armor Class" value={character.armorClass} />
          <StatRow label="Initiative" value={`+${character.initiative}`} />
          <StatRow label="Speed" value={`${character.speed} ft`} />
        </div>

        {/* GM-only fields with sliders */}
        <div>
          <h4 className="text-[10px] text-red-400/60 uppercase tracking-widest mb-1">GM Only</h4>
          <GmSlider
            label="Corruption"
            value={character.corruption}
            max={100}
            color="text-red-400"
            onChange={v => setGmField('corruption', v)}
          />
          <GmSlider
            label="Faith"
            value={character.faith}
            max={100}
            color="text-yellow-400"
            onChange={v => setGmField('faith', v)}
          />
          <GmSlider
            label="Warp Exposure"
            value={character.warpExposure}
            max={10}
            color="text-purple-400"
            onChange={v => setGmField('warpExposure', v)}
          />
          {character.geneticInstability !== undefined && (
            <GmSlider
              label="Genetic Instability"
              value={character.geneticInstability}
              max={20}
              color="text-emerald-400"
              onChange={v => setGmField('geneticInstability', v)}
            />
          )}
        </div>

        {/* Death saves */}
        <div>
          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Death Saves</h4>
          <div className="flex gap-4 text-xs font-mono">
            <span className="text-green-400">{character.deathSaveSuccesses}/3 success</span>
            <span className="text-red-400">{character.deathSaveFailures}/3 fail</span>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  )
}
