import { TrendingUp, Users, DollarSign, Package } from 'lucide-react'

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Majid. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
          { label: 'Total Customers', value: '2,350', change: '+180.1%', icon: Users },
          { label: 'Active Orders', value: '12', change: '+19%', icon: Package },
          { label: 'Growth Rate', value: '24.5%', change: '+4%', icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="border p-6 rounded-xl bg-background shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className="text-xs font-bold text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border rounded-xl bg-background shadow-sm p-6">
          <h3 className="font-bold mb-4 uppercase text-sm tracking-widest">Recent Sales</h3>
          <div className="space-y-4">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">JD</div>
                     <div>
                        <p className="text-sm font-bold">John Doe</p>
                        <p className="text-[10px] text-muted-foreground uppercase">john@example.com</p>
                     </div>
                  </div>
                  <p className="text-sm font-bold">+$1,299.00</p>
               </div>
             ))}
          </div>
        </div>
        <div className="border rounded-xl bg-background shadow-sm p-6">
          <h3 className="font-bold mb-4 uppercase text-sm tracking-widest">Stock Alerts</h3>
          <div className="space-y-4">
             <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-500">
                Onyx Diver Watch - Low Stock (2 left)
             </div>
             <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-xs font-bold text-orange-500">
                Midnight Wool Overcoat - Low Stock (5 left)
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
