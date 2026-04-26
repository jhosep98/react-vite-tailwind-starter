import { useInfiniteQuery } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import type { PaginationParams } from '../api/types'

const POSTS_PER_PAGE = 10

export function usePaginatedPosts() {
  return useInfiniteQuery({
    queryKey: ['posts', 'paginated'],
    queryFn: async ({ pageParam }) => {
      const params: PaginationParams = {
        page: pageParam as number,
        limit: POSTS_PER_PAGE,
      }
      const data = await postsApi.getPaginated(params)
      return {
        data,
        nextPage:
          data.length === POSTS_PER_PAGE
            ? (pageParam as number) + 1
            : undefined,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}
