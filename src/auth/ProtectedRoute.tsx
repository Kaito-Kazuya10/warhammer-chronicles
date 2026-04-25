import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0D0B] flex items-center justify-center">
        <p className="text-stone-500 text-sm tracking-widest animate-pulse">LOADING...</p>
      </div>
    )
  }

  if (!user) return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />

  return <>{children}</>
}
