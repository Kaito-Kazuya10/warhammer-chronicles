import type { Session } from '@/store/sessionStore'

interface ActiveSessionPillProps {
  session: Session | null
}

export default function ActiveSessionPill({ session }: ActiveSessionPillProps) {
  if (!session) return null

  return (
    <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md bg-green-500/5 border border-green-500/15">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-xs text-green-400 tracking-widest uppercase">Session in progress</span>
      {session.title && (
        <span className="text-xs text-zinc-400 ml-1">— {session.title}</span>
      )}
    </div>
  )
}
