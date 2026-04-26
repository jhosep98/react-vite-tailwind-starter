export const BASE_URL =
  import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com'

export const ENDPOINTS = {
  posts: '/posts',
  users: '/users',
  comments: '/comments',
  albums: '/albums',
  photos: '/photos',
} as const

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS]
