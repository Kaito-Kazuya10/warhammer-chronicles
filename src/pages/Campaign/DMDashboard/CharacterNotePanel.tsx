import { useState, useEffect, useRef, useCallback } from 'react'
import { useDmNotesStore, type Trigger, type MomentKind, type SessionMoment } from '@/store/dmNotesStore'

const TRIGGER_KINDS: { value: Trigger['kind']; label: string; color: string }[] = [
  { value: 'open_thread', label: 'Open Thread', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'promise_made', label: 'Promise', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'owed_favor', label: 'Owed Favor', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'secret', label: 'Secret', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'red_flag', label: 'Red Flag', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { value: 'custom', label: 'Custom', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
]

function triggerColor(kind: Trigger['kind']): string {
  return TRIGGER_KINDS.find(k => k.value === kind)?.color ?? 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

function triggerLabel(kind: Trigger['kind']): string {
  return TRIGGER_KINDS.find(k => k.value === kind)?.label ?? kind
}

interface CharacterNotePanelProps {
  campaignId: string
  characterId: string
}

export default function CharacterNotePanel({ campaignId, characterId }: CharacterNotePanelProps) {
  const { notes, moments, saveProfileNote, addTrigger, removeTrigger, toggleTriggerPin } = useDmNotesStore()
  const note = notes.get(characterId)

  const [profileText, setProfileText] = useState(note?.profileNote ?? '')
  const [newTriggerLabel, setNewTriggerLabel] = useState('')
  const [newTriggerKind, setNewTriggerKind] = useState<Trigger['kind']>('open_thread')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setProfileText(note?.profileNote ?? '')
  }, [note?.profileNote])

  const debouncedSave = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      saveProfileNote(campaignId, characterId, text)
    }, 500)
  }, [campaignId, characterId, saveProfileNote])

  const handleProfileChange = (text: string) => {
    setProfileText(text)
    debouncedSave(text)
  }

  const handleAddTrigger = () => {
    if (!newTriggerLabel.trim()) return
    addTrigger(campaignId, characterId, {
      label: newTriggerLabel.trim(),
      kind: newTriggerKind,
      pinned: false,
    })
    setNewTriggerLabel('')
  }

  const triggers = note?.triggers ?? []
  const sortedTriggers = [...triggers].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  const charMoments = moments.filter(m => m.characterId === characterId)

  return (
    <div className="space-y-4">
      {/* Profile note */}
      <div>
        <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Profile Note</h4>
        <textarea
          value={profileText}
          onChange={e => handleProfileChange(e.target.value)}
          placeholder="Freeform DM notes about this character..."
          rows={4}
          className="w-full bg-zinc-900/50 border border-zinc-700/30 rounded px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-500/30"
        />
      </div>

      {/* Triggers */}
      <div>
        <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Triggers</h4>
        {sortedTriggers.length > 0 && (
          <div className="space-y-1 mb-2">
            {sortedTriggers.map(t => (
              <div key={t.id} className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleTriggerPin(campaignId, characterId, t.id)}
                  className={`text-[9px] ${t.pinned ? 'text-amber-400' : 'text-zinc-600'} hover:text-amber-300 transition-colors`}
                  title={t.pinned ? 'Unpin' : 'Pin'}
                >
                  {t.pinned ? '★' : '☆'}
                </button>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${triggerColor(t.kind)}`}>
                  {triggerLabel(t.kind)}
                </span>
                <span className="text-xs text-zinc-300 flex-1 truncate">{t.label}</span>
                <button
                  onClick={() => removeTrigger(campaignId, characterId, t.id)}
                  className="text-zinc-600 hover:text-red-400 text-xs transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="Add trigger..."
            value={newTriggerLabel}
            onChange={e => setNewTriggerLabel(e.target.value)}
            className="flex-1 bg-zinc-900/50 border border-zinc-700/30 rounded px-2 py-1 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/30"
            onKeyDown={e => e.key === 'Enter' && handleAddTrigger()}
          />
          <select
            value={newTriggerKind}
            onChange={e => setNewTriggerKind(e.target.value as Trigger['kind'])}
            className="bg-zinc-900/50 border border-zinc-700/30 rounded px-1.5 py-1 text-[10px] text-zinc-400 focus:outline-none"
          >
            {TRIGGER_KINDS.map(k => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>
          <button
            onClick={handleAddTrigger}
            className="px-2 py-1 rounded text-[10px] tracking-wider bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Moments timeline */}
      {charMoments.length > 0 && (
        <div>
          <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Moments</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {charMoments.map(m => (
              <MomentEntry key={m.id} moment={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MomentEntry({ moment }: { moment: SessionMoment }) {
  const kindColors: Record<MomentKind, string> = {
    beat: 'text-zinc-400',
    lie_told: 'text-red-400',
    promise: 'text-green-400',
    revelation: 'text-amber-400',
    death_flag: 'text-red-500',
    custom: 'text-zinc-400',
  }

  return (
    <div className="flex items-start gap-2 text-xs">
      <span className={`text-[9px] shrink-0 mt-0.5 ${kindColors[moment.kind] ?? 'text-zinc-400'}`}>
        {moment.kind.replace('_', ' ')}
      </span>
      <span className="text-zinc-300">{moment.text}</span>
      <span className="text-[9px] text-zinc-600 shrink-0 ml-auto">
        {new Date(moment.createdAt).toLocaleDateString()}
      </span>
    </div>
  )
}
