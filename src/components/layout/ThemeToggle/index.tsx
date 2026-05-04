'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('common')

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('theme_light') : t('theme_dark')}
      style={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        width: 32,
        height: 32,
        overflow: 'hidden',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--fg-2)',
        borderRadius: 'var(--r-md)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          display: 'flex',
          transition: 'transform 500ms ease-out, opacity 500ms ease-out',
          transform: !isDark ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(-45deg)',
          opacity: !isDark ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <MoonIcon />
      </span>
      <span
        style={{
          position: 'absolute',
          display: 'flex',
          transition: 'transform 500ms ease-out, opacity 500ms ease-out',
          transform: isDark ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(45deg)',
          opacity: isDark ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <SunIcon />
      </span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="3" />
      <line x1="8" y1="1" x2="8" y2="2.5" />
      <line x1="8" y1="13.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="2.5" y2="8" />
      <line x1="13.5" y1="8" x2="15" y2="8" />
      <line x1="3.05" y1="3.05" x2="4.11" y2="4.11" />
      <line x1="11.89" y1="11.89" x2="12.95" y2="12.95" />
      <line x1="12.95" y1="3.05" x2="11.89" y2="4.11" />
      <line x1="4.11" y1="11.89" x2="3.05" y2="12.95" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      <path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5Z" />
    </svg>
  )
}
