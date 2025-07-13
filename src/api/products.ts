import { api } from '@/lib/api'
import type { Product, ProductFilters, ApiResponse, PaginationInfo } from '@/types'

// Products API
export const productsApi = {
  // Get all products with filters and pagination
  getProducts: async (filters?: ProductFilters & { page?: number; limit?: number }) => {
    const params = new URLSearchParams()
    
    if (filters?.search) params.append('search', filters.search)
    if (filters?.categories?.length) params.append('categories', filters.categories.join(','))
    if (filters?.brands?.length) params.append('brands', filters.brands.join(','))
    if (filters?.priceRange) {
      params.append('minPrice', filters.priceRange.min.toString())
      params.append('maxPrice', filters.priceRange.max.toString())
    }
    if (filters?.rating) params.append('rating', filters.rating.toString())
    if (filters?.inStock !== undefined) params.append('inStock', filters.inStock.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const response = await api.get<ApiResponse<Product[]>>(`/products?${params}`)
    return response.data
  },

  // Get single product by ID
  getProduct: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`)
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get<ApiResponse<Product[]>>('/products/featured')
    return response.data
  },

  // Search products
  searchProducts: async (query: string, limit = 10) => {
    const response = await api.get<ApiResponse<Product[]>>(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`)
    return response.data
  }
}

// Mock API functions for development (since we don't have a real backend)
export const mockProductsApi = {
  getProducts: async (filters?: ProductFilters & { page?: number; limit?: number }): Promise<ApiResponse<Product[]>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock products data (same as in pages)
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones Premium",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 79.99,
        discountPrice: 59.99,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
        category: "Electronics",
        brand: "AudioTech",
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        stockQuantity: 45,
        sku: "AT-WBH-001",
        tags: ["wireless", "bluetooth", "noise-canceling"],
        createdAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z"
      },
      {
        id: "2",
        name: "Smart Watch Series 8",
        description: "Advanced smartwatch with health monitoring, GPS, and water resistance.",
        price: 299.99,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
        category: "Electronics",
        brand: "TechWear",
        rating: 4.8,
        reviewCount: 256,
        inStock: true,
        stockQuantity: 23,
        sku: "TW-SW8-001",
        tags: ["smartwatch", "fitness", "gps"],
        createdAt: "2024-01-20T00:00:00Z",
        updatedAt: "2024-01-20T00:00:00Z"
      },
      {
        id: "3",
        name: "Premium Coffee Maker",
        description: "Professional-grade coffee maker with programmable brewing and built-in grinder.",
        price: 149.99,
        discountPrice: 119.99,
        images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"],
        category: "Home & Kitchen",
        brand: "BrewMaster",
        rating: 4.3,
        reviewCount: 89,
        inStock: true,
        stockQuantity: 12,
        sku: "BM-PCM-001",
        tags: ["coffee", "kitchen", "programmable"],
        createdAt: "2024-01-10T00:00:00Z",
        updatedAt: "2024-01-10T00:00:00Z"
      },
      {
        id: "4",
        name: "Ergonomic Office Chair",
        description: "Comfortable ergonomic chair with lumbar support and adjustable height.",
        price: 199.99,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"],
        category: "Furniture",
        brand: "ComfortSeating",
        rating: 4.6,
        reviewCount: 67,
        inStock: true,
        stockQuantity: 8,
        sku: "CS-EOC-001",
        tags: ["ergonomic", "office", "chair"],
        createdAt: "2024-01-05T00:00:00Z",
        updatedAt: "2024-01-05T00:00:00Z"
      },
      {
        id: "5",
        name: "4K Webcam Pro",
        description: "Ultra HD webcam with auto-focus and noise reduction microphone.",
        price: 89.99,
        images: ["https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop"],
        category: "Electronics",
        brand: "StreamTech",
        rating: 4.4,
        reviewCount: 145,
        inStock: true,
        stockQuantity: 32,
        sku: "ST-4KW-001",
        tags: ["webcam", "4k", "streaming"],
        createdAt: "2024-01-25T00:00:00Z",
        updatedAt: "2024-01-25T00:00:00Z"
      },
      {
        id: "6",
        name: "Wireless Charging Pad",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
        price: 24.99,
        images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"],
        category: "Electronics",
        brand: "ChargeTech",
        rating: 4.2,
        reviewCount: 203,
        inStock: true,
        stockQuantity: 67,
        sku: "CT-WCP-001",
        tags: ["wireless", "charging", "qi"],
        createdAt: "2024-01-12T00:00:00Z",
        updatedAt: "2024-01-12T00:00:00Z"
      }
    ]

    // Apply filters
    let filteredProducts = [...mockProducts]

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
      )
    }

    if (filters?.categories?.length) {
      filteredProducts = filteredProducts.filter(product =>
        filters.categories!.includes(product.category)
      )
    }

    if (filters?.brands?.length) {
      filteredProducts = filteredProducts.filter(product =>
        filters.brands!.includes(product.brand)
      )
    }

    if (filters?.priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.discountPrice || product.price
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max
      })
    }

    if (filters?.rating) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= filters.rating!
      )
    }

    if (filters?.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.inStock === filters.inStock
      )
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredProducts.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price':
            const priceA = a.discountPrice || a.price
            const priceB = b.discountPrice || b.price
            return filters.sortOrder === 'desc' ? priceB - priceA : priceA - priceB
          case 'rating':
            return filters.sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating
          case 'newest':
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()
            return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB
          case 'name':
          default:
            return filters.sortOrder === 'desc' 
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name)
        }
      })
    }

    // Apply pagination
    const page = filters?.page || 1
    const limit = filters?.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    const pagination: PaginationInfo = {
      page,
      limit,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      hasNext: endIndex < filteredProducts.length,
      hasPrev: page > 1
    }

    return {
      data: paginatedProducts,
      pagination,
      success: true,
      message: 'Products retrieved successfully'
    }
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    // This would normally fetch from API
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return {
      data: product,
      success: true,
      message: 'Product retrieved successfully'
    }
  },

  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const featured = mockProducts.slice(0, 4) // First 4 products as featured
    return {
      data: featured,
      success: true,
      message: 'Featured products retrieved successfully'
    }
  }
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones Premium",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 79.99,
    discountPrice: 59.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
    category: "Electronics",
    brand: "AudioTech",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 45,
    sku: "AT-WBH-001",
    tags: ["wireless", "bluetooth", "noise-canceling"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Smart Watch Series 8",
    description: "Advanced smartwatch with health monitoring, GPS, and water resistance.",
    price: 299.99,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
    category: "Electronics",
    brand: "TechWear",
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    stockQuantity: 23,
    sku: "TW-SW8-001",
    tags: ["smartwatch", "fitness", "gps"],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with programmable brewing and built-in grinder.",
    price: 149.99,
    discountPrice: 119.99,
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"],
    category: "Home & Kitchen",
    brand: "BrewMaster",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 12,
    sku: "BM-PCM-001",
    tags: ["coffee", "kitchen", "programmable"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic chair with lumbar support and adjustable height.",
    price: 199.99,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"],
    category: "Furniture",
    brand: "ComfortSeating",
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 8,
    sku: "CS-EOC-001",
    tags: ["ergonomic", "office", "chair"],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "5",
    name: "4K Webcam Pro",
    description: "Ultra HD webcam with auto-focus and noise reduction microphone.",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop"],
    category: "Electronics",
    brand: "StreamTech",
    rating: 4.4,
    reviewCount: 145,
    inStock: true,
    stockQuantity: 32,
    sku: "ST-4KW-001",
    tags: ["webcam", "4k", "streaming"],
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z"
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 24.99,
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"],
    category: "Electronics",
    brand: "ChargeTech",
    rating: 4.2,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 67,
    sku: "CT-WCP-001",
    tags: ["wireless", "charging", "qi"],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z"
  }
]