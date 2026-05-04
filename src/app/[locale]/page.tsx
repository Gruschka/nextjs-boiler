import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')
  return (
    <main style={{ padding: 'var(--sp-xl)', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ color: 'var(--fg-1)', marginBottom: 'var(--sp-sm)' }}>{t('title')}</h1>
      <p style={{ color: 'var(--fg-2)', marginBottom: 'var(--sp-xs)' }}>{t('subtitle')}</p>
      <p style={{ color: 'var(--fg-3)' }}>{t('description')}</p>
    </main>
  )
}
