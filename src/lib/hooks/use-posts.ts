import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Post } from '../api/posts.api'
import {
  type CreatePostPayload,
  postsApi,
  type UpdatePostPayload,
} from '../api/posts.api'

const POSTS_KEY = ['posts']

export function usePosts() {
  return useQuery({
    queryKey: POSTS_KEY,
    queryFn: postsApi.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function usePost(id: number) {
  return useQuery({
    queryKey: [...POSTS_KEY, id],
    queryFn: () => postsApi.getById(id),
    enabled: id > 0,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.create(payload),
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData<Post[]>(POSTS_KEY, (old) => {
        return old ? [newPost, ...old] : [newPost]
      })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      postsApi.update(id, payload),
    onSuccess: (updatedPost: Post) => {
      queryClient.setQueryData<Post[]>(POSTS_KEY, (old) => {
        return old
          ? old.map((post) => (post.id === updatedPost.id ? updatedPost : post))
          : old
      })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postsApi.delete(id),
    onSuccess: (_, deletedId: number) => {
      queryClient.setQueryData<Post[]>(POSTS_KEY, (old) => {
        return old ? old.filter((post) => post.id !== deletedId) : old
      })
    },
  })
}
