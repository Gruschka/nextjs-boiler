---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
  - "src/components/**/*.tsx"
---

# Error handling

- Route-level errors: `error.tsx` at the route segment boundary. Route-level loading: `loading.tsx`. Component-level loading: `<Suspense>`.
- Server Actions return a discriminated union — never throw:
  ```ts
  { success: true; data: T } | { success: false; error: string }
  ```
- API route errors use a typed shape: `{ status: number; message: string; code: string }`.
- All `async` operations in Client Components have `try/catch` with a typed error variable — never `catch (e: any)`.
