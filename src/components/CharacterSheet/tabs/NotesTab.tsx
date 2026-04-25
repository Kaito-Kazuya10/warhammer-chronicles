import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useCharacterStore } from '../../../store/characterStore'

interface Props {
  characterId: string
}

export default function NotesTab({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const [local, setLocal] = useState(character?.notes ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync local state when character changes from outside (e.g. different character loaded)
  useEffect(() => {
    setLocal(character?.notes ?? '')
  }, [characterId, character?.notes])

  function handleChange(value: string) {
    setLocal(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      updateCharacter(characterId, { notes: value })
    }, 500)
  }

  // Flush on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!character) return null

  return (
    <Textarea
      value={local}
      onChange={e => handleChange(e.target.value)}
      placeholder="Write your notes here..."
      className="min-h-[400px] resize-y text-base"
    />
  )
}
