import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/stores/cart"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getSubtotal,
    getTax,
    getShipping,
    getTotal
  } = useCartStore()

  if (!isOpen) return null

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="ml-auto w-full max-w-md bg-background shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to get started</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.discountPrice || item.product.price)}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive ml-auto"
                              onClick={() => removeItem(item.productId)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Clear Cart Button */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </div>

          {/* Footer - Order Summary */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{getShipping() === 0 ? 'Free' : formatPrice(getShipping())}</span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}