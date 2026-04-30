'use client'

import React, { useState, useEffect } from 'react'
import { ProductCard } from '@/components/product-card'
import { getProducts, getCategories } from '@/services/product-service'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Failed to load shop data:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.categories?.name === selectedCategory)

  if (loading) {
    return (
      <div className="container px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Initializing Collection...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight uppercase">The Collection</h1>
          <p className="text-muted-foreground">Browse our complete range of heritage branded items.</p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-y py-4 gap-4">
          <div className="flex items-center gap-6 text-sm font-medium overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`transition-colors whitespace-nowrap ${selectedCategory === 'All' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`transition-colors whitespace-nowrap ${selectedCategory === cat.name ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors w-full sm:w-auto justify-center">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors w-full sm:w-auto justify-center">
              Sort
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
           <p className="text-xs text-muted-foreground uppercase tracking-widest">Showing {filteredProducts.length} Results</p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
s-4 gap-x-8 gap-y-12">
          {filteredProducts.map((p) => (
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
      </div>
    </div>
  )
}
