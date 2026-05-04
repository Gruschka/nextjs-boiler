# Stack

## Core

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSR + Route Handlers for REST |
| Language | TypeScript 5 (strict) | `allowJs: false`, build fails on errors |
| Styling | Tailwind CSS 4 | Utility-first |
| i18n | next-intl | Locales: `es` (default), `en` |
| Testing | Vitest + jsdom | Unit and component tests |

## Next.js 16 — breaking changes to remember

**Params are async** — always `await` them:

```ts
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
}
```

**Middleware renamed**: `middleware.ts` → `proxy.ts`, export `proxy()` not `middleware()`.

## TypeScript — strict flags active

Beyond `strict: true`, these are also on:

- `exactOptionalPropertyTypes` — `{ x?: string }` does not accept `{ x: undefined }`
- `noUncheckedIndexedAccess` — array/object index access returns `T | undefined`
- `noUnusedLocals` / `noUnusedParameters` — unused variables are errors
- `noImplicitOverride` — subclass overrides must use the `override` keyword

## React Compiler

Enabled via `babel-plugin-react-compiler`. The compiler inserts memoization automatically — do not add `useMemo` or `useCallback`. Manual memoization on top of the compiler is redundant and can interfere.

## i18n

- Messages live in `messages/<locale>.json`
- Routing config: `src/i18n/routing.ts`
- Request locale resolution: `src/i18n/request.ts`
- Navigation helpers (locale-aware `Link`, `useRouter`): `src/i18n/navigation.ts`

All user-visible strings go through `useTranslations`. Hard-coded UI text is a bug.

## Folder structure

```
src/
  app/
    [locale]/        ← locale-scoped pages
  components/
    ui/              ← design system primitives (each in its own folder)
    layout/          ← structural components (Header, Footer, etc.)
    [domain]/        ← feature components grouped by domain
  i18n/              ← next-intl config and helpers
  lib/               ← shared utilities (utils.ts, db.ts, etc.)
```
