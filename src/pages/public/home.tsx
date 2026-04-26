import { Link } from 'react-router-dom'
import { useDeletePost, usePosts } from '@/lib/hooks'
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
            Server state management with caching, optimistic updates, and
            automatic refetching. Hooks in{' '}
            <code className="text-primary">src/lib/hooks/</code>.
          </p>
          <div className="bg-muted rounded-lg border border-border p-4">
            {isLoading ? (
              <p className="text-muted-foreground">Loading posts...</p>
            ) : error ? (
              <p className="text-destructive">Error loading posts</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {posts?.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-2 bg-background rounded border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {post.body}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="ml-2 px-2 py-1 text-xs bg-destructive/20 text-destructive hover:bg-destructive/30 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-muted rounded-lg border border-border p-4 font-mono text-sm">
            <div className="text-muted-foreground mb-2">API structure:</div>
            <div className="space-y-1">
              <div>
                <code className="text-primary">lib/api/client.ts</code>
                <span className="text-muted-foreground"> - Axios instance</span>
              </div>
              <div>
                <code className="text-primary">lib/api/endpoints.ts</code>
                <span className="text-muted-foreground"> - API endpoints</span>
              </div>
              <div>
                <code className="text-primary">lib/api/posts.api.ts</code>
                <span className="text-muted-foreground"> - Posts API</span>
              </div>
              <div>
                <code className="text-primary">lib/hooks/use-posts.ts</code>
                <span className="text-muted-foreground"> - Query hooks</span>
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
