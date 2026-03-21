import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'

export default function Characters() {
  const navigate = useNavigate()
  const { characters, setActiveCharacter, deleteCharacter } = useCharacterStore()

  const open = (id: string) => {
    setActiveCharacter(id)
    navigate('/sheet')
  }

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-amber-700 hover:text-amber-500 text-sm tracking-widest transition-colors"
          >
            ← HOME
          </button>
          <div className="h-px flex-1 bg-amber-900" />
          <h1 className="text-xl font-bold text-amber-200 tracking-widest">CHARACTERS</h1>
          <div className="h-px flex-1 bg-amber-900" />
          <button
            onClick={() => navigate('/create')}
            className="text-xs px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded border border-amber-600 tracking-widest transition-colors"
          >
            + NEW
          </button>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-24 text-stone-600">
            <div className="text-4xl mb-4">⚔</div>
            <p className="text-sm tracking-widest">No characters yet.</p>
            <button
              onClick={() => navigate('/create')}
              className="mt-4 text-xs px-4 py-2 border border-amber-800 text-amber-700 hover:text-amber-500 hover:border-amber-600 rounded tracking-widest transition-colors"
            >
              CREATE YOUR FIRST CHARACTER
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {characters.map(c => (
              <div
                key={c.id}
                className="flex items-center border border-amber-800 rounded bg-stone-900 hover:bg-stone-800 transition-colors group"
              >
                <button
                  className="flex-1 text-left p-4"
                  onClick={() => open(c.id)}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-bold text-amber-100 group-hover:text-amber-50">
                      {c.name}
                    </span>
                    {c.class && (
                      <span className="text-xs text-amber-600 tracking-widest uppercase">
                        {c.class}
                      </span>
                    )}
                    {c.race && (
                      <span className="text-xs text-stone-500">
                        {c.race}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-stone-500">
                    <span>Level {c.level}</span>
                    <span>{c.currentHitPoints}/{c.maxHitPoints} Wounds</span>
                    {c.background && <span>{c.background}</span>}
                  </div>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${c.name}? This cannot be undone.`)) {
                      deleteCharacter(c.id)
                    }
                  }}
                  className="px-4 py-4 text-stone-700 hover:text-red-500 transition-colors text-lg"
                  title="Delete character"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
