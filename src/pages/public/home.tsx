import { Link } from 'react-router-dom'
import { useDeletePost, usePaginatedPosts, usePosts } from '@/lib/hooks'
import { useAppStore } from '@/store'

const STACK = [
  { title: 'State', desc: 'Zustand + persist', icon: '⚡' },
  { title: 'Server', desc: 'Tanstack Query', icon: '🔄' },
  { title: 'Forms', desc: 'React Hook Form + Zod', icon: '📝' },
  { title: 'Components', desc: 'shadcn-style + CVA', icon: '🎨' },
  { title: 'i18n', desc: 'i18next ready', icon: '🌐' },
  { title: 'DX', desc: 'Biome + TypeScript', icon: '🔧' },
]

const COMPONENT_DIRS = [
  {
    path: 'components/ui/',
    purpose: 'Base primitives',
    example: 'Button, Card, Input',
  },
  {
    path: 'components/common/',
    purpose: 'Shared blocks',
    example: 'Badge, Avatar',
  },
  {
    path: 'components/features/',
    purpose: 'Domain logic',
    example: 'Cart, UserProfile',
  },
  {
    path: 'components/sections/',
    purpose: 'Layout chunks',
    example: 'Hero, Pricing',
  },
  {
    path: 'components/layout/',
    purpose: 'Global wrappers',
    example: 'Header, Footer',
  },
]

const BEST_PRACTICES = [
  { title: 'DRY', desc: 'Extract repeated UI to common/. No copy-paste.' },
  {
    title: 'SRP',
    desc: 'Logic in stores/hooks. Presentation in UI primitives.',
  },
  {
    title: 'Container',
    desc: 'Separate data fetching from UI. Props-only components.',
  },
  { title: 'Naming', desc: 'kebab-case files. ComponentNameProps interfaces.' },
]

export default function HomePage() {
  const { counter, increment, decrement, reset, _hasHydrated } = useAppStore()
  const { data: posts, isLoading, error } = usePosts()
  const deletePost = useDeletePost()
  const {
    data: paginatedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPaginated,
  } = usePaginatedPosts()

  const handleDelete = (id: number) => {
    deletePost.mutate(id)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">React Vite Tailwind Starter</h1>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            DevFocus Dark
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Stack Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STACK.map((item) => (
              <div
                key={item.title}
                className="p-4 bg-muted rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Component Structure</h2>
          <div className="bg-muted rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 text-sm font-mono border-b border-border bg-background">
              <span className="text-muted-foreground">Directory</span>
              <span className="text-muted-foreground">Purpose</span>
              <span className="text-muted-foreground">Example</span>
            </div>
            {COMPONENT_DIRS.map((item) => (
              <div
                key={item.path}
                className="grid grid-cols-3 gap-4 p-4 text-sm border-b border-border last:border-0"
              >
                <code className="text-primary">src/{item.path}</code>
                <span>{item.purpose}</span>
                <span className="text-muted-foreground">{item.example}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Routing</h2>
          <p className="text-muted-foreground">
            React Router DOM v6 with file-based structure. Routes configured in{' '}
            <code className="text-primary">src/routes/</code>.
          </p>
          <div className="bg-muted rounded-lg border border-border p-4 font-mono text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <code className="text-primary">/</code>
                <span className="text-muted-foreground">
                  → pages/public/home.tsx
                </span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-primary">/about</code>
                <span className="text-muted-foreground">
                  → pages/public/about.tsx
                </span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-primary">/dashboard</code>
                <span className="text-muted-foreground">
                  → pages/protected/dashboard.tsx
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Home
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Zustand Store</h2>
          <p className="text-muted-foreground">
            Global state with persist, devtools, subscribeWithSelector.
            State/Actions separation pattern.
          </p>
          <div className="bg-muted rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Persistence demo
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  _hasHydrated
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {_hasHydrated ? 'Hydrated' : 'Loading...'}
              </span>
            </div>
            <div className="text-center mb-6">
              <p className="text-5xl font-bold">{counter}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={decrement}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                Decrement
              </button>
              <button
                type="button"
                onClick={reset}
                className="px-4 py-2 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-md transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={increment}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Increment
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tanstack Query</h2>
          <p className="text-muted-foreground">
            Server state with caching, optimistic updates, infinite scroll, and
            pagination. Hooks in{' '}
            <code className="text-primary">src/lib/hooks/</code>.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg border border-border p-4">
              <h3 className="font-medium mb-2">
                Infinite Scroll (useInfiniteQuery)
              </h3>
              <div className="space-y-2 h-48 overflow-y-auto mb-3">
                {isLoadingPaginated ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : (
                  paginatedData?.pages.map((page, i) => (
                    <div key={page.data[0]?.id ?? i}>
                      {page.data.map((post) => (
                        <div
                          key={post.id}
                          className="p-2 bg-background rounded border border-border mb-1"
                        >
                          <p className="text-sm font-medium truncate">
                            {post.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load More'
                    : 'No more posts'}
              </button>
            </div>

            <div className="bg-muted rounded-lg border border-border p-4">
              <h3 className="font-medium mb-2">Optimistic Delete</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : error ? (
                  <p className="text-destructive">Error loading posts</p>
                ) : (
                  posts?.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-2 bg-background rounded border border-border"
                    >
                      <p className="text-sm truncate flex-1">{post.title}</p>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="ml-2 px-2 py-1 text-xs bg-destructive/20 text-destructive hover:bg-destructive/30 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg border border-border p-4 font-mono text-sm">
            <div className="text-muted-foreground mb-2">API structure:</div>
            <div className="space-y-1">
              <div>
                <code className="text-primary">lib/api/client.ts</code>
                <span className="text-muted-foreground"> - Axios instance</span>
              </div>
              <div>
                <code className="text-primary">lib/api/posts.api.ts</code>
                <span className="text-muted-foreground">
                  {' '}
                  - getPaginated(params)
                </span>
              </div>
              <div>
                <code className="text-primary">lib/hooks/use-posts.ts</code>
                <span className="text-muted-foreground"> - CRUD hooks</span>
              </div>
              <div>
                <code className="text-primary">
                  lib/hooks/use-paginated-posts.ts
                </code>
                <span className="text-muted-foreground">
                  {' '}
                  - useInfiniteQuery
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BEST_PRACTICES.map((item) => (
              <div
                key={item.title}
                className="bg-muted rounded-lg p-4 border border-border"
              >
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Advanced React ─────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced React Patterns</h2>

          {/* React 19 */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">React 19 Highlights</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                {
                  name: 'use(promise)',
                  desc: 'Suspend inside a component while a promise resolves — no useEffect needed.',
                },
                {
                  name: 'useActionState',
                  desc: 'Manages async action state (pending, error, data) returned from a Server Action.',
                },
                {
                  name: 'useFormStatus',
                  desc: 'Reads the pending state of the nearest parent <form> submission.',
                },
                {
                  name: 'useOptimistic',
                  desc: 'Apply an optimistic UI update while an async mutation is in flight.',
                },
                {
                  name: 'Server Actions',
                  desc: 'async functions marked with "use server" that run on the server and can be called from the client.',
                },
                {
                  name: 'ref as prop',
                  desc: 'forwardRef is no longer needed — pass ref directly as a prop in React 19.',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Component composition */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">Component Patterns</h3>
            <div className="space-y-3 text-sm font-mono">
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-muted-foreground font-sans font-medium">
                  Compound components — share implicit state via context
                </p>
                <p>
                  <span className="text-primary">{'<Tabs>'}</span> wraps{' '}
                  {'<Tabs.List>'} + {'<Tabs.Panel>'}
                </p>
                <p>
                  <span className="text-primary">{'<Select>'}</span> wraps{' '}
                  {'<Select.Trigger>'} + {'<Select.Options>'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-muted-foreground font-sans font-medium">
                  Render props — delegate rendering to the consumer
                </p>
                <p>{'<DataList render={(item) => <Row item={item} />} />'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-muted-foreground font-sans font-medium">
                  Slots via children composition
                </p>
                <p>
                  {'<Card><Card.Header /><Card.Body /><Card.Footer /></Card>'}
                </p>
              </div>
            </div>
          </div>

          {/* Props best practices */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">Props Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  ✓ Extend HTML attributes
                </p>
                <p>{'interface ButtonProps'}</p>
                <p>{'  extends React.ButtonHTMLAttributes'}</p>
                <p className="text-muted-foreground">
                  {'  { variant?: "primary" | "ghost" }'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  ✓ Spread remaining props
                </p>
                <p>{'const Button = ({ variant, ...props }) => ('}</p>
                <p className="text-muted-foreground">
                  {'  <button {...props} />'}
                </p>
                <p>{')'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  ✓ Forward refs (React 18)
                </p>
                <p>{'React.forwardRef<HTMLButtonElement,'}</p>
                <p className="text-muted-foreground">
                  {'  ButtonProps>((props, ref) => ...)'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  ✓ Ref as prop (React 19)
                </p>
                <p>{'const Button = ({ ref, ...props }) => ('}</p>
                <p className="text-muted-foreground">
                  {'  <button ref={ref} {...props} />'}
                </p>
                <p>{')'}</p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">Performance</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              {[
                {
                  name: 'React.memo',
                  desc: 'Skip re-render if props are shallowly equal. Use on pure presentational components.',
                },
                {
                  name: 'useMemo',
                  desc: 'Memoize expensive derived values. Only when the computation is genuinely costly.',
                },
                {
                  name: 'useCallback',
                  desc: 'Stable function reference between renders. Required when passed to memo-wrapped children.',
                },
                {
                  name: 'React.lazy + Suspense',
                  desc: 'Code-split routes and heavy components. Reduces initial bundle size.',
                },
                {
                  name: 'Avoid inline objects',
                  desc: "Don't create objects/arrays in JSX — they break shallow equality and cause re-renders.",
                },
                {
                  name: 'Selector granularity',
                  desc: 'In Zustand, select only the slice you need — not the whole store object.',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hooks */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">Hooks Guide</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                {
                  name: 'useReducer',
                  desc: 'Prefer over useState when state transitions are complex or interdependent.',
                },
                {
                  name: 'useRef',
                  desc: 'DOM access or mutable value that must NOT trigger a re-render.',
                },
                {
                  name: 'useContext + typed',
                  desc: 'Always type the context value. Throw if used outside provider.',
                },
                {
                  name: 'Custom hooks rules',
                  desc: 'Name starts with "use". No conditionals around hook calls. Return stable values.',
                },
                {
                  name: 'useEffect cleanup',
                  desc: 'Always return a cleanup function for subscriptions, timers, and event listeners.',
                },
                {
                  name: 'Avoid "effect as event"',
                  desc: "Don't use useEffect to react to user actions — use event handlers instead.",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Export patterns */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">Export Patterns</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm font-mono">
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-green-400 font-sans">
                  ✓ Named exports for everything
                </p>
                <p>{'export const Button = () => ...'}</p>
                <p>{'export const buttonVariants = cva(...)'}</p>
                <p className="text-muted-foreground">
                  {'// consumer: import { Button } from ...'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-green-400 font-sans">
                  ✓ Barrel files for public API
                </p>
                <p>{'// components/ui/index.ts'}</p>
                <p>{'export { Button } from "./button"'}</p>
                <p>{'export { Card } from "./card"'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-yellow-400 font-sans">
                  ⚠ Default export only for pages/routes
                </p>
                <p>{'// pages/home.tsx'}</p>
                <p>{'export default function HomePage() {}'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-red-400 font-sans">
                  ✗ Avoid re-exporting everything blindly
                </p>
                <p className="text-muted-foreground">
                  {'// ❌ export * from "./utils"'}
                </p>
                <p>{'// ✓ be explicit about the public API'}</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>
            <code className="text-primary">pnpm dev</code> |{' '}
            <code className="text-primary">pnpm check</code> |{' '}
            <code className="text-primary">pnpm typecheck</code>
          </p>
        </footer>
      </main>
    </div>
  )
}
