import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { ProductGrid } from '@/components/product-grid'
import { getFeaturedProducts } from '@/services/product-service'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getFeaturedProducts(4)

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50 backdrop-blur">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>AI-Powered Personal Styling Now Live</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-[800px]">
              Elevate Your Style with <span className="text-primary">Precision</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              Discover curated luxury collections from the world's most exclusive brands, 
              tailored to your unique taste by our intelligent stylist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/shop" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Shop the Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/ai-stylist" 
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Try AI Stylist
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-black">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/10 opacity-50 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] translate-x-[30%] -translate-y-[20%] rounded-full bg-primary/10 opacity-50 blur-[80px]"></div>
        </div>
      </section>

      {/* Featured Brands Banner */}
      <section className="container px-4 md:px-6">
        <div className="border-y py-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Featured Heritage Brands
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale transition-all hover:grayscale-0">
            <span className="text-2xl font-bold italic">AURA</span>
            <span className="text-2xl font-bold tracking-[0.2em]">VERTEX</span>
            <span className="text-2xl font-bold">CHRONOS</span>
            <span className="text-2xl font-bold font-serif">HERITAGE</span>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Curated Selection</h2>
            <p className="text-muted-foreground">Chosen by our AI to match your emerging style profile.</p>
          </div>
          <Link href="/shop" className="group flex items-center text-sm font-medium hover:text-primary transition-colors">
            View All Products
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <ProductGrid products={products} />
      </section>
    </div>
  )
}
