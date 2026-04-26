import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gray-900">
          Welcome to <span className="text-indigo-600">E-Shop</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Discover our curated collection of premium products, delivered straight to your door.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {(!products || products.length === 0) && (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found. Add some in your Supabase dashboard!
          </div>
        )}
      </div>
    </div>
  )
}