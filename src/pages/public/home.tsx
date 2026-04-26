import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageToggle } from '@/components/common/language-toggle'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { useDeletePost, usePaginatedPosts, usePosts } from '@/lib/hooks'
import { useAppStore } from '@/store'

export default function HomePage() {
  const { t } = useTranslation('home')
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

  const STACK = [
    { key: 'state', icon: '⚡' },
    { key: 'server', icon: '🔄' },
    { key: 'forms', icon: '📝' },
    { key: 'components', icon: '🎨' },
    { key: 'i18n', icon: '🌐' },
    { key: 'dx', icon: '🔧' },
  ]

  const COMPONENT_DIRS = [
    { path: 'components/ui/', key: 'ui' },
    { path: 'components/common/', key: 'common' },
    { path: 'components/features/', key: 'features' },
    { path: 'components/sections/', key: 'sections' },
    { path: 'components/layout/', key: 'layout' },
  ]

  const BEST_PRACTICES = ['dry', 'srp', 'container', 'naming'] as const

  const REACT19_ITEMS = [
    { name: 'use(promise)', key: 'use' },
    { name: 'useActionState', key: 'useActionState' },
    { name: 'useFormStatus', key: 'useFormStatus' },
    { name: 'useOptimistic', key: 'useOptimistic' },
    { name: 'Server Actions', key: 'serverActions' },
    { name: 'ref as prop', key: 'refAsProp' },
  ] as const

  const PERFORMANCE_ITEMS = [
    { name: 'React.memo', key: 'memo' },
    { name: 'useMemo', key: 'useMemo' },
    { name: 'useCallback', key: 'useCallback' },
    { name: 'React.lazy + Suspense', key: 'lazy' },
    { name: 'Avoid inline objects', key: 'inlineObjects' },
    { name: 'Selector granularity', key: 'selector' },
  ] as const

  const HOOKS_ITEMS = [
    { name: 'useReducer', key: 'useReducer' },
    { name: 'useRef', key: 'useRef' },
    { name: 'useContext + typed', key: 'useContext' },
    { name: 'Custom hooks rules', key: 'customRules' },
    { name: 'useEffect cleanup', key: 'cleanup' },
    { name: 'Avoid "effect as event"', key: 'effectAsEvent' },
  ] as const

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('header.title')}</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        {/* Stack Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('stack.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STACK.map((item) => (
              <div
                key={item.key}
                className="p-4 bg-muted rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-medium mb-1">
                  {t(`stack.items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`stack.items.${item.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Component Structure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t('componentStructure.title')}
          </h2>
          <div className="bg-muted rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 text-sm font-mono border-b border-border bg-background">
              <span className="text-muted-foreground">
                {t('componentStructure.columns.directory')}
              </span>
              <span className="text-muted-foreground">
                {t('componentStructure.columns.purpose')}
              </span>
              <span className="text-muted-foreground">
                {t('componentStructure.columns.example')}
              </span>
            </div>
            {COMPONENT_DIRS.map((item) => (
              <div
                key={item.path}
                className="grid grid-cols-3 gap-4 p-4 text-sm border-b border-border last:border-0"
              >
                <code className="text-primary">src/{item.path}</code>
                <span>{t(`componentStructure.items.${item.key}.purpose`)}</span>
                <span className="text-muted-foreground">
                  {t(`componentStructure.items.${item.key}.example`)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Routing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('routing.title')}</h2>
          <p className="text-muted-foreground">
            {t('routing.desc')}{' '}
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
              {t('routing.home')}
            </Link>
          </div>
        </section>

        {/* Project Structure */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {t('projectStructure.title')}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t('projectStructure.subtitle')}
            </p>
          </div>

          {/* Directory tree */}
          <div className="bg-muted rounded-lg border border-border overflow-hidden text-sm">
            {(
              [
                'srcRoot',
                'appTsx',
                'mainTsx',
                'i18n',
                'pages',
                'pagesPublic',
                'pagesProtected',
                'routes',
                'componentsUi',
                'componentsCommon',
                'componentsFeatures',
                'componentsSections',
                'componentsLayout',
                'hooks',
                'lib',
                'libApi',
                'libHooks',
                'store',
                'storeSlices',
                'styles',
                'publicLocales',
              ] as const
            ).map((key) => {
              const label = t(`projectStructure.directories.${key}.label`)
              const isFolder = label.endsWith('/')
              const indent = label.split('/').filter(Boolean).length - 1
              return (
                <div
                  key={key}
                  className="flex gap-4 px-4 py-2.5 border-b border-border last:border-0 hover:bg-background/50 transition-colors"
                >
                  <code
                    className={`shrink-0 ${isFolder ? 'text-primary' : 'text-muted-foreground'}`}
                    style={{ paddingLeft: `${indent * 12}px` }}
                  >
                    {label}
                  </code>
                  <span className="text-muted-foreground leading-snug">
                    {t(`projectStructure.directories.${key}.desc`)}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Golden rule */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm">
            <p className="text-primary font-medium">
              {t('projectStructure.rule')}
            </p>
          </div>

          {/* Placement rules */}
          <div className="space-y-3">
            <h3 className="font-medium">{t('projectStructure.rules.title')}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {(
                [
                  'noLogicInPages',
                  'noStoreInUi',
                  'noApiInComponents',
                  'oneSlicePerDomain',
                  'barrelExports',
                  'kebabCase',
                ] as const
              ).map((key) => (
                <div
                  key={key}
                  className="bg-muted rounded-lg p-3 border border-border"
                >
                  <p className="font-medium text-sm mb-1">
                    {t(`projectStructure.rules.items.${key}.label`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`projectStructure.rules.items.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zustand Store */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('zustand.title')}</h2>
          <div className="bg-muted rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {t('zustand.persistenceDemo')}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  _hasHydrated
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {_hasHydrated ? t('zustand.hydrated') : t('zustand.loading')}
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
                {t('zustand.decrement')}
              </button>
              <button
                type="button"
                onClick={reset}
                className="px-4 py-2 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-md transition-colors"
              >
                {t('zustand.reset')}
              </button>
              <button
                type="button"
                onClick={increment}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {t('zustand.increment')}
              </button>
            </div>
          </div>
        </section>

        {/* Tanstack Query */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('tanstack.title')}</h2>
          <p className="text-muted-foreground">
            {t('tanstack.desc')}{' '}
            <code className="text-primary">src/lib/hooks/</code>.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg border border-border p-4">
              <h3 className="font-medium mb-2">
                {t('tanstack.infiniteScroll')}
              </h3>
              <div className="space-y-2 h-48 overflow-y-auto mb-3">
                {isLoadingPaginated ? (
                  <p className="text-muted-foreground">
                    {t('tanstack.loading')}
                  </p>
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
                  ? t('tanstack.loadingMore')
                  : hasNextPage
                    ? t('tanstack.loadMore')
                    : t('tanstack.noMorePosts')}
              </button>
            </div>

            <div className="bg-muted rounded-lg border border-border p-4">
              <h3 className="font-medium mb-2">
                {t('tanstack.optimisticDelete')}
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {isLoading ? (
                  <p className="text-muted-foreground">
                    {t('tanstack.loading')}
                  </p>
                ) : error ? (
                  <p className="text-destructive">
                    {t('tanstack.errorLoading')}
                  </p>
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
                        {t('tanstack.delete')}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg border border-border p-4 font-mono text-sm">
            <div className="text-muted-foreground mb-2">
              {t('tanstack.apiStructure')}
            </div>
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

        {/* Best Practices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('bestPractices.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BEST_PRACTICES.map((key) => (
              <div
                key={key}
                className="bg-muted rounded-lg p-4 border border-border"
              >
                <h3 className="font-medium mb-2">
                  {t(`bestPractices.items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`bestPractices.items.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Advanced React ─────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">{t('advancedReact.title')}</h2>

          {/* React 19 */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">
              {t('advancedReact.react19.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {REACT19_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">
                    {t(`advancedReact.react19.items.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Component composition */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">
              {t('advancedReact.componentPatterns.title')}
            </h3>
            <div className="space-y-3 text-sm font-mono">
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-muted-foreground font-sans font-medium">
                  {t('advancedReact.componentPatterns.compound')}
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
                  {t('advancedReact.componentPatterns.renderProps')}
                </p>
                <p>{'<DataList render={(item) => <Row item={item} />} />'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-muted-foreground font-sans font-medium">
                  {t('advancedReact.componentPatterns.slots')}
                </p>
                <p>
                  {'<Card><Card.Header /><Card.Body /><Card.Footer /></Card>'}
                </p>
              </div>
            </div>
          </div>

          {/* Props best practices */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">
              {t('advancedReact.props.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.props.extendHtml')}
                </p>
                <p>{'interface ButtonProps'}</p>
                <p>{'  extends React.ButtonHTMLAttributes'}</p>
                <p className="text-muted-foreground">
                  {'  { variant?: "primary" | "ghost" }'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.props.spreadProps')}
                </p>
                <p>{'const Button = ({ variant, ...props }) => ('}</p>
                <p className="text-muted-foreground">
                  {'  <button {...props} />'}
                </p>
                <p>{')'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.props.forwardRef')}
                </p>
                <p>{'React.forwardRef<HTMLButtonElement,'}</p>
                <p className="text-muted-foreground">
                  {'  ButtonProps>((props, ref) => ...)'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1 font-mono">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.props.refAsProp')}
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
            <h3 className="font-medium text-primary">
              {t('advancedReact.performance.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              {PERFORMANCE_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">
                    {t(`advancedReact.performance.items.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hooks */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">
              {t('advancedReact.hooks.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {HOOKS_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="bg-background rounded p-3 border border-border"
                >
                  <code className="text-primary text-xs">{item.name}</code>
                  <p className="text-muted-foreground mt-1">
                    {t(`advancedReact.hooks.items.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Export patterns */}
          <div className="bg-muted rounded-lg p-5 border border-border space-y-3">
            <h3 className="font-medium text-primary">
              {t('advancedReact.exports.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm font-mono">
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.exports.named')}
                </p>
                <p>{'export const Button = () => ...'}</p>
                <p>{'export const buttonVariants = cva(...)'}</p>
                <p className="text-muted-foreground">
                  {'// consumer: import { Button } from ...'}
                </p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-green-400 font-sans">
                  {t('advancedReact.exports.barrel')}
                </p>
                <p>{'// components/ui/index.ts'}</p>
                <p>{'export { Button } from "./button"'}</p>
                <p>{'export { Card } from "./card"'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-yellow-400 font-sans">
                  {t('advancedReact.exports.defaultExport')}
                </p>
                <p>{'// pages/home.tsx'}</p>
                <p>{'export default function HomePage() {}'}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border space-y-1">
                <p className="text-red-400 font-sans">
                  {t('advancedReact.exports.avoidStar')}
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
