import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import { Database } from '@/types/supabase'
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Award, Sparkles } from 'lucide-react'

type Product = Database['public']['Tables']['products']['Row']

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) {
    console.error('Error fetching products:', error)
  }

  const typedProducts = (products as Product[]) || []

  const categories = [
    { name: 'CARBURETORS', img: '/assets/CARBURETORS.jpg' },
    { name: 'TURBOCHARGERS', img: '/assets/TURBOCHARGERS.jpg' },
    { name: 'SUPERCHARGERS', img: '/assets/SUPERCHARGERS.jpg' },
    { name: 'INTERCOOLERS / HEAT EXCHANGERS', img: '/assets/INTERCOOLERS.jpg' },
  ]

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#001b3a]">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="/assets/banner mockup.jpg" 
          alt="Engine Parts Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#ff6600]/20 via-[#8b4513]/10 to-transparent mix-blend-multiply z-1" />

        {/* Carousel Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronLeft className="w-12 h-12" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronRight className="w-12 h-12" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="w-full bg-[#001b3a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <h2 className="text-4xl md:text-5xl font-black italic text-slate-100 uppercase tracking-tighter">
              CATEGORIES
            </h2>
            
            <button className="flex items-center gap-2 bg-linear-to-r from-[#ff6600] to-[#ff9900] text-white px-6 py-3 font-bold rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1">
              <Sparkles className="w-5 h-5" />
              AI PART FINDER
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="group relative bg-[#001329] overflow-hidden cursor-pointer border border-white/5 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-video flex items-center justify-center p-4">
                  <img 
                    src={category.img} 
                    alt={category.name} 
                    className="w-full h-full object-contain opacity-95 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full bg-[#001329] py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <h2 className="text-4xl md:text-5xl font-black italic text-slate-100 uppercase tracking-tighter">
              Featured Parts
            </h2>
            <Link href="/catalogue" className="text-[#ff6600] font-black italic uppercase tracking-widest text-sm hover:underline">
              View All Catalogue &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {typedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {typedProducts.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500 font-bold italic uppercase tracking-widest">
                Inventory Loading... Check back soon for performance parts.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges Footer Row */}
      <div className="bg-[#001329] border-t border-white/10 py-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-20">
          <div className="flex items-center gap-4">
            <div className="bg-[#ff6600] p-3 rounded-full shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black italic text-base text-white leading-none uppercase">Fast Shipping</p>
              <p className="text-xs text-gray-400 uppercase font-bold mt-1">Orders over $99</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#ff6600] p-3 rounded-full shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black italic text-base text-white leading-none uppercase">Secure Checkout</p>
              <p className="text-xs text-gray-400 uppercase font-bold mt-1">SSL Encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#ff6600] p-3 rounded-full shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black italic text-base text-white leading-none uppercase">Quality Guaranteed</p>
              <p className="text-xs text-gray-400 uppercase font-bold mt-1">100% Genuine Parts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
