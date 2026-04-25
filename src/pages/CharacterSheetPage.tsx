import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import CharacterSheet from '../components/CharacterSheet'
import { Badge } from '@/components/ui/badge'
import { useDiceStore } from '../store/diceStore'
import { useAuth } from '@/auth/useAuth'
import { Download, Copy, Pencil, Plus, Dice6, ChevronLeft, Moon, Sun } from 'lucide-react'
import { useSettingsStore } from '../store/settingsStore'

function exportCharacter(character: ReturnType<typeof useCharacterStore.getState>['characters'][number]) {
  const exportData = {
    version: '1.0',
    app: 'warhammer-chronicles',
    exportedAt: new Date().toISOString(),
    character,
  }
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${character.name.replace(/\s+/g, '_')}_export.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function CharacterSheetPage() {
  const navigate = useNavigate()
  const { characters, activeCharacterId, setActiveCharacter, createCharacter, duplicateCharacter } = useCharacterStore()
  const { history, toggleHistory } = useDiceStore()
  const { darkMode, toggleDarkMode } = useSettingsStore()
  const { profile } = useAuth()
  const isDm = profile?.role === 'dm'

  if (!activeCharacterId) {
    navigate('/characters')
    return null
  }

  const activeChar = characters.find(c => c.id === activeCharacterId)

  const handleNew = () => {
    createCharacter()
    navigate('/create')
  }

  const handleExport = () => {
    if (activeChar) exportCharacter(activeChar)
  }

  const handleDuplicate = () => {
    const newId = duplicateCharacter(activeCharacterId)
    if (newId) navigate('/sheet')
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Top nav bar ─────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-20 flex items-center gap-0 border-b"
        style={{
          backgroundColor: '#0f1115',
          borderColor: 'rgba(255,255,255,0.07)',
          minHeight: '48px',
        }}
      >
        {/* HOME button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-4 h-12 text-zinc-400 hover:text-amber-300 hover:bg-white/5 transition-colors shrink-0 border-r border-white/[0.07]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Home</span>
        </button>

        {/* Character tabs */}
        <div className="flex items-stretch flex-1 overflow-x-auto min-w-0">
          {characters.map(c => {
            const isActive = c.id === activeCharacterId
            return (
              <button
                key={c.id}
                onClick={() => setActiveCharacter(c.id)}
                className={`relative flex flex-col justify-center px-4 h-12 shrink-0 border-r border-white/[0.07] transition-colors ${
                  isActive
                    ? 'bg-white/[0.04]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <span className={`text-[13px] font-semibold leading-tight tracking-wide transition-colors ${
                  isActive ? 'text-amber-200' : 'text-zinc-400 hover:text-zinc-200'
                }`}>
                  {c.name}
                </span>
                <span className="text-[10px] text-zinc-600 leading-tight tracking-wider uppercase mt-0.5">
                  Lvl {c.level} · {c.class}
                </span>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: 'var(--wh-gold)' }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Right side — actions */}
        <div className="flex items-center shrink-0 border-l border-white/[0.07]">

          {/* GM badge */}
          {isDm && (
            <div className="px-3 h-12 flex items-center border-r border-white/[0.07]">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-red-900/40 text-red-400 border border-red-700/40">
                GM
              </span>
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex items-center gap-1.5 px-3 h-12 text-zinc-400 hover:text-amber-300 hover:bg-white/5 transition-colors border-r border-white/[0.07]"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Dice roller toggle */}
          <button
            onClick={toggleHistory}
            aria-label="Open roll history"
            className="relative flex items-center gap-1.5 px-3 h-12 text-zinc-400 hover:text-amber-300 hover:bg-white/5 transition-colors border-r border-white/[0.07]"
          >
            <Dice6 className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline">Dice</span>
            {history.length > 0 && (
              <Badge className="h-4 min-w-4 px-1 text-[9px] bg-amber-600/80 text-amber-100 border-0">
                {history.length > 99 ? '99+' : history.length}
              </Badge>
            )}
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            title="Export character"
            className="flex items-center gap-1.5 px-3 h-12 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors border-r border-white/[0.07]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline">Export</span>
          </button>

          {/* Duplicate */}
          <button
            onClick={handleDuplicate}
            title="Duplicate character"
            className="flex items-center gap-1.5 px-3 h-12 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors border-r border-white/[0.07]"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline">Duplicate</span>
          </button>

          {/* Edit */}
          <button
            onClick={() => navigate(`/create?edit=${activeCharacterId}`)}
            title="Edit character"
            className="flex items-center gap-1.5 px-3 h-12 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors border-r border-white/[0.07]"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline">Edit</span>
          </button>

          {/* New character */}
          <button
            onClick={handleNew}
            title="New character"
            className="flex items-center gap-1.5 px-3 h-12 text-amber-500/70 hover:text-amber-300 hover:bg-amber-500/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline">New</span>
          </button>
        </div>
      </nav>

      <CharacterSheet characterId={activeCharacterId} />
    </div>
  )
}
