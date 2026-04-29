import { ProductCard } from './product-card'
import sampleData from '@/lib/sample-data.json'

export function ProductGrid() {
  // Mapping the sample data to the ProductCard props
  // In a real app, this would fetch from Supabase
  const products = sampleData.products.map(p => ({
    id: p.slug, // using slug as temporary ID
    name: p.name,
    slug: p.slug,
    price: p.price,
    brand: p.brand_slug.replace('-', ' ').toUpperCase(),
    imageUrl: p.images[0]
  }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
