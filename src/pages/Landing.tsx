import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Campaign',
    route: '/campaign',
    icon: '⚔',
    description: 'Manage your active campaigns, sessions, and party.',
    available: false,
  },
  {
    label: 'Characters',
    route: '/characters',
    icon: '🛡',
    description: 'View and manage your roster of characters.',
    available: true,
  },
  {
    label: 'Character Creation',
    route: '/create',
    icon: '✦',
    description: 'Forge a new warrior for the Old World.',
    available: true,
  },
  {
    label: 'Repository',
    route: '/repository',
    icon: '📦',
    description: 'Import and manage content modules — spells, items, and more.',
    available: false,
  },
  {
    label: 'Compendium',
    route: '/compendium',
    icon: '📖',
    description: 'Browse all rules, spells, items, and lore entries.',
    available: false,
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-6">
      {/* Title block */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px w-24 bg-amber-700" />
          <span className="text-amber-600 text-xs tracking-[0.4em] uppercase">The Old World</span>
          <div className="h-px w-24 bg-amber-700" />
        </div>
        <h1 className="text-5xl font-bold text-amber-100 tracking-tight leading-none">
          Warhammer
        </h1>
        <h2 className="text-xl text-amber-600 tracking-[0.2em] uppercase mt-1">
          Chronicles
        </h2>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="h-px w-16 bg-amber-800" />
          <div className="w-1.5 h-1.5 bg-amber-700 rotate-45" />
          <div className="h-px w-16 bg-amber-800" />
        </div>
      </div>

      {/* Nav grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            onClick={() => item.available && navigate(item.route)}
            disabled={!item.available}
            className={`
              group relative text-left border rounded p-5 transition-all duration-200
              ${item.available
                ? 'border-amber-700 bg-stone-900 hover:bg-stone-800 hover:border-amber-500 cursor-pointer'
                : 'border-stone-800 bg-stone-900/50 cursor-not-allowed opacity-50'
              }
            `}
          >
            {/* Coming soon badge */}
            {!item.available && (
              <span className="absolute top-3 right-3 text-xs text-stone-600 border border-stone-700 rounded px-1.5 py-0.5">
                soon
              </span>
            )}

            <div className="text-2xl mb-3 text-amber-500">{item.icon}</div>
            <h3 className={`font-bold tracking-wide text-base mb-1 ${item.available ? 'text-amber-200 group-hover:text-amber-100' : 'text-stone-500'}`}>
              {item.label}
            </h3>
            <p className={`text-sm leading-snug ${item.available ? 'text-amber-700 group-hover:text-amber-600' : 'text-stone-700'}`}>
              {item.description}
            </p>

            {/* Arrow indicator for available items */}
            {item.available && (
              <div className="mt-4 text-amber-700 group-hover:text-amber-400 text-xs tracking-widest transition-colors">
                ENTER →
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="mt-10 text-stone-700 text-xs tracking-widest">
        WARHAMMER CHRONICLES — HOMEBREW COMPANION
      </p>
    </div>
  )
}
