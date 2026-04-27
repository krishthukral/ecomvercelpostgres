import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import { Database } from '@/types/supabase'

type Product = Database['public']['Tables']['products']['Row']

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  const typedProducts = (products as Product[]) || []

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
          Welcome to <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">E-Shop</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Discover our curated collection of premium products, delivered straight to your door.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {typedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {typedProducts.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No products found. Add some in your Supabase dashboard!
          </div>
        )}
      </div>
    </div>
  )
}