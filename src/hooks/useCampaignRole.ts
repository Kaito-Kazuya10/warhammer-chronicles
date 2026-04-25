import { useState, useEffect } from 'react'
import { useAuth } from '@/auth/useAuth'
import { fetchCampaignById, checkCampaignMembership } from '@/db/campaignRepository'
import type { DbCampaignRow } from '@/db/types'

export type CampaignRole = 'dm' | 'player' | 'none'

interface UseCampaignRoleResult {
  role: CampaignRole
  campaign: DbCampaignRow | null
  loading: boolean
  error: string | null
}

export function useCampaignRole(campaignId: string | undefined): UseCampaignRoleResult {
  const { user } = useAuth()
  const [role, setRole] = useState<CampaignRole>('none')
  const [campaign, setCampaign] = useState<DbCampaignRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!campaignId || !user) {
      setRole('none')
      setCampaign(null)
      setLoading(false)
      return
    }

    let cancelled = false

    async function detect() {
      setLoading(true)
      setError(null)
      try {
        const [camp, isMember] = await Promise.all([
          fetchCampaignById(campaignId!),
          checkCampaignMembership(campaignId!, user!.id),
        ])

        if (cancelled) return

        if (!camp) {
          setError('Campaign not found')
          setRole('none')
          setCampaign(null)
          return
        }

        setCampaign(camp)

        if (camp.dm_id === user!.id) {
          setRole('dm')
        } else if (isMember) {
          setRole('player')
        } else {
          setRole('none')
          setError('You are not a member of this campaign')
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message)
          setRole('none')
          setCampaign(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    detect()
    return () => { cancelled = true }
  }, [campaignId, user])

  return { role, campaign, loading, error }
}
