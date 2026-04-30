'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.images[0],
      quantity: 1
    })
  }

  return (
    <button 
      onClick={handleAddToBag}
      className="flex-1 flex h-14 items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium shadow transition-colors hover:bg-primary/90"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Bag
    </button>
  )
}
