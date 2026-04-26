import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Database } from '@/types/supabase'

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    products: Database['public']['Tables']['products']['Row'] | null
  })[]
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: ordersData } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const orders = (ordersData as unknown as Order[]) || []

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border text-center text-gray-500">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-xs">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold text-lg">${(order.total_cents / 100).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="divide-y">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                          Qty: {item.quantity}
                        </div>
                        <div>
                          <p className="font-medium">{item.products?.name || 'Product'}</p>
                          <p className="text-sm text-gray-500">${(item.price_cents / 100).toFixed(2)} each</p>
                        </div>
                      </div>
                      <p className="font-semibold">${((item.price_cents * item.quantity) / 100).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}