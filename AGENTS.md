# AGENTS.md

Guide for coding agents working on this project.

## Setup

```bash
pnpm install
```

Before committing or ending a session, always run:

```bash
pnpm check && pnpm typecheck && pnpm lint
```

## Code Rules

### TypeScript
- Use `strict: true` in TypeScript
- Path aliases: `@/*` maps to `src/*`
- Never use `any` without explanatory comment
- Types > Interfaces for store state

### Biome (lint/format)
- `pnpm format` formats code
- `pnpm lint` linting
- `pnpm check` check + safe fixes
- **NEVER run build after changes**

### Commits
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`
- Never add "Co-Authored-By" or AI attribution
- push --force to main/master: **WARN user first**

## Directory Separation of Concerns

Place files in the correct directory. **Do NOT guess.**

```
src/
├── components/
│   ├── ui/           # Base presentational primitives (shadcn)
│   ├── common/       # Shared reusable UI blocks
│   ├── features/     # Smart, domain-coupled components
│   ├── sections/     # Large layout chunks
│   └── layout/       # Global wrappers (header, footer)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn, etc.)
├── pages/             # Route pages
├── routes/            # React Router config
├── store/             # Zustand stores + slices
├── styles/            # Global CSS
└── App.tsx            # Root component
```

### Component Directories

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `components/ui/` | Base primitives, shadcn-style | `button.tsx`, `input.tsx`, `card.tsx` |
| `components/common/` | Shared UI blocks | `IconButton.tsx`, `Badge.tsx` |
| `components/features/` | Domain-coupled, connected to Zustand | `Cart.tsx`, `UserProfile.tsx` |
| `components/sections/` | Layout chunks | `HeroSection.tsx`, `PricingSection.tsx` |
| `components/layout/` | Global wrappers | `Header.tsx`, `Footer.tsx` |

## Naming Conventions

### Files
- React components: `kebab-case.tsx` (`button.tsx`, `user-profile.tsx`)
- Utils, hooks: `kebab-case.ts` (`use-counter.ts`, `cn.ts`)
- Tests: Same name as file being tested + `.test.ts`

### Props Interfaces
```typescript
// Pattern: ComponentNameProps
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted'
}
```

## SOLID & Clean Code

### DRY (Don't Repeat Yourself)
- Repeated button/card/input markup → extract to `common/`
- Repeated logic → extract to custom hook
- **Do NOT copy-paste HTML chunks across pages**

### SRP (Single Responsibility Principle)
- **Logic** belongs in: stores, hooks, or feature components
- **Presentation** belongs in: UI primitives and common components
- Do NOT mix heavy data parsing/fetching in presentational components

### Container/Presentational Pattern
```typescript
// Presentational - only receives data and renders UI
interface CardProps { title: string; content: string }
const Card = ({ title, content }: CardProps) => (
  <div><h3>{title}</h3><p>{content}</p></div>
)

// Container - handles data/logic, renders presentational or feature component
const CardContainer = () => {
  const { data } = useQuery(['card'])
  return <Card title={data.title} content={data.content} />
}
```

## State Management

### Zustand Store Pattern

**File structure:**
```
src/store/
├── index.ts          # Barrel exports
├── slices/
│   ├── app.slice.ts  # Default store example
│   └── base.slice.ts # Helpers (createSlice, setHydrated, etc.)
├── context/          # React contexts (if needed)
└── provider/         # Context providers
```

**Create a new slice:**

1. Define `State` and `Actions` separately
2. Combine into `Store = State & Actions`
3. Use `createSlice()` helper to initialize

```typescript
// 1. State and Actions separated
interface CounterState { count: number }
interface CounterActions { increment: () => void }
type CounterStore = CounterState & CounterActions

// 2. Create slice factory
const createCounterSlice = (): CounterSlice => ({
  ...createSlice<CounterSlice>({ count: 0 }),
  increment: () => {},
})

// 3. In the store:
export const useCounterStore = create<CounterStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          ...createCounterSlice(),
          setHydrated: (value: boolean) => set({ _hasHydrated: value }),
        }),
        { name: 'counter-storage' }
      )
    )
  )
)
```

**Helpers available in `base.slice.ts`:**
- `createSlice<T>()` - Initializes with `_hasHydrated`, `_status`, `_error`
- `setHydrated(state, value)` - Marks if store loaded from persist
- `setPending(state)` - Marks state as pending
- `setFulfilled(state)` - Marks state as idle
- `setError(state, error)` - Marks state as error with message

### Tanstack Query

For server state, mutations, caching. See existing config in `src/App.tsx`.

## Component Patterns

### UI Components (`components/ui/`)

Follow shadcn/ui patterns:
- Use `class-variance-authority` (CVA) for variants
- Props with `HTMLAttributes<HTMLDivElement>` base
- Export component + variant classes

```typescript
// Example: button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-sm',
    },
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
```

### Common Components (`components/common/`)

Shared reusable UI blocks built from UI primitives:
- `IconButton.tsx`, `Badge.tsx`, `Avatar.tsx`

### Feature Components (`components/features/`)

Smart, domain-coupled components connected to Zustand:
- Manage their own slice of state
- Compose UI/common components
- Example: `Cart.tsx` connects to `useCartStore`

### Pages

`src/pages/` - One folder per feature/route:
```
src/pages/
├── public/
│   ├── home.tsx
│   └── about.tsx
└── protected/
    └── dashboard.tsx
```

## i18n

- Files in `public/locales/{lang}/`
- Keys based on path: `home.title`, `home.subtitle`
- Use `useTranslation()` in components
- Don't hardcode translation keys - use i18n from the start

## Testing

Pending - not set up yet. When added:
- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright
- Run: `pnpm test`, `pnpm test:e2e`

## Troubleshooting

### "Cannot find module '@/*'"
Verify `@/*` alias is in `tsconfig.json` and tsconfig.app.json extends correctly.

### Biome errors after merge
Run `pnpm check --write` to apply automatic fixes.