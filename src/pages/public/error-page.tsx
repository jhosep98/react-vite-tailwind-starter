import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

interface ErrorPageProps {
  title?: string
  message?: string
}

export function ErrorPage({ title, message }: ErrorPageProps) {
  const { t } = useTranslation('common')
  const error = useRouteError()

  const statusCode = isRouteErrorResponse(error) ? error.status : 404
  const errorTitle =
    title ?? (isRouteErrorResponse(error) ? error.statusText : 'Error')
  const errorMessage =
    message ??
    (isRouteErrorResponse(error)
      ? (error.data?.message ??
        (statusCode === 404 ? t('notFound') : t('unexpectedError')))
      : t('unexpectedError'))

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <p className="text-6xl font-bold text-primary">{statusCode}</p>
          <h1 className="text-2xl font-semibold">{errorTitle}</h1>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('goHome')}
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            {t('reload')}
          </button>
        </div>

        {import.meta.env.DEV && !!error && (
          <div className="mt-8 text-left">
            <p className="text-sm font-mono text-muted-foreground mb-2">
              {t('errorDetails')}
            </p>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto text-destructive">
              {String(error) as string}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
