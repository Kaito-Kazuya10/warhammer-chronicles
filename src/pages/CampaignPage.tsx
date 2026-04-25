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
  renameCampaign,
  deleteCampaign,
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

  // ── Rename campaign (DM) ────────────────────────────────────────────────────

  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const handleStartRename = (c: DbCampaignRow) => {
    setRenamingId(c.id)
    setRenameValue(c.name)
  }

  const handleRename = async (id: string) => {
    if (!renameValue.trim()) return
    setBusy(true)
    setError(null)
    try {
      await renameCampaign(id, renameValue.trim())
      setRenamingId(null)
      await load()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  // ── Delete campaign (DM) ────────────────────────────────────────────────────

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setBusy(true)
    setError(null)
    try {
      await deleteCampaign(id)
      setDeletingId(null)
      setExpandedId(null)
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
    <div className="min-h-screen bg-[#111114] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-zinc-500 hover:text-zinc-300 text-xs tracking-widest transition-colors"
          >
            ← HOME
          </button>
          <div className="h-px flex-1 bg-zinc-800/60" />
          <h1 className="text-sm font-semibold text-zinc-200 tracking-[0.2em] uppercase">
            Campaigns
          </h1>
          <div className="h-px flex-1 bg-zinc-800/60" />
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
              className="flex-1 px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700/40 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 transition-colors"
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
              className="flex-1 px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700/40 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 transition-colors font-mono"
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
          <p className="text-zinc-600 text-sm text-center py-8 animate-pulse tracking-widest">LOADING...</p>
        ) : campaigns.length === 0 ? (
          <div className="border border-dashed border-zinc-700/40 rounded-lg py-16 text-center">
            <p className="text-sm text-zinc-500 tracking-wide">
              {isDm ? 'No campaigns yet — create one above' : 'No campaigns yet — ask your DM for an invite code'}
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {campaigns.map(c => (
              <div key={c.id} className="border border-zinc-700/25 rounded-lg bg-zinc-800/20">
                {/* Campaign header row */}
                <button
                  onClick={() => toggleExpand(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700/15 transition-colors rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-zinc-100">{c.name}</span>
                    {isDm && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-zinc-500">Invite code:</span>
                        <span className="text-[11px] font-mono text-amber-400/70">{c.invite_code}</span>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); copyLink(c.invite_code) }}
                          className="text-[9px] text-zinc-600 hover:text-amber-400/70 tracking-wider transition-colors"
                        >
                          {copied === c.invite_code ? 'COPIED ✓' : 'COPY LINK'}
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-zinc-700 text-xs">
                    {expandedId === c.id ? '−' : '+'}
                  </span>
                </button>

                {/* Expanded detail */}
                {expandedId === c.id && (
                  <div className="px-4 pb-4 border-t border-zinc-700/15">
                    {detailLoading ? (
                      <p className="text-zinc-600 text-xs py-3 animate-pulse">Loading...</p>
                    ) : (
                      <>
                        {/* Members */}
                        <div className="mt-3">
                          <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                            Members ({members.length})
                          </h4>
                          {members.length === 0 ? (
                            <p className="text-xs text-zinc-600">No players have joined yet.</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {members.map(m => (
                                <span
                                  key={m.userId}
                                  className="text-xs px-2 py-1 rounded bg-zinc-800/40 border border-zinc-700/20 text-zinc-300"
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
                            <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                              Characters ({campaignChars.length})
                            </h4>
                            <div className="grid gap-1.5">
                              {campaignChars.map(ch => (
                                <div
                                  key={ch.id}
                                  className="flex items-center gap-3 px-3 py-2 rounded-md bg-zinc-800/30 border border-zinc-700/15"
                                >
                                  <div className="w-7 h-7 rounded-full bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center shrink-0 text-[9px] font-bold text-zinc-600">
                                    {ch.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-medium text-zinc-200 truncate block">
                                      {ch.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">
                                      Lvl {ch.level} {ch.class} {ch.race && `· ${ch.race}`}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-zinc-600 font-mono">
                                    {ch.currentHitPoints}/{ch.maxHitPoints}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* View campaign detail */}
                        <button
                          onClick={() => navigate(`/campaigns/${c.id}`)}
                          className="mt-4 w-full py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 hover:text-amber-200 border border-amber-500/20 hover:border-amber-500/35 text-xs tracking-widest transition-all"
                        >
                          VIEW CAMPAIGN
                        </button>

                        {/* DM actions: rename & delete */}
                        {isDm && c.dm_id === profile?.id && (
                          <div className="mt-3 flex gap-2">
                            {renamingId === c.id ? (
                              <div className="flex gap-1.5 flex-1">
                                <input
                                  type="text"
                                  value={renameValue}
                                  onChange={e => setRenameValue(e.target.value)}
                                  maxLength={60}
                                  autoFocus
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') handleRename(c.id)
                                    if (e.key === 'Escape') setRenamingId(null)
                                  }}
                                  className="flex-1 px-2 py-1.5 rounded-md bg-zinc-800/50 border border-zinc-700/40 text-zinc-100 text-xs focus:outline-none focus:border-amber-500/40 transition-colors"
                                />
                                <button
                                  onClick={() => handleRename(c.id)}
                                  disabled={busy || !renameValue.trim()}
                                  className="px-3 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 border border-amber-500/20 text-[10px] tracking-wider disabled:opacity-50"
                                >
                                  SAVE
                                </button>
                                <button
                                  onClick={() => setRenamingId(null)}
                                  className="px-3 py-1.5 rounded-md bg-zinc-800/30 hover:bg-zinc-700/30 text-zinc-400 border border-zinc-700/20 text-[10px] tracking-wider"
                                >
                                  CANCEL
                                </button>
                              </div>
                            ) : deletingId === c.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <span className="text-xs text-red-400/80 flex-1">Delete this campaign permanently?</span>
                                <button
                                  onClick={() => handleDelete(c.id)}
                                  disabled={busy}
                                  className="px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[10px] tracking-wider disabled:opacity-50"
                                >
                                  CONFIRM
                                </button>
                                <button
                                  onClick={() => setDeletingId(null)}
                                  className="px-3 py-1.5 rounded-md bg-zinc-800/30 hover:bg-zinc-700/30 text-zinc-400 border border-zinc-700/20 text-[10px] tracking-wider"
                                >
                                  CANCEL
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleStartRename(c)}
                                  className="flex-1 py-1.5 rounded-md bg-zinc-800/30 hover:bg-zinc-700/30 text-zinc-400 hover:text-zinc-200 border border-zinc-700/20 text-[10px] tracking-widest transition-colors"
                                >
                                  RENAME
                                </button>
                                <button
                                  onClick={() => setDeletingId(c.id)}
                                  className="flex-1 py-1.5 rounded-md bg-red-500/5 hover:bg-red-500/15 text-red-400/60 hover:text-red-400 border border-red-500/10 hover:border-red-500/25 text-[10px] tracking-widest transition-colors"
                                >
                                  DELETE
                                </button>
                              </>
                            )}
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
