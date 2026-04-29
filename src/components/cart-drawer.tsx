'use client'

import { useCart } from '@/lib/cart-context'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold uppercase tracking-tight">Your Bag</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">Your bag is currently empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-md bg-muted">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-medium leading-tight">{item.name}</h3>
                    <p className="text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-muted-foreground hover:text-destructive underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t space-y-4 bg-muted/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary font-medium uppercase tracking-tighter">Complimentary</span>
            </div>
            <button className="w-full h-12 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
