import { ProductCard } from './product-card'

interface ProductGridProps {
  products: any[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {products.map((p) => (
        <ProductCard 
          key={p.id}
          id={p.id}
          name={p.name}
          slug={p.slug}
          price={Number(p.price)}
          brand={p.brands?.name || 'BRANDED'}
          imageUrl={p.images[0]}
        />
      ))}
    </div>
  )
}
