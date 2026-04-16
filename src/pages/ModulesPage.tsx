import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loadModuleFromFile,
  unregisterModule,
  getLoadedModules,
} from '../modules/registry'
import type { WarhamerModule } from '../types/module'

const CORE_ID = 'warhammer-core'

export default function ModulesPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [modules, setModules] = useState<WarhamerModule[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const refresh = useCallback(() => {
    setModules(getLoadedModules())
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      setUploadError('Only .json files are supported.')
      return
    }
    setUploading(true)
    setUploadError(null)
    setUploadSuccess(null)
    try {
      const mod = await loadModuleFromFile(file)
      setUploadSuccess(`Loaded "${mod.name}" v${mod.version}`)
      refresh()
      setTimeout(() => setUploadSuccess(null), 3000)
    } catch (err) {
      setUploadError((err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleUnload = (id: string) => {
    unregisterModule(id)
    refresh()
  }

  return (
    <div className="min-h-screen bg-[#131519] p-6">
      <div className="max-w-2xl mx-auto">

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
            Modules
          </h1>
          <div className="h-px flex-1 bg-slate-800/60" />
        </div>

        {/* Upload zone */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
            Load Module
          </p>

          <div
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg py-10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all
              ${dragging
                ? 'border-amber-500/50 bg-amber-500/5'
                : 'border-slate-700/40 hover:border-slate-600/50 bg-slate-800/10 hover:bg-slate-800/20'
              }
            `}
          >
            <span className="text-2xl select-none">📦</span>
            <p className="text-sm text-slate-400">
              {uploading ? 'Loading...' : 'Drop a module .json here, or click to browse'}
            </p>
            <p className="text-[10px] text-slate-600 tracking-wide">JSON modules only</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleInputChange}
          />

          {uploadError && (
            <div className="mt-3 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {uploadError}
            </div>
          )}
          {uploadSuccess && (
            <div className="mt-3 px-3 py-2 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
              ✓ {uploadSuccess}
            </div>
          )}
        </div>

        {/* Loaded modules list */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
            Loaded Modules ({modules.length})
          </p>

          {modules.length === 0 ? (
            <div className="border border-dashed border-slate-700/40 rounded-lg py-10 text-center">
              <p className="text-sm text-slate-500">No modules loaded</p>
            </div>
          ) : (
            <div className="grid gap-2">
              {modules.map(mod => {
                const isCore = mod.id === CORE_ID
                return (
                  <div
                    key={mod.id}
                    className="border border-slate-700/25 rounded-lg bg-slate-800/20 px-4 py-3 flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-slate-100">{mod.name}</span>
                        <span className="text-[9px] font-mono text-slate-500 border border-slate-700/40 rounded px-1 py-0.5">
                          v{mod.version}
                        </span>
                        {isCore && (
                          <span className="text-[9px] text-amber-500/70 border border-amber-500/20 rounded px-1 py-0.5 uppercase tracking-wider">
                            🔒 core
                          </span>
                        )}
                        {mod.author && (
                          <span className="text-[10px] text-slate-500">by {mod.author}</span>
                        )}
                      </div>
                      {mod.description && (
                        <p className="text-xs text-slate-500 mt-0.5 truncate">{mod.description}</p>
                      )}
                      <p className="text-[10px] font-mono text-slate-600 mt-0.5">{mod.id}</p>
                    </div>

                    <button
                      onClick={() => !isCore && handleUnload(mod.id)}
                      disabled={isCore}
                      title={isCore ? 'Core module cannot be unloaded' : `Unload ${mod.name}`}
                      className={`
                        mt-0.5 text-[9px] px-2 py-1 rounded border transition-colors flex-shrink-0
                        ${isCore
                          ? 'border-slate-700/20 text-slate-700 cursor-not-allowed'
                          : 'border-red-500/20 text-red-500/60 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 cursor-pointer'
                        }
                      `}
                    >
                      {isCore ? 'LOCKED' : 'UNLOAD'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
