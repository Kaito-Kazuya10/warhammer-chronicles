import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'
import type { DbCampaignRow } from '@/db/types'
import type { Character } from '@/types/character'
import {
  createCampaign,
  joinCampaignByCode,
  fetchMyCampaigns,
  fetchCampaignMembers,
  type CampaignMember,
} from '@/db/campaignRepository'
import { fetchCampaignCharacters } from '@/db/characterRepository'

// ─── Component ───────────────────────────────────────────────────────────────

export default function CampaignPage() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const isDm = profile?.role === 'dm'

  const [campaigns, setCampaigns] = useState<DbCampaignRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [campaignName, setCampaignName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [busy, setBusy] = useState(false)

  // Expanded campaign detail
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [members, setMembers] = useState<CampaignMember[]>([])
  const [campaignChars, setCampaignChars] = useState<Character[]>([])
  const [detailLoading, setDetailLoading] = useState(false)

  // ── Load campaigns ──────────────────────────────────────────────────────────

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchMyCampaigns()
      setCampaigns(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // ── Expand campaign detail ──────────────────────────────────────────────────

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
      return
    }
    setExpandedId(id)
    setDetailLoading(true)
    try {
      const [m, c] = await Promise.all([
        fetchCampaignMembers(id),
        isDm ? fetchCampaignCharacters(id) : Promise.resolve([]),
      ])
      setMembers(m)
      setCampaignChars(c)
    } catch {
      setMembers([])
      setCampaignChars([])
    } finally {
      setDetailLoading(false)
    }
  }

  // ── Create campaign (DM) ────────────────────────────────────────────────────

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!campaignName.trim()) return
    setBusy(true)
    setError(null)
    try {
      await createCampaign(campaignName.trim())
      setCampaignName('')
      await load()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  // ── Join campaign (Player) ──────────────────────────────────────────────────

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteCode.trim()) return
    setBusy(true)
    setError(null)
    try {
      await joinCampaignByCode(inviteCode.trim())
      setInviteCode('')
      await load()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  // ── Copy invite code ────────────────────────────────────────────────────────

  const [copied, setCopied] = useState<string | null>(null)
  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${code}`)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#131519] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-slate-300 text-xs tracking-widest transition-colors"
          >
            ← HOME
          </button>
          <div className="h-px flex-1 bg-slate-800/60" />
          <h1 className="text-sm font-semibold text-slate-200 tracking-[0.2em] uppercase">
            Campaigns
          </h1>
          <div className="h-px flex-1 bg-slate-800/60" />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Create / Join form */}
        {isDm ? (
          <form onSubmit={handleCreate} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="New campaign name..."
              value={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              maxLength={60}
              className="flex-1 px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
            />
            <button
              type="submit"
              disabled={busy || !campaignName.trim()}
              className="px-4 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 hover:text-amber-200 border border-amber-500/20 hover:border-amber-500/35 text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CREATE
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoin} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter invite code..."
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              maxLength={20}
              className="flex-1 px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors font-mono"
            />
            <button
              type="submit"
              disabled={busy || !inviteCode.trim()}
              className="px-4 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 hover:text-amber-200 border border-amber-500/20 hover:border-amber-500/35 text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              JOIN
            </button>
          </form>
        )}

        {/* Campaign list */}
        {loading ? (
          <p className="text-slate-600 text-sm text-center py-8 animate-pulse tracking-widest">LOADING...</p>
        ) : campaigns.length === 0 ? (
          <div className="border border-dashed border-slate-700/40 rounded-lg py-16 text-center">
            <p className="text-sm text-slate-500 tracking-wide">
              {isDm ? 'No campaigns yet — create one above' : 'No campaigns yet — ask your DM for an invite code'}
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {campaigns.map(c => (
              <div key={c.id} className="border border-slate-700/25 rounded-lg bg-slate-800/20">
                {/* Campaign header row */}
                <button
                  onClick={() => toggleExpand(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700/15 transition-colors rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-slate-100">{c.name}</span>
                    {isDm && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500">Invite code:</span>
                        <span className="text-[11px] font-mono text-amber-400/70">{c.invite_code}</span>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); copyLink(c.invite_code) }}
                          className="text-[9px] text-slate-600 hover:text-amber-400/70 tracking-wider transition-colors"
                        >
                          {copied === c.invite_code ? 'COPIED ✓' : 'COPY LINK'}
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-slate-700 text-xs">
                    {expandedId === c.id ? '−' : '+'}
                  </span>
                </button>

                {/* Expanded detail */}
                {expandedId === c.id && (
                  <div className="px-4 pb-4 border-t border-slate-700/15">
                    {detailLoading ? (
                      <p className="text-slate-600 text-xs py-3 animate-pulse">Loading...</p>
                    ) : (
                      <>
                        {/* Members */}
                        <div className="mt-3">
                          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                            Members ({members.length})
                          </h4>
                          {members.length === 0 ? (
                            <p className="text-xs text-slate-600">No players have joined yet.</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {members.map(m => (
                                <span
                                  key={m.userId}
                                  className="text-xs px-2 py-1 rounded bg-slate-800/40 border border-slate-700/20 text-slate-300"
                                >
                                  {m.displayName}
                                  <span className="ml-1 text-[9px] text-amber-500/40 uppercase">{m.role}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Campaign characters (DM only) */}
                        {isDm && campaignChars.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                              Characters ({campaignChars.length})
                            </h4>
                            <div className="grid gap-1.5">
                              {campaignChars.map(ch => (
                                <div
                                  key={ch.id}
                                  className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800/30 border border-slate-700/15"
                                >
                                  <div className="w-7 h-7 rounded-full bg-slate-800/50 border border-slate-700/30 flex items-center justify-center shrink-0 text-[9px] font-bold text-slate-600">
                                    {ch.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-medium text-slate-200 truncate block">
                                      {ch.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                      Lvl {ch.level} {ch.class} {ch.race && `· ${ch.race}`}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-600 font-mono">
                                    {ch.currentHitPoints}/{ch.maxHitPoints}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
