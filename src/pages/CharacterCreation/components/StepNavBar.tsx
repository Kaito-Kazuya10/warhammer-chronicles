import { useCreation } from '../CreationContext'

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Species' },
  { label: 'Class' },
  { label: 'Background' },
  { label: 'Abilities' },
  { label: 'Skills' },
  { label: 'Equipment' },
  { label: 'Review' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function StepNavBar() {
  const { currentStep, furthestStep, setCurrentStep } = useCreation()

  return (
    <nav className="step-nav" aria-label="Creation steps">
      <div className="step-nav__inner">
        {STEPS.map((step, i) => {
          const isActive = i === currentStep
          const isLocked = i > furthestStep
          const classes = [
            'step-nav__item',
            isActive  ? 'step-nav__item--active' : '',
            isLocked  ? 'step-nav__item--locked'  : '',
          ].filter(Boolean).join(' ')

          return (
            <button
              key={step.label}
              className={classes}
              onClick={() => !isLocked && setCurrentStep(i)}
              disabled={isLocked}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="step-nav__num">{i + 1}</span>
              {step.label.toUpperCase()}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
