import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import './creation.css'
import { CreationProvider, useCreation } from './CreationContext'
import { useCharacterStore } from '../../store/characterStore'
import StepNavBar from './components/StepNavBar'
import CreationHeader from './components/CreationHeader'
import SpeciesStep from './steps/SpeciesStep'
import ClassStep from './steps/ClassStep'
import BackgroundStep from './steps/BackgroundStep'
import AbilitiesStep from './steps/AbilitiesStep'
import SkillsStep from './steps/SkillsStep'
import EquipmentStep from './steps/EquipmentStep'
import ReviewStep from './steps/ReviewStep'

// ─── Step labels (mirrors StepNavBar) ────────────────────────────────────────

const STEP_NAMES = [
  'Species',
  'Class',
  'Background',
  'Abilities',
  'Skills',
  'Equipment',
  'Review',
]

// ─── Placeholder for steps not yet built ─────────────────────────────────────

function StepPlaceholder({ step }: { step: number }) {
  return (
    <div className="step-placeholder">
      <p className="step-placeholder__label">Step {step + 1}</p>
      <h2 className="step-placeholder__title">{STEP_NAMES[step]}</h2>
      <span className="step-placeholder__soon">Coming soon</span>
    </div>
  )
}

// ─── Wizard body — routes to the correct step, with slide transition ──────────

function WizardBody() {
  const { currentStep } = useCreation()

  // Track navigation direction so the correct slide animation fires on mount.
  // Using refs avoids triggering a re-render; the direction is computed
  // synchronously during render so it's ready before the new key mounts.
  const prevStepRef = useRef(currentStep)
  const directionRef = useRef<'right' | 'left'>('right')

  if (currentStep !== prevStepRef.current) {
    directionRef.current = currentStep > prevStepRef.current ? 'right' : 'left'
    prevStepRef.current = currentStep
  }

  let content: React.ReactNode
  switch (currentStep) {
    case 0: content = <SpeciesStep />; break
    case 1: content = <ClassStep />; break
    case 2: content = <BackgroundStep />; break
    case 3: content = <AbilitiesStep />; break
    case 4: content = <SkillsStep />; break
    case 5: content = <EquipmentStep />; break
    case 6: content = <ReviewStep />; break
    default: content = <StepPlaceholder step={currentStep} />
  }

  const animClass = directionRef.current === 'right' ? 'step-enter-right' : 'step-enter-left'

  return (
    // key={currentStep} causes React to unmount/remount on every step change,
    // which re-triggers the CSS keyframe animation from the beginning.
    <div key={currentStep} className={`step-content ${animClass}`}>
      {content}
    </div>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function CharacterCreation() {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const characters = useCharacterStore(s => s.characters)
  const editCharacter = editId ? characters.find(c => c.id === editId) ?? null : null

  return (
    <CreationProvider editCharacter={editCharacter}>
      <div className="creation-page">
        <StepNavBar />
        <CreationHeader />
        <main className="creation-content">
          <WizardBody />
        </main>
      </div>
    </CreationProvider>
  )
}
