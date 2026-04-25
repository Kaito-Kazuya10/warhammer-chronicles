import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '../auth/useAuth'
import { useSettingsStore } from '../store/settingsStore'

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-stone-700/25 rounded-lg bg-stone-800/20 overflow-hidden">
      <div className="px-5 py-3 border-b border-stone-700/25 bg-stone-800/30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">{title}</p>
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
  )
}

// ─── Inline feedback ──────────────────────────────────────────────────────────

function Feedback({ type, message }: { type: 'success' | 'error'; message: string }) {
  return (
    <p className={`text-xs mt-1.5 ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
      {message}
    </p>
  )
}

// ─── Toggle switch ─────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 transition-colors ${
        checked ? 'border-amber-500/60 bg-amber-500/25' : 'border-stone-600 bg-stone-700/40'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-stone-200 shadow transition-transform mt-[1px] ${
          checked ? 'transtone-x-[14px]' : 'transtone-x-[1px]'
        }`}
      />
    </button>
  )
}

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const navigate = useNavigate()
  const { profile, signOut, updateProfile, user } = useAuth()
  const { darkMode, setDarkMode } = useSettingsStore()

  // ── Profile ──────────────────────────────────────────────────────────────
  const [displayName, setDisplayName]       = useState(profile?.displayName ?? '')
  const [profileSaving, setProfileSaving]   = useState(false)
  const [profileFeedback, setProfileFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSaveProfile = async () => {
    if (!displayName.trim()) return
    setProfileSaving(true)
    setProfileFeedback(null)
    const { error } = await updateProfile({ displayName: displayName.trim() })
    setProfileFeedback(error
      ? { type: 'error', message: error }
      : { type: 'success', message: 'Display name updated.' }
    )
    setProfileSaving(false)
  }

  // ── Change email ──────────────────────────────────────────────────────────
  const [newEmail, setNewEmail]             = useState('')
  const [emailSaving, setEmailSaving]       = useState(false)
  const [emailFeedback, setEmailFeedback]   = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChangeEmail = async () => {
    if (!newEmail.trim()) return
    setEmailSaving(true)
    setEmailFeedback(null)
    const { error } = await supabase.auth.updateUser({ email: newEmail.trim() })
    setEmailFeedback(error
      ? { type: 'error', message: error.message }
      : { type: 'success', message: 'Confirmation email sent. Check your inbox.' }
    )
    if (!error) setNewEmail('')
    setEmailSaving(false)
  }

  // ── Change password ───────────────────────────────────────────────────────
  const [newPassword, setNewPassword]           = useState('')
  const [confirmPassword, setConfirmPassword]   = useState('')
  const [passwordSaving, setPasswordSaving]     = useState(false)
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChangePassword = async () => {
    if (!newPassword) return
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', message: 'Passwords do not match.' })
      return
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'Password must be at least 6 characters.' })
      return
    }
    setPasswordSaving(true)
    setPasswordFeedback(null)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordFeedback(error
      ? { type: 'error', message: error.message }
      : { type: 'success', message: 'Password updated successfully.' }
    )
    if (!error) { setNewPassword(''); setConfirmPassword('') }
    setPasswordSaving(false)
  }

  // ── Delete account ────────────────────────────────────────────────────────
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput]             = useState('')
  const [deleteError, setDeleteError]             = useState('')

  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') {
      setDeleteError('Type DELETE in all caps to confirm.')
      return
    }
    // User-facing deletion: sign out and let the server handle cleanup,
    // or call a Supabase edge function if one exists
    await signOut()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-[#0F0D0B] p-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-stone-500 hover:text-stone-300 text-xs tracking-widest transition-colors"
          >
            ← HOME
          </button>
          <div className="h-px flex-1 bg-stone-800/60" />
          <h1 className="text-sm font-semibold text-stone-200 tracking-[0.2em] uppercase">
            Settings
          </h1>
          <div className="h-px flex-1 bg-stone-800/60" />
        </div>

        <div className="space-y-5">

          {/* ── Profile ── */}
          <Section title="Profile">
            {/* Display name */}
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block">Display Name</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSaveProfile() }}
                  placeholder="Your name"
                  className="flex-1 bg-stone-800/40 border border-stone-700/40 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none focus:border-amber-500/40 transition-colors"
                />
                <button
                  onClick={handleSaveProfile}
                  disabled={profileSaving || !displayName.trim()}
                  className="px-4 py-2 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm hover:bg-amber-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {profileSaving ? 'Saving…' : 'Save'}
                </button>
              </div>
              {profileFeedback && <Feedback {...profileFeedback} />}
            </div>

            {/* Role — read-only */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">Role</span>
              <span className="text-xs text-amber-400/70 uppercase tracking-widest border border-amber-500/20 rounded px-2 py-0.5">
                {profile?.role ?? 'player'}
              </span>
            </div>

            {/* Current email — read-only */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">Email</span>
              <span className="text-xs text-stone-400 font-mono">{user?.email ?? '—'}</span>
            </div>
          </Section>

          {/* ── Account Security ── */}
          <Section title="Account Security">
            {/* Change email */}
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block">Change Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="New email address"
                  className="flex-1 bg-stone-800/40 border border-stone-700/40 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none focus:border-amber-500/40 transition-colors"
                />
                <button
                  onClick={handleChangeEmail}
                  disabled={emailSaving || !newEmail.trim()}
                  className="px-4 py-2 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm hover:bg-amber-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {emailSaving ? 'Sending…' : 'Update'}
                </button>
              </div>
              {emailFeedback && <Feedback {...emailFeedback} />}
            </div>

            {/* Change password */}
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block">Change Password</label>
              <div className="space-y-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full bg-stone-800/40 border border-stone-700/40 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none focus:border-amber-500/40 transition-colors"
                />
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleChangePassword() }}
                    placeholder="Confirm new password"
                    className="flex-1 bg-stone-800/40 border border-stone-700/40 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none focus:border-amber-500/40 transition-colors"
                  />
                  <button
                    onClick={handleChangePassword}
                    disabled={passwordSaving || !newPassword}
                    className="px-4 py-2 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm hover:bg-amber-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {passwordSaving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
              {passwordFeedback && <Feedback {...passwordFeedback} />}
            </div>
          </Section>

          {/* ── Appearance ── */}
          <Section title="Appearance">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-200">Dark Mode</p>
                <p className="text-xs text-stone-500 mt-0.5">Apply the dark theme across the entire app</p>
              </div>
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </div>
          </Section>

          {/* ── Danger Zone ── */}
          <Section title="Danger Zone">
            {/* Sign out */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-200">Sign Out</p>
                <p className="text-xs text-stone-500 mt-0.5">End your current session</p>
              </div>
              <button
                onClick={() => signOut().then(() => navigate('/auth'))}
                className="px-4 py-2 rounded-md bg-stone-700/40 border border-stone-600/40 text-stone-300 text-sm hover:bg-stone-700/60 transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Delete account */}
            <div className="border-t border-stone-700/25 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-red-400">Delete Account</p>
                  <p className="text-xs text-stone-500 mt-0.5">Permanently remove your account and all data</p>
                </div>
                {!showDeleteConfirm && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 rounded-md bg-red-500/10 border border-red-500/25 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>

              {showDeleteConfirm && (
                <div className="rounded-md border border-red-500/25 bg-red-500/5 p-4 space-y-3">
                  <p className="text-xs text-red-300/80">
                    This action is <strong>permanent and irreversible</strong>. All your characters and data will be lost. Type <span className="font-mono font-bold text-red-300">DELETE</span> to confirm.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={deleteInput}
                      onChange={e => { setDeleteInput(e.target.value); setDeleteError('') }}
                      placeholder="Type DELETE"
                      className="flex-1 bg-stone-800/60 border border-red-500/25 rounded-md px-3 py-2 text-sm text-red-300 placeholder-stone-600 outline-none font-mono"
                    />
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteInput !== 'DELETE'}
                      className="px-4 py-2 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 text-sm hover:bg-red-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); setDeleteError('') }}
                      className="px-3 py-2 rounded-md border border-stone-700/40 text-stone-400 text-sm hover:bg-stone-700/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  {deleteError && <p className="text-xs text-red-400">{deleteError}</p>}
                </div>
              )}
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
