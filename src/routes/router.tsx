import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loader } from '@/components/shared/loader'

export const HomePageLazy = React.lazy(() =>
  import('@/pages/public/home').then((module) => ({
    default: module.default,
  })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<Loader />}>
        <HomePageLazy />
      </React.Suspense>
    ),
  },
])
