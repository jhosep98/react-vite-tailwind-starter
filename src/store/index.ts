export type { AppActions, AppState, AppStore } from './slices/app.slice'
export { useAppStore } from './slices/app.slice'
export type { PartialBy, StoreSlice } from './slices/base.slice'
export {
  createSlice,
  setError,
  setFulfilled,
  setHydrated,
  setPending,
} from './slices/base.slice'
