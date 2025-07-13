import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { mockProductsApi } from '@/api/products'
import type { ProductFilters } from '@/types'

// Query keys
export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productsKeys.lists(), { filters }] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
  featured: () => [...productsKeys.all, 'featured'] as const,
}

// Hooks for products
export const useProducts = (filters?: ProductFilters & { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: productsKeys.list(filters || {}),
    queryFn: () => mockProductsApi.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => mockProductsApi.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: productsKeys.featured(),
    queryFn: () => mockProductsApi.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Infinite query for pagination
export const useInfiniteProducts = (filters?: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: [...productsKeys.lists(), 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      mockProductsApi.getProducts({ ...filters, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.hasNext) {
        return lastPage.pagination.page + 1
      }
      return undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}