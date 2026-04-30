'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCategories, createProduct } from '@/services/product-service'
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock_quantity: '10',
    category_id: '',
    image_url: '',
    origin: 'Italy',
    material: '',
    passport_id: ''
  })

  useEffect(() => {
    async function load() {
      const cats = await getCategories()
      setCategories(cats)
      if (cats.length > 0) setFormData(prev => ({ ...prev, category_id: cats[0].id }))
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productToCreate = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-'),
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category_id: formData.category_id,
        images: [formData.image_url],
        metadata: {
          origin: formData.origin,
          material: formData.material,
          passport_id: formData.passport_id || `BS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }
      }

      await createProduct(productToCreate)
      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      console.error("Error creating product:", err)
      alert("Failed to create product. Check console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Luxury Product</h1>
          <p className="text-muted-foreground">Add a new item to your heritage collection.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Basic Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-xl p-6 bg-background shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              General Information
            </h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Name</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Midnight Wool Overcoat"
                className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the craftsmanship and style..."
                className="w-full p-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price ($)</label>
                <input 
                  required
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Inventory</label>
                <input 
                  type="number"
                  value={formData.stock_quantity}
                  onChange={e => setFormData({...formData, stock_quantity: e.target.value})}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-6 bg-background shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Media
            </h2>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
              <input 
                required
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://images.unsplash.com/..."
                className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Organization & Passport */}
        <div className="space-y-6">
          <div className="border rounded-xl p-6 bg-background shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">Organization</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
              <select 
                value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="border rounded-xl p-6 bg-primary text-primary-foreground shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">Digital Passport</h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-70">Origin</label>
              <input 
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
                className="w-full h-9 px-3 rounded-md border border-white/20 bg-white/10 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-70">Material</label>
              <input 
                value={formData.material}
                onChange={e => setFormData({...formData, material: e.target.value})}
                placeholder="e.g. 100% Cashmere"
                className="w-full h-9 px-3 rounded-md border border-white/20 bg-white/10 text-sm focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-md bg-primary text-primary-foreground font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Creating...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
