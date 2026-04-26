import { useAppStore } from '@/store'

export default function HomePage() {
  const { counter, increment, decrement, reset, _hasHydrated } = useAppStore()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">React+Vite+Tailwind Starter</h1>
      <p className="text-lg text-gray-700 mb-8">
        Zustand store example with persistence
      </p>

      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Hydrated from storage</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              _hasHydrated
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {_hasHydrated ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">Counter</p>
          <p className="text-5xl font-bold text-gray-900">{counter}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={decrement}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
          >
            Decrement
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={increment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Increment
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Value persists in localStorage across refreshes
        </p>
      </div>
    </div>
  )
}
