import { useState } from 'react'
import { useSessionStore } from '@/store/sessionStore'

interface SessionPanelProps {
  campaignId: string
}

export default function SessionPanel({ campaignId }: SessionPanelProps) {
  const { activeSession, startSession, endSession } = useSessionStore()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [showStartForm, setShowStartForm] = useState(false)
  const [showEndForm, setShowEndForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleStart = async () => {
    setBusy(true)
    setError(null)
    try {
      await startSession(campaignId, title.trim() || undefined)
      setTitle('')
      setShowStartForm(false)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const handleEnd = async () => {
    if (!activeSession) return
    setBusy(true)
    setError(null)
    try {
      await endSession(activeSession.id, summary.trim() || undefined)
      setSummary('')
      setShowEndForm(false)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const elapsed = activeSession
    ? Math.floor((Date.now() - new Date(activeSession.startedAt).getTime()) / 60000)
    : 0

  return (
    <div className="mb-6 rounded-md border border-zinc-700/20 bg-zinc-800/20 p-4">
      {error && (
        <p className="text-xs text-red-400 mb-3">{error}</p>
      )}

      {activeSession ? (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400 tracking-widest uppercase">Session Active</span>
          </div>
          {activeSession.title && (
            <p className="text-sm text-zinc-200 mb-1">{activeSession.title}</p>
          )}
          <p className="text-[10px] text-zinc-500 mb-3">
            Started {new Date(activeSession.startedAt).toLocaleTimeString()} · {elapsed} min
          </p>

          {showEndForm ? (
            <div className="space-y-2">
              <textarea
                placeholder="Shared summary for players (optional)"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900/50 border border-zinc-700/30 rounded px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-500/30"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEnd}
                  disabled={busy}
                  className="flex-1 py-1.5 rounded text-xs tracking-widest bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all disabled:opacity-50"
                >
                  {busy ? 'ENDING...' : 'END SESSION'}
                </button>
                <button
                  onClick={() => setShowEndForm(false)}
                  className="px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowEndForm(true)}
              className="w-full py-1.5 rounded text-xs tracking-widest bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
            >
              END SESSION
            </button>
          )}
        </div>
      ) : (
        <div>
          {showStartForm ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Session title (optional)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-700/30 rounded px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/30"
                onKeyDown={e => e.key === 'Enter' && handleStart()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleStart}
                  disabled={busy}
                  className="flex-1 py-1.5 rounded text-xs tracking-widest bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-all disabled:opacity-50"
                >
                  {busy ? 'STARTING...' : 'START'}
                </button>
                <button
                  onClick={() => setShowStartForm(false)}
                  className="px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowStartForm(true)}
              className="w-full py-2 rounded text-xs tracking-widest bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-all"
            >
              START SESSION
            </button>
          )}
        </div>
      )}
    </div>
  )
}
