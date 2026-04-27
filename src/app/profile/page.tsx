import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, User as UserIcon, Calendar, ArrowLeft, ExternalLink } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch orders for this user
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          image_url
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/" 
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-foreground">My Account</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground truncate w-full max-w-[200px]">
                  {user.email?.split('@')[0]}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="pt-4 w-full">
                <form action="/auth/signout" method="post">
                  <button className="w-full py-2 px-4 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-50 transition-colors text-sm font-semibold">
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <h3 className="font-bold mb-2">Need help?</h3>
            <p className="text-blue-100 text-sm mb-4">Questions about your order? Our support team is here to help.</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" /> Order History
            </h2>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600">
              {orders?.length || 0} Orders
            </span>
          </div>

          {!orders || orders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No orders found yet.</p>
              <Link 
                href="/" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Date</p>
                        <p className="text-sm font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-mono font-medium truncate max-w-[120px]">#{order.id.split('-')[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total</p>
                      <p className="text-sm font-bold text-blue-600">${(order.total_cents / 100).toFixed(2)}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                          {item.products?.image_url ? (
                            <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold truncate">{item.products?.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity} × ${(item.price_cents / 100).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
