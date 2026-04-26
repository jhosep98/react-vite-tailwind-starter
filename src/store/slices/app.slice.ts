import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

export { create } from 'zustand'

export interface AppState {
  counter: number
  _hasHydrated: boolean
  _status: 'idle' | 'pending' | 'error'
  _error: string | null
}

export interface AppActions {
  increment: () => void
  decrement: () => void
  reset: () => void
  setHydrated: (value: boolean) => void
}

export type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          counter: 0,
          _hasHydrated: false,
          _status: 'idle' as const,
          _error: null,
          increment: () => set((state) => ({ counter: state.counter + 1 })),
          decrement: () => set((state) => ({ counter: state.counter - 1 })),
          reset: () => set({ counter: 0 }),
          setHydrated: (value: boolean) => set({ _hasHydrated: value }),
        }),
        {
          name: 'app-storage',
          partialize: (state) => ({ counter: state.counter }),
          onRehydrateStorage: () => (state) => {
            state?.setHydrated(true)
          },
        },
      ),
    ),
    { name: 'AppStore' },
  ),
)
