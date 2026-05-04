import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { SetHtmlLang } from '@/components/layout/SetHtmlLang'
import { routing } from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js 16 · TypeScript · Tailwind · next-intl · Prisma',
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      {children}
    </NextIntlClientProvider>
  )
}
