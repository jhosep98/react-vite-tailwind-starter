import type * as React from 'react'
import { AppContext } from '../context/app'

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
