'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getUserOrders } from '@/services/order-service'
import { Package, Truck, Calendar, ChevronRight, ShoppingBag, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function OrdersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    async function loadOrders() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      try {
        const data = await getUserOrders(user.id)
        setOrders(data || [])
      } catch (err) {
        console.error("Error loading orders:", err)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [router])

  if (loading) {
    return (
      <div className="container px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Retrieving History...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl px-4 py-10 lg:py-20 space-y-10">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight uppercase italic">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6 border rounded-2xl bg-muted/10">
          <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20" />
          <div className="text-center">
            <p className="text-lg font-bold">No orders yet</p>
            <p className="text-sm text-muted-foreground">Your future style acquisitions will appear here.</p>
          </div>
          <Link 
            href="/shop" 
            className="h-10 px-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-2xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b bg-muted/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Date</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</p>
                    <p className="text-sm font-bold">${Number(order.total_amount).toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                    <div className="flex items-center gap-1.5">
                       <div className={`h-2 w-2 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-primary'}`} />
                       <span className="text-sm font-bold capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  ID: {order.id.slice(0, 8)}...
                </div>
              </div>

              <div className="p-6 space-y-6">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 overflow-hidden rounded-md bg-muted">
                      <Image src={item.products.images[0]} alt={item.products.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-bold">{item.products.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold">${Number(item.unit_price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-muted/10 border-t flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Truck className="h-4 w-4" />
                  {order.tracking_number ? `Track: ${order.tracking_number}` : 'Preparing for Shipment'}
                </div>
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
