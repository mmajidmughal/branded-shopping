import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingBag, Heart, ShieldCheck, Globe, Truck } from 'lucide-react'
import { getProductBySlug } from '@/services/product-service'
import { AddToCartButton } from '@/components/add-to-cart-button'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: PageProps) {
  let product;
  try {
    product = await getProductBySlug(params.slug)
  } catch (err) {
    notFound()
  }

  if (!product) {
    notFound()
  }

  const metadata = product.metadata as any;

  return (
    <div className="container px-4 md:px-6 py-10 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-muted border-2 border-primary">
                <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {(product.brands as any)?.name}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold mt-2">${Number(product.price).toLocaleString()}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />
            <button className="flex h-14 w-14 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              <Heart className="h-6 w-6" />
            </button>
          </div>

          {/* Digital Product Passport Section */}
          <div className="border rounded-xl p-6 bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Digital Product Passport</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase font-semibold">Origin</span>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{metadata?.origin}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase font-semibold">Verification ID</span>
                <span className="text-sm font-mono">{metadata?.passport_id}</span>
              </div>
              {metadata?.material && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Material</span>
                  <span className="text-sm font-medium">{metadata?.material}</span>
                </div>
              )}
               {metadata?.movement && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Movement</span>
                  <span className="text-sm font-medium">{metadata?.movement}</span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-8 py-4 border-t">
             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
               <Truck className="h-4 w-4" />
               Complimentary Shipping
             </div>
             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
               <ShieldCheck className="h-4 w-4" />
               Authenticity Guaranteed
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
