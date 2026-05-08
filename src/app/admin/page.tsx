import { createClient } from '@/lib/supabase/server'
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch some stats
  const { data: products } = await supabase.from('products').select('id')
  const { data: orders } = await supabase.from('orders').select('total_cents, status')

  const totalRevenue = (orders as any[])?.reduce((sum, order) => sum + order.total_cents, 0) || 0
  const totalOrders = orders?.length || 0
  const totalProducts = products?.length || 0
  const pendingOrders = (orders as any[])?.filter(o => o.status === 'pending').length || 0

  const stats = [
    { label: 'Total Revenue', value: `$${(totalRevenue / 100).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-amber-500' },
    { label: 'Pending Orders', value: pendingOrders, icon: TrendingUp, color: 'bg-rose-500' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-lg">System Status</h3>
        </div>
        <div className="p-6">
          <p className="text-slate-600 dark:text-slate-400">
            Welcome to the Admin Portal. From here you can manage your inventory, track incoming orders, and view customer information.
          </p>
          <div className="mt-6 flex gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900 flex-1">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Quick Tip</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Make sure to check your Stripe dashboard for detailed payment analytics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
