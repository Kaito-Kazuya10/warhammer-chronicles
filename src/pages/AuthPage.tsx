import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'

type Mode = 'login' | 'signup'
type Role = 'player' | 'dm'

export default function AuthPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/'
  const { signIn, signUp, user } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<Role>('player')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  // If already logged in, redirect
  if (user) {
    navigate(redirectTo, { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)

    if (mode === 'login') {
      const { error: err } = await signIn(email, password)
      if (err) setError(err)
      else navigate(redirectTo, { replace: true })
    } else {
      if (!displayName.trim()) {
        setError('Display name is required.')
        setBusy(false)
        return
      }
      const { error: err } = await signUp(email, password, displayName.trim(), role)
      if (err) setError(err)
      else setSignupSuccess(true)
    }

    setBusy(false)
  }

  const switchMode = () => {
    setMode(m => (m === 'login' ? 'signup' : 'login'))
    setError(null)
    setSignupSuccess(false)
  }

  // ── Signup success screen ───────────────────────────────────────────────────
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-[#0F0D0B] flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-amber-100 mb-4">Check Your Email</h1>
          <p className="text-stone-400 text-sm mb-6 leading-relaxed">
            We sent a confirmation link to <span className="text-stone-200">{email}</span>.
            Click the link to activate your account, then come back here to log in.
          </p>
          <button
            onClick={() => { setMode('login'); setSignupSuccess(false) }}
            className="text-xs text-amber-400/80 hover:text-amber-300 tracking-widest transition-colors"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0F0D0B] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/warhammer_chronicles_logo.jpg"
            alt="Warhammer Chronicles"
            className="w-56 object-contain drop-shadow-[0_0_20px_rgba(196,164,74,0.25)]"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-stone-200 tracking-wide text-center">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </h3>

          {/* Signup-only fields */}
          {mode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                maxLength={40}
                className="w-full px-3 py-2 rounded-md bg-stone-800/50 border border-stone-700/40 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
              />

              {/* Role selector */}
              <div className="flex gap-2">
                {(['player', 'dm'] as Role[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`
                      flex-1 py-2 rounded-md text-xs tracking-wider uppercase font-medium border transition-all
                      ${role === r
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        : 'bg-stone-800/30 border-stone-700/30 text-stone-500 hover:text-stone-300 hover:border-stone-600/40'
                      }
                    `}
                  >
                    {r === 'player' ? 'Player' : 'Dungeon Master'}
                  </button>
                ))}
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-stone-800/50 border border-stone-700/40 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 rounded-md bg-stone-800/50 border border-stone-700/40 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
          />

          {error && (
            <p className="text-xs text-red-400/90 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 rounded-md bg-amber-600/80 hover:bg-amber-600 text-white text-sm font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? '...' : mode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'}
          </button>

          <p className="text-center text-xs text-stone-600">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button type="button" onClick={switchMode} className="text-amber-500/70 hover:text-amber-400 transition-colors">
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
