import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              addedAt: new Date().toISOString()
            }
            return {
              items: [...state.items, newItem]
            }
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.discountPrice || item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      getTax: () => {
        return get().getSubtotal() * 0.08 // 8% tax
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > 50 ? 0 : 5.99 // Free shipping over $50
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping()
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)