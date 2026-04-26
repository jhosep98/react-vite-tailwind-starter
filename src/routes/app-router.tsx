import type * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const AppRouter: React.FC = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  )
}

export default AppRouter
