# React Vite Tailwind Starter

Un template para construir aplicaciones web modernas con React, Vite y Tailwind CSS. Pre-configurado con herramientas para acelerar el desarrollo.

## Features

- **Frameworks:** React 19, Vite 7, Tailwind CSS 4
- **Routing:** React Router DOM 6
- **State Management:** Zustand (store global), Tanstack Query (server state)
- **Forms:** React Hook Form + Zod validation
- **i18n:** i18next con react-i18next
- **UI:** shadcn/ui-style components, Sonner toasts, Lucide icons
- **DX:** Biome (lint/format), TypeScript strict

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm format` | Format with Biome |
| `pnpm lint` | Lint with Biome |
| `pnpm check` | Biome check (fix safe) |
| `pnpm typecheck` | TypeScript check |

## Project Structure

```
src/
├── components/
│   ├── shared/      # Shared components (Loader)
│   └── ui/          # UI primitives (Button, Form, Label, Sonner)
├── hooks/           # Custom hooks
├── lib/             # Utilities (cn helper)
├── pages/
│   └── public/      # Public pages (Home)
├── routes/          # Router config
├── store/
│   ├── slices/      # Zustand slices
│   ├── context/      # React contexts
│   └── provider/    # Context providers
├── styles/          # Global styles
└── App.tsx          # Root component
```

## Tech Stack Details

### State Management

**Zustand** para estado global con:
- `persist` middleware (localStorage)
- `devtools` para debugging
- `subscribeWithSelector` para selects tipados
- Pattern State/Actions separado

```typescript
// Crear un slice
interface CounterState { count: number }
interface CounterActions { increment: () => void }
type CounterStore = CounterState & CounterActions

// Helper createSlice provee _hasHydrated, _status, _error
```

**Tanstack Query** para server state (API calls, caching, mutations).

### Styling

- Tailwind CSS 4 con `@tailwindcss/vite`
- `cn()` helper (clsx + tailwind-merge) para conditionally merge classes
- shadcn/ui-style components con class-variance-authority

## License

MIT
