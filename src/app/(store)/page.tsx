import { ChevronLeft, ChevronRight, Ribbon, Truck, ShieldCheck, Award, Sparkles } from 'lucide-react'

export default function HomePage() {
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
        {/* Background Image */}
        <img 
          src="/assets/banner mockup.jpg" 
          alt="Engine Parts Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />
        
        {/* Orange/Rust Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#ff6600]/40 via-[#8b4513]/20 to-transparent mix-blend-multiply z-1" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black italic text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight mb-8">
            DOMINATE THE STRIP<br />AND THE STREET.
          </h1>
          
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-3 bg-white/95 px-4 md:px-8 py-2 md:py-3 rounded-sm shadow-xl transform -rotate-1">
            <div className="bg-red-600 p-1 rounded-full">
              <Ribbon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-[#001b3a] font-black text-xs md:text-lg italic tracking-tight uppercase">
              USE CODE: <span className="text-red-600">PERFORMANCE15</span> FOR 15% OFF ALL PARTS SITE-WIDE
            </p>
          </div>
        </div>

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
            
            {/* AI Part Finder Button */}
            <button className="flex items-center gap-2 bg-linear-to-r from-[#ff6600] to-[#ff9900] text-white px-6 py-3 font-bold rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1">
              <Sparkles className="w-5 h-5" />
              AI PART FINDER
            </button>
          </div>

          {/* Categories Grid - 2x2 Layout, Focus on Full Image Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="group relative bg-[#001329] overflow-hidden cursor-pointer border border-white/5 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image - Changed to object-contain and removed overlay text */}
                <div className="relative aspect-video flex items-center justify-center p-4">
                  <img 
                    src={category.img} 
                    alt={category.name} 
                    className="w-full h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                
                {/* Trust Badges Overlay removed for clarity, or kept minimal if necessary */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Footer Row - Keeps information clear without cluttering images */}
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
