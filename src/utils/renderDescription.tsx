import React from 'react'

const TAG_STYLE: Record<string, string> = {
  'CORE':       'bg-[var(--wh-gold)]/15 text-[var(--wh-gold)]',
  'CHOOSE ONE': 'bg-blue-500/10 text-blue-600',
}

/**
 * Renders a feature description with markdown-like formatting:
 * - `\n\n` → paragraph breaks
 * - `**text**` → bold
 * - `[CORE]` / `[CHOOSE ONE]` → coloured inline badges
 *
 * If `chosenOption` is provided (e.g. a Fighting Style name) and the
 * description starts with `[CHOOSE ONE]`, only the matching option
 * paragraph is shown alongside the preamble.
 */
export function renderDescription(text: string, chosenOption?: string): React.ReactNode {
  const tagPattern = /^\[([^\]]+)\]\s*/
  let paragraphs = text.split('\n\n')

  if (chosenOption && paragraphs[0]?.match(/^\[CHOOSE ONE\]/)) {
    const preamble = paragraphs[0].replace(tagPattern, '')
    const chosen   = paragraphs.find(
      p => p.startsWith(`**${chosenOption}.`) || p.startsWith(`**${chosenOption} `)
    )
    paragraphs = chosen ? [preamble, chosen] : paragraphs.slice(1)
  }

  return (
    <div className="space-y-1.5">
      {paragraphs.map((para, i) => {
        const tagMatch = para.match(tagPattern)
        const tag      = tagMatch?.[1]
        const cleaned  = para.replace(tagPattern, '')
        const parts    = cleaned.split(/(\*\*[^*]+\*\*)/)

        return (
          <p key={i} className="leading-relaxed">
            {tag && (
              <span className={`inline-block text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded mr-1.5 ${TAG_STYLE[tag] ?? 'bg-muted text-muted-foreground'}`}>
                {tag}
              </span>
            )}
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
          </p>
        )
      })}
    </div>
  )
}
