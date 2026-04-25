import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DbCampaignRow } from '@/db/types'
import { fetchCampaignMembers, type CampaignMember } from '@/db/campaignRepository'
import { useSessionStore } from '@/store/sessionStore'
import { subscribeToCampaign } from '@/lib/realtime/campaignChannel'
import { createCampaignHandlers } from '@/lib/realtime/eventHandlers'
import ActiveSessionPill from './ActiveSessionPill'

interface PlayerCampaignViewProps {
  campaign: DbCampaignRow
}

export default function PlayerCampaignView({ campaign }: PlayerCampaignViewProps) {
  const navigate = useNavigate()
  const [members, setMembers] = useState<CampaignMember[]>([])
  const [loading, setLoading] = useState(true)
  const activeSession = useSessionStore(s => s.activeSession)
  const loadActiveSession = useSessionStore(s => s.loadActiveSession)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [m] = await Promise.all([
        fetchCampaignMembers(campaign.id),
        loadActiveSession(campaign.id),
      ])
      setMembers(m)
    } catch {
      setMembers([])
    } finally {
      setLoading(false)
    }
  }, [campaign.id, loadActiveSession])

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    const handlers = createCampaignHandlers(new Map())
    const unsub = subscribeToCampaign(campaign.id, handlers)
    return () => { unsub() }
  }, [campaign.id])

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
        </div>

        <ActiveSessionPill session={activeSession} />

        {loading ? (
          <p className="text-zinc-600 text-xs py-3 animate-pulse">Loading...</p>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  )
}
