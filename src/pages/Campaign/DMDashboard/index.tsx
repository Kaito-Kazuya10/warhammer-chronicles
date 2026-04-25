import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DbCampaignRow } from '@/db/types'
import type { Character } from '@/types/character'
import { fetchCampaignMembers, type CampaignMember } from '@/db/campaignRepository'
import { fetchCampaignCharacters } from '@/db/characterRepository'
import { useSessionStore } from '@/store/sessionStore'
import { useDiceStore } from '@/store/diceStore'
import { subscribeToCampaign } from '@/lib/realtime/campaignChannel'
import { createCampaignHandlers } from '@/lib/realtime/eventHandlers'
import { useDmNotesStore } from '@/store/dmNotesStore'
import SessionPanel from './SessionPanel'
import PartyStrip from './PartyStrip'
import LiveRollFeed from './LiveRollFeed'
import MomentCapture from './MomentCapture'

interface DMDashboardProps {
  campaign: DbCampaignRow
}

export default function DMDashboard({ campaign }: DMDashboardProps) {
  const navigate = useNavigate()
  const [members, setMembers] = useState<CampaignMember[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const loadActiveSession = useSessionStore(s => s.loadActiveSession)
  const loadNotes = useDmNotesStore(s => s.loadNotes)
  const loadMoments = useDmNotesStore(s => s.loadMoments)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [m, c] = await Promise.all([
        fetchCampaignMembers(campaign.id),
        fetchCampaignCharacters(campaign.id),
        loadActiveSession(campaign.id),
        loadNotes(campaign.id),
        loadMoments(campaign.id),
      ])
      setMembers(m)
      setCharacters(c)
    } catch {
      setMembers([])
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }, [campaign.id, loadActiveSession, loadNotes, loadMoments])

  useEffect(() => { loadData() }, [loadData])

  const charNameMap = useMemo(() => {
    const m = new Map<string, string>()
    characters.forEach(ch => m.set(ch.id, ch.name))
    return m
  }, [characters])

  useEffect(() => {
    const handlers = createCampaignHandlers(charNameMap)
    const unsub = subscribeToCampaign(campaign.id, handlers)
    return () => {
      unsub()
      useDiceStore.getState().clearCampaignRolls()
    }
  }, [campaign.id, charNameMap])

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${campaign.invite_code}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#111114] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/campaign')}
            className="text-zinc-500 hover:text-zinc-300 text-xs tracking-widest transition-colors"
          >
            &larr; CAMPAIGNS
          </button>
          <div className="h-px flex-1 bg-zinc-800/60" />
          <h1 className="text-sm font-semibold text-zinc-200 tracking-[0.2em] uppercase">
            {campaign.name}
          </h1>
          <div className="h-px flex-1 bg-zinc-800/60" />
          <span className="text-[9px] text-amber-500/50 tracking-widest uppercase">DM</span>
        </div>

        {/* Invite code */}
        <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-md bg-zinc-800/30 border border-zinc-700/20">
          <span className="text-[10px] text-zinc-500">Invite code:</span>
          <span className="text-[11px] font-mono text-amber-400/70">{campaign.invite_code}</span>
          <button
            type="button"
            onClick={copyLink}
            className="text-[9px] text-zinc-600 hover:text-amber-400/70 tracking-wider transition-colors ml-auto"
          >
            {copied ? 'COPIED ✓' : 'COPY LINK'}
          </button>
        </div>

        {/* Session controls */}
        <SessionPanel campaignId={campaign.id} />

        {loading ? (
          <p className="text-zinc-600 text-xs py-3 animate-pulse">Loading...</p>
        ) : (
          <>
            {/* Party strip */}
            <PartyStrip characters={characters} campaignId={campaign.id} />

            {/* Members */}
            <div className="mb-6">
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

            {/* Characters */}
            {characters.length > 0 && (
              <div>
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                  Characters ({characters.length})
                </h4>
                <div className="grid gap-1.5">
                  {characters.map(ch => (
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

            {/* Live roll feed */}
            <LiveRollFeed />
          </>
        )}
      </div>

      <MomentCapture campaignId={campaign.id} characters={characters} />
    </div>
  )
}
