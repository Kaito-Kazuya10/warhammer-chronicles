import { useState } from 'react'
import type { Character } from '@/types/character'
import PlayerCard from './PlayerCard'
import PlayerCardExpanded from './PlayerCardExpanded'

interface PartyStripProps {
  characters: Character[]
  campaignId: string
}

export default function PartyStrip({ characters, campaignId }: PartyStripProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const expandedChar = expandedId ? characters.find(c => c.id === expandedId) ?? null : null

  if (characters.length === 0) return null

  return (
    <>
      <div className="mb-6">
        <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
          Party ({characters.length})
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {characters.map(ch => (
            <PlayerCard
              key={ch.id}
              character={ch}
              onClick={() => setExpandedId(prev => prev === ch.id ? null : ch.id)}
            />
          ))}
        </div>
      </div>

      {expandedChar && (
        <PlayerCardExpanded
          character={expandedChar}
          campaignId={campaignId}
          onClose={() => setExpandedId(null)}
        />
      )}
    </>
  )
}
