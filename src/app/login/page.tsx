'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2 } from 'lucide-react'
import { signIn } from '@/services/auth-service'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signIn(formData.email, formData.password)
      router.push('/')
      router.refresh() // To update the navbar state
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="w-full max-w-[400px] flex flex-col gap-8 border p-8 rounded-2xl bg-muted/10 shadow-sm">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
             <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground italic">Elevate your experience.</p>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-xs font-bold text-destructive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <Link href="#" className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary">Forgot?</Link>
            </div>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button 
            disabled={loading}
            className="h-10 mt-2 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-primary hover:underline uppercase tracking-tighter">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
