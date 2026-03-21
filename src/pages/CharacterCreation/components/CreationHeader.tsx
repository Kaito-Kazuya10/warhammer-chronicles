import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreation } from '../CreationContext'

const MAX_PORTRAIT_BYTES = 2 * 1024 * 1024 // 2 MB
const TOTAL_STEPS = 7

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreationHeader() {
  const navigate = useNavigate()
  const {
    draft, updateDraft,
    currentStep, setCurrentStep, furthestStep,
    canAdvanceFrom,
    nameError, setNameError,
  } = useCreation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Portrait upload ──────────────────────────────────────────────────────────
  const handlePortraitClick = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_PORTRAIT_BYTES) {
      alert('Portrait image must be 2 MB or smaller.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft({ portrait: reader.result })
      }
    }
    reader.readAsDataURL(file)
    // Reset so the same file can be re-selected if needed
    e.target.value = ''
  }

  // ── Nav ──────────────────────────────────────────────────────────────────────
  const isStepValid = canAdvanceFrom(currentStep)
  const canGoBack = currentStep > 0
  const canGoNext = currentStep < TOTAL_STEPS - 1 && isStepValid
  const isLastStep = currentStep === TOTAL_STEPS - 1

  const goBack = () => {
    if (canGoBack) setCurrentStep(currentStep - 1)
    else navigate('/')
  }

  const goNext = () => {
    if (canGoNext) setCurrentStep(currentStep + 1)
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <header className="creation-header">
      {/* Hidden file input — Escape key will close the OS dialog naturally */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Portrait slot */}
      <div
        className="portrait-slot"
        onClick={handlePortraitClick}
        title="Upload portrait"
        role="button"
        aria-label="Upload character portrait"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handlePortraitClick()}
      >
        {draft.portrait ? (
          <>
            <img src={draft.portrait} alt="Character portrait" className="portrait-slot__img" />
            <div className="portrait-slot__overlay">
              <span className="portrait-slot__plus">↑</span>
              <span className="portrait-slot__overlay-label">Change</span>
            </div>
          </>
        ) : (
          <>
            <span className="portrait-slot__plus">+</span>
            <span className="portrait-slot__label">Portrait</span>
          </>
        )}
      </div>

      {/* Name input */}
      <div className="creation-header__name-wrap">
        <input
          type="text"
          className={`creation-header__name${nameError ? ' creation-header__name--error' : ''}`}
          placeholder="Enter character name…"
          value={draft.name}
          onChange={e => {
            updateDraft({ name: e.target.value })
            // Clear the error once the user starts typing a name
            if (e.target.value.trim()) setNameError(false)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              goNext()
            }
          }}
          maxLength={60}
          aria-label="Character name"
        />
        <p className="creation-header__name-hint">
          Step {currentStep + 1} of {TOTAL_STEPS}
          {furthestStep < TOTAL_STEPS - 1
            ? ' — Complete each step to forge your character.'
            : ' — All steps reached — review and forge.'}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="creation-header__nav">
        {canGoBack && (
          <button className="creation-nav-btn creation-nav-btn--back" onClick={goBack}>
            ← Back
          </button>
        )}

        {/* Always render Next on non-final steps; visually disabled when step is incomplete */}
        {!isLastStep && (
          <button
            className={`creation-nav-btn creation-nav-btn--next${!canGoNext ? ' creation-nav-btn--disabled' : ''}`}
            onClick={goNext}
            disabled={!canGoNext}
            aria-disabled={!canGoNext}
          >
            Next →
          </button>
        )}
      </div>
    </header>
  )
}
