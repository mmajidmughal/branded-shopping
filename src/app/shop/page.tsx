'use client'

import React, { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import sampleData from '@/lib/sample-data.json'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredProducts = selectedCategory === 'All' 
    ? sampleData.products 
    : sampleData.products.filter(p => p.category_slug === selectedCategory.toLowerCase())

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
            {['All', 'Apparel', 'Accessories', 'Footwear'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition-colors whitespace-nowrap ${selectedCategory === cat ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                {cat}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((p) => (
            <ProductCard 
              key={p.slug}
              id={p.slug}
              name={p.name}
              slug={p.slug}
              price={p.price}
              brand={p.brand_slug.replace('-', ' ').toUpperCase()}
              imageUrl={p.images[0]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
