import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="font-bold tracking-tighter text-lg uppercase">
            Admin <span className="text-primary">Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
            { icon: Package, label: 'Products', href: '/admin/products' },
            { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
            { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
            { icon: Settings, label: 'Settings', href: '/admin/settings' },
          ].map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
           <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
             <LogOut className="h-4 w-4" />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="h-16 border-b bg-background px-8 flex items-center justify-between">
           <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">System Status: Optimal</h2>
           <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                 <span className="text-xs font-bold">MM</span>
              </div>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
