import { apiClient, ENDPOINTS } from '@/lib/api'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface CreatePostPayload {
  title: string
  body: string
  userId: number
}

export interface UpdatePostPayload {
  title?: string
  body?: string
}

const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(ENDPOINTS.posts)
    return response.data
  },

  getById: async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`${ENDPOINTS.posts}/${id}`)
    return response.data
  },

  create: async (payload: CreatePostPayload): Promise<Post> => {
    const response = await apiClient.post<Post>(ENDPOINTS.posts, payload)
    return response.data
  },

  update: async (id: number, payload: UpdatePostPayload): Promise<Post> => {
    const response = await apiClient.patch<Post>(
      `${ENDPOINTS.posts}/${id}`,
      payload,
    )
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.posts}/${id}`)
  },
}

export { postsApi }
