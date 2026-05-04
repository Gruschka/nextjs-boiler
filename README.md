# nextjs-boiler

Production-ready Next.js 16 boilerplate with strict TypeScript, i18n, testing, and enforced commit conventions.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 — strict mode, `allowJs: false` |
| Styling | Tailwind CSS 4 |
| i18n | next-intl |
| Testing | Vitest + jsdom |
| Linting | ESLint 9 (Next.js core-web-vitals + TypeScript rules) |
| Formatting | Prettier 3 + prettier-plugin-tailwindcss |
| Commit hooks | Husky 9 + commitlint |

## TypeScript configuration

Strict mode with every pedantic flag enabled:

- `strict`, `noImplicitAny`, `noImplicitReturns`
- `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- `noUnusedLocals`, `noUnusedParameters`
- `noImplicitOverride`, `noPropertyAccessFromIndexSignature`

Build (`next build`) fails on type errors — `ignoreBuildErrors: false`.

## Commit conventions

Conventional Commits enforced via commitlint. The pre-commit hook runs `tsc --noEmit`; the commit-msg hook validates the message format.

```
<type>(<scope>): <subject>
```

- **type**: `feat` | `fix` | `chore` | `docs` | `refactor` | `test` | `style`
- **scope**: mandatory
- **subject**: lowercase, no trailing period

```bash
# Valid
feat(auth): add JWT session middleware
fix(ui): correct button focus ring on Safari

# Rejected — missing scope
feat: add JWT session middleware
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting (`tsc --noEmit`) |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with V8 coverage report |

## i18n

Locale messages live in `messages/`. The next-intl plugin is wired in `next.config.ts` and request locale resolution is in `src/i18n/request.ts`.

To add a locale, add a JSON file under `messages/` and register it in the i18n config.

## React Compiler

The React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). No manual `useMemo` / `useCallback` needed — the compiler handles memoization automatically.

## Getting started

```bash
npm install
npm run dev
```

Husky hooks are installed automatically via the `prepare` script on `npm install`.
