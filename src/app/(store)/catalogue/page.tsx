import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import { Database } from '@/types/supabase'
import Header from '@/components/Header'

type Product = Database['public']['Tables']['products']['Row']

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('products').select('*')

  if (category) {
    query = query.eq('category', category)
  }

  const { data: products, error } = await query.order('name', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
  }

  const typedProducts = (products as Product[]) || []

  return (
    <div className="min-h-screen bg-[#001b3a]">
      <section className="bg-[#001329] py-12 border-b border-white/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
            {category || 'Full Catalogue'}
          </h1>
          <p className="text-[#ff6600] font-bold italic uppercase tracking-widest mt-2">
            Professional Grade Performance Parts
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {typedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {typedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-bold italic uppercase tracking-widest">
            No parts found in this category.
          </div>
        )}
      </main>
    </div>
  )
}
