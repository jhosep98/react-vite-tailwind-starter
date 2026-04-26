import {
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import type { MutationOptions, QueryOptions } from '../api/types'

export function useApiQuery<T>(options: QueryOptions<T>): UseQueryResult<T> {
  return useQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    enabled: options.enabled,
    staleTime: options.staleTime ?? 1000 * 60 * 5,
    gcTime: options.gcTime ?? 1000 * 60 * 10,
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    retry: options.retry ?? 1,
  })
}

export function useApiMutation<TData, TError, TVariables>(
  options: MutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> {
  return useMutation({
    mutationFn: options.mutationFn,
    onSuccess: options.onSuccess,
    onError: options.onError,
    onSettled: options.onSettled,
  })
}
