import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import CharacterSheet from '../components/CharacterSheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDiceStore } from '../store/diceStore'
import { useAuth } from '@/auth/useAuth'

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
      {/* Top nav bar */}
      <nav
        className="sticky top-0 z-20 flex items-center gap-2 px-4 py-1.5 border-b sheet-nav"
        style={{ backgroundColor: 'var(--wh-nav-bg)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* HOME */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white hover:bg-white/10 text-xs tracking-widest shrink-0"
        >
          ← HOME
        </Button>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        {/* Character tabs */}
        <div className="flex gap-0.5 flex-1 overflow-x-auto sheet-nav__tabs">
          {characters.map(c => {
            const isActive = c.id === activeCharacterId
            return (
              <div key={c.id} className="relative shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCharacter(c.id)}
                  className={`text-xs px-3 rounded-none hover:bg-white/10 transition-colors ${
                    isActive
                      ? 'text-[var(--wh-gold)] font-semibold hover:text-[var(--wh-gold)]'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  {c.name}
                </Button>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--wh-gold)' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* GM mode indicator */}
        {isDm && (
          <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-destructive/20 text-destructive border border-destructive/30">
            GM
          </span>
        )}

        {/* Dice roller toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHistory}
          className="text-white/60 hover:text-white hover:bg-white/10 shrink-0 relative"
          aria-label="Open roll history"
        >
          <span className="text-base leading-none">🎲</span>
          {history.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[9px] bg-primary text-primary-foreground">
              {history.length > 99 ? '99+' : history.length}
            </Badge>
          )}
        </Button>

        {/* Export character button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="border-white/25 text-white/45 hover:text-white hover:border-white/50 bg-transparent hover:bg-white/10 text-xs shrink-0"
        >
          EXPORT
        </Button>

        {/* Duplicate character button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDuplicate}
          className="border-white/25 text-white/45 hover:text-white hover:border-white/50 bg-transparent hover:bg-white/10 text-xs shrink-0"
        >
          DUPLICATE
        </Button>

        {/* Edit character button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/create?edit=${activeCharacterId}`)}
          className="border-white/25 text-white/45 hover:text-white hover:border-white/50 bg-transparent hover:bg-white/10 text-xs shrink-0"
        >
          EDIT
        </Button>

        {/* New character button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNew}
          className="border-dashed border-white/25 text-white/45 hover:text-white hover:border-white/50 bg-transparent hover:bg-white/10 text-xs shrink-0"
        >
          + New
        </Button>
      </nav>

      <CharacterSheet characterId={activeCharacterId} />
    </div>
  )
}
