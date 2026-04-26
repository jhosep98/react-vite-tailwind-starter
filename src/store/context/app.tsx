import * as React from 'react'

type AppContextProps = Record<string, never>

export const AppContext = React.createContext<AppContextProps>({})
