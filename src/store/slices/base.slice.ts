export interface StoreSlice<_T extends object> {
  _hasHydrated: boolean
  _status: 'idle' | 'pending' | 'error'
  _error: string | null
}

export const createSlice = <T extends StoreSlice<T>>(
  initial: Omit<T, '_hasHydrated' | '_status' | '_error'> &
    Partial<Pick<T, '_hasHydrated' | '_status' | '_error'>>,
): T =>
  ({
    _hasHydrated: false,
    _status: 'idle',
    _error: null,
    ...initial,
  }) as T

type Write<T, O extends object> = Omit<T, keyof O> &
  Partial<Pick<T, keyof O & keyof T>>

export type PartialBy<T, K extends keyof T> = Write<T, Partial<Pick<T, K>>>

export const setHydrated = <T extends StoreSlice<T>>(
  state: T,
  value: boolean,
): T => ({
  ...state,
  _hasHydrated: value,
})

export const setPending = <T extends StoreSlice<T>>(state: T): T => ({
  ...state,
  _status: 'pending',
  _error: null,
})

export const setFulfilled = <T extends StoreSlice<T>>(state: T): T => ({
  ...state,
  _status: 'idle',
  _error: null,
})

export const setError = <T extends StoreSlice<T>>(
  state: T,
  error: string,
): T => ({
  ...state,
  _status: 'error',
  _error: error,
})
