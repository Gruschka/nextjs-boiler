---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
---

# Next.js conventions

- **Default to Server Components.** Add `'use client'` only when the component needs hooks, event handlers, or browser APIs.
- **`page.tsx` files are always Server Components.** Fetch data directly with `async/await` — no `useEffect` for data fetching.
- **Interactive UI goes in separate Client Components** imported by the Server Component page, not mixed into `page.tsx`.
- **Server Actions** for form submissions and mutations — place them in `src/app/[locale]/{feature}/actions.ts`.
- **`loading.tsx` and `error.tsx`** in route segments handle loading/error states — don't build per-page spinners.
- **Images**: always `next/image`. Never raw `<img>`.
- **Internal navigation**: always `Link` from `@/i18n/navigation` (locale-aware wrapper). Never `next/link` directly, never `<a>` or `window.location` for internal routes.
- **Metadata**: use `generateMetadata` or a static `metadata` export. Never `<Head>`.
- **Route groups** `(auth)/` and `(public)/` to share layouts — don't nest layouts deeper than 2 levels.
