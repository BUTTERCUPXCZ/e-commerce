import { useState } from "react"
import { Search, Grid, List, SlidersHorizontal, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/stores/cart"
import type { Product } from "@/types"

// Mock products data
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

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Electronics", "Home & Kitchen", "Furniture"]
  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "newest", label: "Newest" }
  ]

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.discountPrice || a.price) - (b.discountPrice || b.price)
        case "price-high":
          return (b.discountPrice || b.price) - (a.discountPrice || a.price)
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const ProductCard = ({ product }: { product: Product }) => {
    const { addItem } = useCartStore()
    
    const handleAddToCart = () => {
      addItem(product)
    }

    return (
      <Card className="group hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="relative">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {product.discountPrice && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Save ${(product.price - product.discountPrice).toFixed(2)}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.discountPrice ? (
                <>
                  <span className="text-lg font-bold">${product.discountPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price}</span>
              )}
            </div>
            <Badge variant="outline">{product.brand}</Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            size="sm" 
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of quality products
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex border border-input rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-secondary p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
          <Button onClick={() => {
            setSearchTerm("")
            setSelectedCategory("All")
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}