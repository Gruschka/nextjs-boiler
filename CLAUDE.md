# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# nextjs-boiler

Opinionated Next.js 16 boilerplate. Use it as a starting point — not a library.

## Project overview

<!-- TODO: replace this section when you clone the boilerplate -->
<!-- Describe what the app does, its default locale, and any domain-specific conventions Claude should know. -->
<!-- Example: "E-commerce platform for artisan goods. Default locale: es. Currency formatting uses Intl.NumberFormat." -->

## Project structure

```
src/
  proxy.ts              # next-intl middleware (Next.js 16: named proxy(), not middleware())
  app/
    layout.tsx          # Root layout — font, ThemeProvider, base HTML shell
    [locale]/           # All routes live here; locale injected by next-intl
      layout.tsx        # Locale layout — NextIntlClientProvider, SetHtmlLang
      page.tsx          # Home page
    globals.css         # Design tokens (CSS custom properties) + Tailwind @theme aliases
  components/
    ui/                 # Design system primitives — each in its own folder with index.tsx
    layout/             # Structural components (ThemeToggle, ThemeProvider, SetHtmlLang)
    [domain]/           # Feature components grouped by domain — add as the app grows
  i18n/
    routing.ts          # Locale list and default locale
    request.ts          # Per-request locale resolution for Server Components
    navigation.ts       # Locale-aware Link, useRouter, usePathname wrappers
  lib/
    utils.ts            # cn() helper (clsx + tailwind-merge)
messages/               # Translation files — one JSON per locale (es.json, en.json)
```

New files go in `[domain]/` under `components/` unless they are primitives (`ui/`) or structural (`layout/`). API route handlers go in `src/app/api/`.

## Commands

```bash
npm run dev                              # development server
npm run build                            # production build (fails on type errors)
npm run typecheck                        # tsc --noEmit
npm run lint                             # ESLint
npm run test                             # Vitest (single run)
npm run test:watch                       # Vitest watch mode
npx vitest run src/lib/utils.test.ts     # run a single test file
npm run check                            # typecheck + lint + prettier (full validation)
npm run fix                              # eslint --fix + prettier --write
```

## Commit convention

Conventional Commits enforced by Husky + commitlint. Scope is **mandatory**.

```
feat(auth): add JWT session middleware
fix(ui): correct button focus ring on Safariah
```

- Never add `Co-Authored-By` lines
- Pre-commit hook runs `tsc --noEmit` — fix type errors before committing

For stack details, async params gotcha, TypeScript flags, and folder structure, see docs/claude/stack.md

## Theming

Design tokens live in `src/app/globals.css` as CSS custom properties (`--fg-1`, `--bg-surface`, `--primary`, etc.). Dark mode swaps via `[data-theme='dark']` on the root element — managed by next-themes.

Use Tailwind semantic aliases defined in the `@theme inline` block:

```tsx
// Correct
<p className="text-fg">...</p>
<div className="bg-surface border-border">...</div>

// Wrong — breaks dark mode
<p className="text-slate-900">...</p>
<p style={{ color: '#0F172A' }}>...</p>
```

Available aliases: `text-fg`, `text-fg-2`, `text-fg-3`, `text-accent`, `bg-page`, `bg-surface`, `border-border`.

## Next.js conventions

- **Default to Server Components.** Add `'use client'` only when the component needs hooks, event handlers, or browser APIs.
- **`page.tsx` files are always Server Components.** Fetch data directly with `async/await` — no `useEffect` for data fetching.
- **Interactive UI goes in separate Client Components** imported by the Server Component page, not mixed into `page.tsx`.
- **Server Actions** for form submissions and mutations — place them in `src/app/[locale]/{feature}/actions.ts`.
- **`loading.tsx` and `error.tsx`** in route segments handle loading/error states — don't build per-page spinners.
- **Images**: always `next/image`. Never raw `<img>`.
- **Internal navigation**: always `Link` from `@/i18n/navigation` (locale-aware wrapper). Never `next/link` directly, never `<a>` or `window.location` for internal routes.
- **Metadata**: use `generateMetadata` or a static `metadata` export. Never `<Head>`.
- **Route groups** `(auth)/` and `(public)/` to share layouts — don't nest layouts deeper than 2 levels.

## Error handling

- Route-level errors: `error.tsx` at the route segment boundary. Route-level loading: `loading.tsx`. Component-level loading: `<Suspense>`.
- Server Actions return a discriminated union — never throw:
  ```ts
  { success: true; data: T } | { success: false; error: string }
  ```
- API route errors use a typed shape: `{ status: number; message: string; code: string }`.
- All `async` operations in Client Components have `try/catch` with a typed error variable — never `catch (e: any)`.

## Before closing a task

Run `npm run test` after any logic change. Run `npm run check` before declaring a task done.

## Scaling this file

If this file exceeds 180 lines, move domain-specific rules to `.claude/rules/<topic>.md` with YAML frontmatter path globs — rules there load only when Claude touches matching files.

## Hard rules

- No `any` — ESLint enforces this as an error
- Class merging: always use `cn()` from `@/lib/utils`, never concatenate Tailwind strings manually
- React Compiler is enabled — do not add `useMemo` or `useCallback`
- All user-visible strings go through `useTranslations` — hard-coded UI text is a bug
