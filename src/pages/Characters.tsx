import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

interface ImportPreview {
  name: string
  level: number
  race: string
  class: string
  data: Record<string, unknown>
}

export default function Characters() {
  const navigate = useNavigate()
  const { characters, setActiveCharacter, deleteCharacter, loadCharacters, importCharacter } = useCharacterStore()
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadCharacters() }, [loadCharacters])

  const open = (id: string) => {
    setActiveCharacter(id)
    navigate('/sheet')
  }

  const handleDelete = () => {
    if (deleteTarget) {
      deleteCharacter(deleteTarget)
      setDeleteTarget(null)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so same file can be re-selected
    e.target.value = ''

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string)

        if (!raw || typeof raw !== 'object') {
          setImportError("This file doesn't appear to be a valid character export.")
          return
        }
        if (raw.app !== 'warhammer-chronicles') {
          setImportError('This file was exported from a different app.')
          return
        }
        if (!raw.character || typeof raw.character !== 'object' || !raw.character.name) {
          setImportError('This character file is incomplete or corrupted.')
          return
        }

        const c = raw.character
        setImportPreview({
          name: c.name ?? 'Unknown',
          level: c.level ?? 1,
          race: c.race ?? '',
          class: c.class ?? '',
          data: c,
        })
      } catch {
        setImportError("This file doesn't appear to be a valid character export.")
      }
    }
    reader.readAsText(file)
  }

  const handleImportConfirm = () => {
    if (!importPreview) return
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = importPreview.data as Record<string, unknown>
    importCharacter(rest as Parameters<typeof importCharacter>[0])
    setImportPreview(null)
    navigate('/sheet')
  }

  const targetChar = deleteTarget ? characters.find(c => c.id === deleteTarget) : null

  return (
    <div className="min-h-screen bg-[#131519] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-slate-300 text-xs tracking-widest transition-colors"
          >
            ← HOME
          </button>
          <div className="h-px flex-1 bg-slate-800/60" />
          <h1 className="text-sm font-semibold text-slate-200 tracking-[0.2em] uppercase">
            Characters
          </h1>
          <div className="h-px flex-1 bg-slate-800/60" />
          <button
            onClick={() => navigate('/create')}
            className="text-[10px] px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300/80 hover:text-amber-200 rounded border border-amber-500/20 hover:border-amber-500/35 tracking-widest transition-all"
          >
            + NEW
          </button>
        </div>

        {/* Character list */}
        {characters.length === 0 ? (
          <div className="border border-dashed border-slate-700/40 rounded-lg py-16 text-center">
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
              <div
                key={c.id}
                className="group flex items-center border border-slate-700/25 rounded-lg bg-slate-800/20 hover:bg-slate-700/25 hover:border-slate-600/40 transition-all"
              >
                <button
                  className="flex items-center gap-4 flex-1 text-left px-4 py-3"
                  onClick={() => open(c.id)}
                >
                  {/* Portrait or placeholder */}
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/30 flex items-center justify-center shrink-0 overflow-hidden">
                    {c.portrait ? (
                      <img src={c.portrait} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-600 text-[10px] font-bold">
                        {c.name.slice(0, 2).toUpperCase()}
                      </span>
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
                      {c.race && (
                        <span className="text-[10px] text-slate-600 shrink-0">
                          {c.race}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-0.5 text-[11px] text-slate-500">
                      <span>Lvl {c.level}</span>
                      <span>{c.currentHitPoints}/{c.maxHitPoints} Wounds</span>
                      {c.background && <span className="text-slate-600">{c.background}</span>}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-slate-700 group-hover:text-amber-500/50 transition-colors text-xs">
                    →
                  </span>
                </button>

                {/* Delete button */}
                <button
                  onClick={() => setDeleteTarget(c.id)}
                  className="px-4 py-4 text-slate-700 hover:text-red-400 transition-colors text-sm"
                  title="Delete character"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Character</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {targetChar?.name ?? 'this character'}? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
