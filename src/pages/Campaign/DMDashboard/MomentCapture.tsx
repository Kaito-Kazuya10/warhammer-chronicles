import { useState, useEffect, useRef } from 'react'
import type { Character } from '@/types/character'
import { useDmNotesStore, type MomentKind } from '@/store/dmNotesStore'
import { useSessionStore } from '@/store/sessionStore'

const MOMENT_KINDS: { value: MomentKind; label: string }[] = [
  { value: 'beat', label: 'Beat' },
  { value: 'lie_told', label: 'Lie Told' },
  { value: 'promise', label: 'Promise' },
  { value: 'revelation', label: 'Revelation' },
  { value: 'death_flag', label: 'Death Flag' },
  { value: 'custom', label: 'Custom' },
]

interface MomentCaptureProps {
  campaignId: string
  characters: Character[]
}

export default function MomentCapture({ campaignId, characters }: MomentCaptureProps) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [kind, setKind] = useState<MomentKind>('beat')
  const [characterId, setCharacterId] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addMoment = useDmNotesStore(s => s.addMoment)
  const activeSession = useSessionStore(s => s.activeSession)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSubmit = async () => {
    if (!text.trim() || !activeSession) return
    setBusy(true)
    try {
      await addMoment({
        sessionId: activeSession.id,
        campaignId,
        characterId: characterId || null,
        text: text.trim(),
        kind,
      })
      setText('')
      setCharacterId('')
      setKind('beat')
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  if (!activeSession) return null

  return (
    <>
      {/* Floating action button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-lg flex items-center justify-center transition-all shadow-lg z-40"
          title="Capture moment (M)"
        >
          M
        </button>
      )}

      {/* Moment capture dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-[#1a1d22] border border-slate-700/30 rounded-lg shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs text-slate-400 tracking-widest uppercase">Capture Moment</h3>
              <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-300">&times;</button>
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="What just happened?"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/30 rounded px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/30"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />

            <div className="flex gap-2">
              <select
                value={kind}
                onChange={e => setKind(e.target.value as MomentKind)}
                className="bg-slate-900/50 border border-slate-700/30 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none flex-1"
              >
                {MOMENT_KINDS.map(k => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>

              <select
                value={characterId}
                onChange={e => setCharacterId(e.target.value)}
                className="bg-slate-900/50 border border-slate-700/30 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none flex-1"
              >
                <option value="">No character</option>
                {characters.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={busy || !text.trim()}
              className="w-full py-2 rounded text-xs tracking-widest bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all disabled:opacity-50"
            >
              {busy ? 'SAVING...' : 'CAPTURE'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
