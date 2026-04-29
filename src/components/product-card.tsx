'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  brand: string
  imageUrl: string
}

export function ProductCard({ id, name, slug, price, brand, imageUrl }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col gap-4">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button 
            onClick={() => addItem({ id, name, price, imageUrl, quantity: 1 })}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{brand}</p>
        <Link href={`/product/${slug}`} className="hover:underline">
          <h3 className="text-sm font-medium leading-tight">{name}</h3>
        </Link>
        <p className="text-sm font-bold mt-1">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  )
}
