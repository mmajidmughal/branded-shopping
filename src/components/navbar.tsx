'use client'

import Link from 'next/link'
import { ShoppingBag, Search, User, Menu } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function Navbar() {
  const { totalItems, setIsOpen } = useCart()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Menu className="h-6 w-6" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            BRANDED <span className="text-primary">SHOPPING</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-9 w-64 rounded-md border border-input bg-transparent pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button onClick={() => setIsOpen(true)} className="relative">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <Link href="/login">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
