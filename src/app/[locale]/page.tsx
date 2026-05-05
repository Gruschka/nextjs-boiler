import { useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { SidebarToggle } from '@/components/layout/SidebarToggle'
import { LocaleSelector } from '@/components/ui/LocaleSelector'

export default function Home() {
  const t = useTranslations('home')
  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--sp-sm)',
          padding: 'var(--sp-md) var(--sp-lg)',
          borderBottom: '1px solid var(--border-1)',
        }}
      >
        <SidebarToggle />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
          <LocaleSelector />
          <ThemeToggle />
        </div>
      </header>
      <main style={{ padding: 'var(--sp-xl)', maxWidth: 600 }}>
        <h1 style={{ color: 'var(--fg-1)', marginBottom: 'var(--sp-sm)', fontSize: 28 }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--fg-2)', marginBottom: 'var(--sp-xs)', fontSize: 14 }}>
          {t('subtitle')}
        </p>
        <p style={{ color: 'var(--fg-3)', fontSize: 14 }}>{t('description')}</p>
      </main>
    </>
  )
}
