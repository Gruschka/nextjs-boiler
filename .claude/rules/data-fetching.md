---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
  - "src/components/**/*.tsx"
  - "src/stores/**/*.ts"
---

# Data fetching

- **Server Components**: fetch data directly with `async/await` — no hooks, no `useEffect`.
- **Client Components** needing reactive/interactive data: TanStack Query. Hooks live in `src/components/[domain]/hooks/`.
- Query keys follow `[domain, entity, ...params]` — e.g. `['users', 'profile', { id }]`.
- **Mutations**: Server Actions only — never call internal API routes from the client.
- Server Actions must call `revalidatePath()` or `revalidateTag()` after mutating data.
- `app/api/` route handlers are for external webhooks and third-party integrations only.

# State management

| State type | Tool | Location |
|---|---|---|
| Server state (Server Components) | `async/await` directly | `page.tsx` or layout |
| Server state (Client Components) | TanStack Query | `[domain]/hooks/` |
| Global UI state (sidebar, modals) | Zustand | `src/stores/` |
| URL state (filters, pagination) | `useSearchParams` | component |

Never duplicate URL state in Zustand. Never use Zustand for server state.
