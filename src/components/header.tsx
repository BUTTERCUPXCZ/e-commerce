import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartDrawer } from "@/components/cart-drawer"
import { useCartStore } from "@/stores/cart"

interface HeaderProps {
  navigate: (path: string) => void
}

export function Header({ navigate }: HeaderProps) {
  const { getItemCount, isOpen, toggleCart } = useCartStore()
  const itemCount = getItemCount()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer" 
              onClick={() => navigate('/')}
            >
              ShopFlow
            </h1>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </a>
            <a 
              href="/products" 
              onClick={(e) => handleLinkClick(e, '/products')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Products
            </a>
            <a 
              href="/categories" 
              onClick={(e) => handleLinkClick(e, '/categories')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a 
              href="/deals" 
              onClick={(e) => handleLinkClick(e, '/deals')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Deals
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isOpen} onClose={toggleCart} />
    </>
  )
}