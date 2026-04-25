import { useParams, useNavigate } from 'react-router-dom'
import { useCampaignRole } from '@/hooks/useCampaignRole'
import DMDashboard from './DMDashboard'
import PlayerCampaignView from './PlayerCampaignView'

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { role, campaign, loading, error } = useCampaignRole(id)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131519] flex items-center justify-center">
        <p className="text-slate-600 text-sm animate-pulse tracking-widest">LOADING...</p>
      </div>
    )
  }

  if (error || !campaign || role === 'none') {
    return (
      <div className="min-h-screen bg-[#131519] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-sm text-red-400">{error ?? 'Campaign not found'}</p>
          <button
            onClick={() => navigate('/campaign')}
            className="text-xs text-amber-400/70 hover:text-amber-300 tracking-widest transition-colors"
          >
            &larr; BACK TO CAMPAIGNS
          </button>
        </div>
      </div>
    )
  }

  if (role === 'dm') return <DMDashboard campaign={campaign} />
  return <PlayerCampaignView campaign={campaign} />
}
