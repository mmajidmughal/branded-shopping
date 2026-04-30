'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Search, User, Menu, LogOut, LayoutDashboard } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { supabase } from '@/lib/supabase'
import { signOut } from '@/services/auth-service'

export function Navbar() {
  const router = useRouter()
  const { totalItems, setIsOpen } = useCart()
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await signOut()
    setShowUserMenu(false)
    router.push('/')
    router.refresh()
  }

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
          
          <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase"
              >
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in duration-200">
                  <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium border-b mb-1 truncate">
                    {user.email}
                  </p>
                  <Link 
                    href="/profile" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium hover:bg-muted rounded-sm transition-colors"
                  >
                    <User className="h-3.5 w-3.5" />
                    My Profile
                  </Link>
                  <Link 
                    href="/orders" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium hover:bg-muted rounded-sm transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    My Orders
                  </Link>
                  <Link 
                    href="/admin" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium hover:bg-muted rounded-sm transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Admin Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-sm transition-colors text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="p-2 hover:bg-muted rounded-full transition-colors">
              <User className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
