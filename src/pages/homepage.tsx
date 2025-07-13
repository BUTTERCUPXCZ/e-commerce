import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/cart"
import { useFeaturedProducts } from "@/hooks/useProducts"
import type { Product } from "@/types"

export function Homepage() {
  const { addItem } = useCartStore()
  const { data: featuredData, isLoading, error } = useFeaturedProducts()

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  const LoadingCard = () => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-muted rounded-t-lg animate-pulse" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-4 bg-muted rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full h-9 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Shop the latest trends and find everything you need at unbeatable prices. 
            Quality products, fast shipping, and excellent customer service guaranteed.
          </p>
          <div className="space-x-4">
            <Button size="lg">Shop Now</Button>
            <Button variant="outline" size="lg">Browse Categories</Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Discover our most popular items</p>
        </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">Failed to load featured products</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading && 
            Array.from({ length: 4 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          }

          {featuredData?.data.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.discountPrice && (
                    <Badge 
                      variant="destructive"
                      className="absolute top-2 left-2"
                    >
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </Badge>
                  )}
                  {!product.discountPrice && (
                    <Badge 
                      variant="default"
                      className="absolute top-2 left-2"
                    >
                      New
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
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
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop" },
              { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop" },
              { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop" },
              { name: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
            ].map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-center">{category.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}