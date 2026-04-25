import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { joinCampaignByCode } from '@/db/campaignRepository'

type Status = 'joining' | 'success' | 'already-member' | 'error'

export default function JoinPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('joining')
  const [campaignName, setCampaignName] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setStatus('error')
      setErrorMsg('No invite code provided.')
      return
    }

    joinCampaignByCode(code)
      .then(campaign => {
        setCampaignName(campaign.name)
        setStatus('success')
        setTimeout(() => navigate('/campaign', { replace: true }), 2000)
      })
      .catch(err => {
        const msg: string = (err as Error).message ?? ''
        if (msg.includes('already joined')) {
          setStatus('already-member')
          setTimeout(() => navigate('/campaign', { replace: true }), 2000)
        } else {
          setStatus('error')
          setErrorMsg(msg || 'Invalid or expired invite link.')
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return (
    <div className="min-h-screen bg-[#0F0D0B] flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center space-y-4">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-amber-100 tracking-tight">Warhammer Chronicles</h1>
          <p className="text-xs text-stone-500 tracking-[0.2em] uppercase mt-0.5">Campaign Invite</p>
        </div>

        {status === 'joining' && (
          <>
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto" />
            <p className="text-sm text-stone-400 tracking-wide animate-pulse">Joining campaign…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-3xl">⚔</div>
            <p className="text-sm font-semibold text-amber-200">
              Joined{campaignName ? ` "${campaignName}"` : ''}!
            </p>
            <p className="text-xs text-stone-500">Redirecting to your campaigns…</p>
          </>
        )}

        {status === 'already-member' && (
          <>
            <div className="text-3xl">✓</div>
            <p className="text-sm font-semibold text-stone-200">You're already in this campaign.</p>
            <p className="text-xs text-stone-500">Redirecting to your campaigns…</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-3xl">✕</div>
            <p className="text-sm font-semibold text-red-400">{errorMsg}</p>
            <button
              onClick={() => navigate('/', { replace: true })}
              className="mt-2 text-xs text-amber-400/70 hover:text-amber-300 tracking-widest transition-colors"
            >
              ← GO HOME
            </button>
          </>
        )}
      </div>
    </div>
  )
}
