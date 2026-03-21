import { useState } from 'react'
import type { ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CardPickerItem {
  id: string
  name: string
  description: string
}

interface CardPickerProps<T extends CardPickerItem> {
  items: T[]
  selectedId: string | null
  onSelect: (id: string) => void
  renderCard: (item: T, isSelected: boolean) => ReactNode
  renderDetail: (item: T) => ReactNode
  searchPlaceholder?: string
  groupBy?: (item: T) => string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CardPicker<T extends CardPickerItem>({
  items,
  selectedId,
  onSelect,
  renderCard,
  renderDetail,
  searchPlaceholder = 'Search…',
  groupBy,
}: CardPickerProps<T>) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : items

  // Build groups preserving insertion order
  const groups: { label: string; items: T[] }[] = []
  if (groupBy) {
    const map = new Map<string, T[]>()
    for (const item of filtered) {
      const label = groupBy(item)
      if (!map.has(label)) map.set(label, [])
      map.get(label)!.push(item)
    }
    for (const [label, groupItems] of map) {
      groups.push({ label, items: groupItems })
    }
  } else {
    groups.push({ label: '', items: filtered })
  }

  return (
    <div className="card-picker">
      {/* Search bar */}
      <div className="card-picker__search-wrap">
        <span className="card-picker__search-icon">⌕</span>
        <input
          type="text"
          className="card-picker__search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search"
        />
        {query && (
          <button
            className="card-picker__search-clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="card-picker__empty">No results for "{query}"</p>
      )}

      {/* Groups */}
      {groups.map(group => {
        const selectedInGroup = group.items.find(i => i.id === selectedId)
        return (
          <section key={group.label || '__default'} className="card-picker__group">
            {group.label && (
              <h3 className="card-picker__group-label">{group.label}</h3>
            )}

            {/* Card grid */}
            <div className="card-picker__grid">
              {group.items.map(item => {
                const isSelected = item.id === selectedId
                return (
                  <div
                    key={item.id}
                    className={[
                      'card-picker__card-wrap',
                      isSelected ? 'card-picker__card-wrap--selected' : '',
                    ].join(' ')}
                    onClick={() => onSelect(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && onSelect(item.id)}
                    aria-pressed={isSelected}
                  >
                    {renderCard(item, isSelected)}
                  </div>
                )
              })}
            </div>

            {/* Detail panel — slides in below the group grid when something is selected */}
            {selectedInGroup && (
              <div className="card-picker__detail" key={selectedInGroup.id}>
                {renderDetail(selectedInGroup)}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
