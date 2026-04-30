import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="container flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="w-full max-w-[400px] flex flex-col gap-8 border p-8 rounded-2xl bg-muted/10 shadow-sm">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
             <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Join the Circle</h1>
          <p className="text-sm text-muted-foreground italic">Start your style journey.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
            <input 
              type="text" 
              placeholder="Majid Mughal"
              className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button className="h-10 mt-2 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
            Create Account
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:underline uppercase tracking-tighter">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
