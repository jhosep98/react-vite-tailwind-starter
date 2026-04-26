import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'
import { BASE_URL } from './endpoints'
import type { ApiError } from './types'

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ?? error.message ?? 'An error occurred'
      const status = error.response?.status ?? 500

      return Promise.reject({
        message,
        status,
        errors: error.response?.data?.errors,
      } as ApiError)
    },
  )

  return client
}

export const apiClient = createApiClient()
