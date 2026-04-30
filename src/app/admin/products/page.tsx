'use client'

import React, { useEffect, useState } from 'react'
import { getProducts } from '@/services/product-service'
import { Plus, MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error("Failed to load admin products:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-sm font-bold uppercase tracking-widest animate-pulse">Loading Inventory...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your luxury catalog and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="border rounded-xl bg-background shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Brand</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Price</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Stock</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-muted-foreground italic">
                  No products found. Start by adding your first luxury item.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded bg-muted">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{p.categories?.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{p.brands?.name}</td>
                  <td className="p-4 text-sm font-bold">${Number(p.price).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock_quantity < 5 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                      {p.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/product/${p.slug}`} target="_blank" className="p-2 hover:bg-muted rounded-md transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors text-primary">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
