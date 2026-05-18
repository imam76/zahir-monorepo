# Zahir

Turborepo workspace untuk aplikasi Zahir. Repo ini memakai Bun sebagai package
manager dan Turbo untuk menjalankan task lint, typecheck, build, dan dev server
lintas package.

## Requirements

- Bun `1.3.12` atau lebih baru
- Node.js `>=18`

Install dependency dari root repo:

```sh
bun install
```

## Apps And Packages

- `auth`: Vite React app untuk auth flow.
- `docs`: Next.js app.
- `web`: Next.js app.
- `ui-storybook`: Storybook untuk package UI.
- `@repo/ui`: shared React component library.
- `@repo/eslint-config`: shared ESLint config.
- `@repo/typescript-config`: shared TypeScript config.

## Commands

Jalankan dari root repo.

```sh
bun run dev
bun run build
bun run lint
bun run check-types
```

Jalankan app/package tertentu dengan Turbo filter:

```sh
bun run dev --filter=auth
bun run build --filter=auth
bun run lint --filter=auth
bun run check-types --filter=auth
```

Untuk memanggil binary Turbo langsung lewat Bun, gunakan:

```sh
bun run turbo dev --filter=auth
```

Catatan: di environment repo ini, `bun exec turbo ...` tidak me-resolve binary
lokal Turbo dan bisa gagal dengan `bun: command not found: turbo`. Pakai
`bun run turbo ...` atau script root seperti `bun run dev --filter=auth`.

## Auth App

Start dev server auth:

```sh
bun run dev --filter=auth
```

Default URL:

```txt
http://localhost:3002
```

Build auth app:

```sh
bun run build --filter=auth
```

Atau dari folder `apps/auth`:

```sh
bun run dev
bun run build
bun run lint
bun run check-types
```

## Storybook

Run Storybook untuk shared UI package:

```sh
bun run storybook
```

Build static Storybook:

```sh
bun run build-storybook
```

## Auth UI

Shared UI package menyediakan komponen auth UI-only:

```tsx
import "@repo/ui/styles.css";
import { SignIn, SignUp, UserButton } from "@repo/ui/auth";
```

Callback komponen perlu dihubungkan ke auth client atau backend:

```tsx
<SignIn
  onSubmit={async ({ email, password }) => {
    await signIn({ email, password });
  }}
/>
```

## Turbo Notes

Turbo filter mengacu ke nama package di `package.json`, misalnya:

- `auth`
- `web`
- `docs`
- `ui-storybook`
- `@repo/ui`

Contoh:

```sh
bun run build --filter=@repo/ui
```

Useful links:

- [Turborepo Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Turborepo Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Turborepo Caching](https://turborepo.com/docs/crafting-your-repository/caching)
