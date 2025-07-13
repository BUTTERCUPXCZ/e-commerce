import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ShopFlow</h3>
            <p className="text-sm text-muted-foreground">
              Your premier destination for quality products at unbeatable prices. 
              Shop with confidence and discover amazing deals every day.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary">Careers</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-primary">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="/shipping" className="text-muted-foreground hover:text-primary">Shipping Info</a></li>
              <li><a href="/returns" className="text-muted-foreground hover:text-primary">Returns</a></li>
              <li><a href="/track" className="text-muted-foreground hover:text-primary">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ShopFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}