'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS: Record<string, string> = { es: 'ES', en: 'EN' }

export function LocaleSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchTo(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {i > 0 && (
            <span style={{ fontSize: 10, color: 'var(--border-1)' }}>·</span>
          )}
          <button
            onClick={() => switchTo(loc)}
            style={{
              background: 'none',
              border: 'none',
              cursor: loc === locale ? 'default' : 'pointer',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: loc === locale ? 'var(--fg-accent)' : 'var(--fg-2)',
              padding: '2px 4px',
              transition: 'color 140ms ease',
            }}
            aria-current={loc === locale ? 'true' : undefined}
          >
            {LABELS[loc] ?? loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
