import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import { useAuth } from '../auth/useAuth'
import { getAllItems } from '../modules/registry'

// ─── Sidebar nav items ───────────────────────────────────────────────────────

const MAIN_NAV = [
  { label: 'Characters', route: '/characters', available: true },
  { label: 'Create', route: '/create', available: true },
  { label: 'Campaign', route: '/campaign', available: true },
  { label: 'Modules', route: '/modules', available: true },
  { label: 'Compendium', route: '/compendium', available: true },
]

const BOTTOM_NAV = [
  { label: 'Settings', route: '/settings', available: true },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Landing() {
  const navigate = useNavigate()
  const { characters, setActiveCharacter, loadCharacters } = useCharacterStore()
  const { profile } = useAuth()
  const recentItems = useMemo(() => getAllItems().slice(0, 4), [])

  useEffect(() => { loadCharacters() }, [loadCharacters])

  const openCharacter = (id: string) => {
    setActiveCharacter(id)
    navigate('/sheet')
  }

  return (
    <div className="min-h-screen bg-[#131519] flex">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 bg-[#0f1115] border-r border-slate-700/30 flex flex-col">
        {/* Account button (top) → navigate to Settings */}
        <button
          onClick={() => navigate('/settings')}
          className="px-4 py-3 border-b border-slate-700/25 flex items-center gap-2 hover:bg-slate-700/15 transition-colors text-left"
        >
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700/40 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-slate-400">
              {(profile?.displayName || 'U').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-300 truncate font-medium">
              {profile?.displayName || 'User'}
            </p>
            <p className="text-[9px] text-amber-500/50 uppercase tracking-wider">
              {profile?.role || 'player'}
            </p>
          </div>
        </button>

        {/* Main nav */}
        <nav className="flex-1 py-2 px-2 flex flex-col gap-0.5">
          {MAIN_NAV.map(item => (
            <button
              key={item.label}
              onClick={() => item.available && navigate(item.route)}
              disabled={!item.available}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm transition-all
                ${item.available
                  ? 'text-slate-200 hover:bg-slate-700/25 hover:text-white cursor-pointer'
                  : 'text-slate-600 cursor-not-allowed'
                }
              `}
            >
              <span className="tracking-wide">{item.label}</span>
              {!item.available && (
                <span className="ml-auto text-[9px] text-slate-600 border border-slate-700/50 rounded px-1 py-0.5 leading-none">
                  soon
                </span>
              )}
            </button>
          ))}

          {/* Spacer pushes bottom nav down */}
          <div className="flex-1" />

          {/* Bottom nav items */}
          <div className="border-t border-slate-700/20 pt-2 mt-2 flex flex-col gap-0.5">
            {BOTTOM_NAV.map(item => (
              <button
                key={item.label}
                onClick={() => item.available && navigate(item.route)}
                disabled={!item.available}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm transition-all
                  ${item.available
                    ? 'text-slate-200 hover:bg-slate-700/25 hover:text-white cursor-pointer'
                    : 'text-slate-600 cursor-not-allowed'
                  }
                `}
              >
                <span className="tracking-wide">{item.label}</span>
                {!item.available && (
                  <span className="ml-auto text-[9px] text-slate-600 border border-slate-700/50 rounded px-1 py-0.5 leading-none">
                    soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* ── Title area ───────────────────────────────────────────────── */}
        <header className="pt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/30" />
            <span className="text-amber-400/70 text-[10px] tracking-[0.5em] uppercase font-medium">
              The Old World
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/30" />
          </div>

          <h1 className="landing-title text-5xl font-bold text-amber-100 tracking-tight leading-none">
            Warhammer
          </h1>
          <h2 className="landing-subtitle text-lg text-amber-400/90 tracking-[0.25em] uppercase mt-1 font-medium">
            Chronicles
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-14 bg-slate-700/40" />
            <div className="w-1.5 h-1.5 bg-amber-500/40 rotate-45" />
            <div className="h-px w-14 bg-slate-700/40" />
          </div>
        </header>

        {/* ── Characters section ───────────────────────────────────────── */}
        <section className="flex-1 px-8 pb-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs tracking-[0.2em] text-slate-400 uppercase font-semibold">
                Your Characters
              </h3>
              <button
                onClick={() => navigate('/create')}
                className="text-[10px] px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 hover:text-amber-200 rounded border border-amber-500/20 hover:border-amber-500/35 tracking-widest transition-all"
              >
                + NEW
              </button>
            </div>

            {characters.length === 0 ? (
              <div className="border border-dashed border-slate-700/40 rounded-lg py-12 text-center">
                <p className="text-sm text-slate-500 tracking-wide">No characters yet</p>
                <button
                  onClick={() => navigate('/create')}
                  className="mt-3 text-xs text-amber-400/70 hover:text-amber-300 tracking-widest transition-colors"
                >
                  CREATE YOUR FIRST CHARACTER →
                </button>
              </div>
            ) : (
              <div className="grid gap-2">
                {characters.map(c => (
                  <button
                    key={c.id}
                    onClick={() => openCharacter(c.id)}
                    className="group flex items-center gap-4 w-full text-left border border-slate-700/25 rounded-lg bg-slate-800/20 hover:bg-slate-700/25 hover:border-slate-600/40 transition-all px-4 py-3"
                  >
                    {/* Portrait or placeholder */}
                    <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/30 flex items-center justify-center shrink-0 overflow-hidden">
                      {c.portrait ? (
                        <img src={c.portrait} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-slate-600 text-[10px] font-bold">CH</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-slate-100 group-hover:text-white truncate">
                          {c.name}
                        </span>
                        {c.class && (
                          <span className="text-[10px] text-amber-500/50 tracking-wider uppercase shrink-0">
                            {c.class}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-0.5 text-[11px] text-slate-500">
                        <span>Lvl {c.level}</span>
                        <span>{c.currentHitPoints}/{c.maxHitPoints} Wounds</span>
                        {c.race && <span className="text-slate-600">{c.race}</span>}
                      </div>
                    </div>

                    {/* Arrow */}
                    <span className="text-slate-700 group-hover:text-amber-500/50 transition-colors text-xs">
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Recent Compendium section ────────────────────────────────── */}
        <section className="px-8 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xs tracking-[0.2em] text-slate-500 uppercase font-semibold">
                Compendium
              </h3>
              <div className="h-px flex-1 bg-slate-800/60" />
              <button
                onClick={() => navigate('/compendium')}
                className="text-[9px] text-amber-500/60 hover:text-amber-400 border border-amber-500/20 hover:border-amber-500/40 rounded px-1.5 py-0.5 tracking-wider transition-colors"
              >
                VIEW ALL →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {recentItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate('/compendium')}
                  className="border border-slate-700/20 rounded-md bg-slate-800/15 px-3 py-2.5 text-left hover:bg-slate-700/20 hover:border-slate-600/30 transition-colors"
                >
                  <p className="text-xs text-slate-300 font-medium truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-600 capitalize">{item.type}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
