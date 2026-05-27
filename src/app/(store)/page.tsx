import { ChevronLeft, ChevronRight, Ribbon, Truck, ShieldCheck, Award, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/banner mockup.jpg" 
            alt="Engine Parts Background" 
            className="w-full h-full object-cover"
          />
          {/* Orange/Rust Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#ff6600]/60 via-[#8b4513]/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black italic text-white drop-shadow-2xl leading-tight mb-8">
            DOMINATE THE STRIP<br />AND THE STREET.
          </h1>
          
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-3 bg-white/95 px-4 md:px-8 py-2 md:py-3 rounded-sm shadow-xl transform -rotate-1">
            <div className="bg-red-600 p-1 rounded-full">
              <Ribbon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-[#001b3a] font-black text-xs md:text-lg italic tracking-tight">
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
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h2 className="text-4xl md:text-5xl font-black italic text-black uppercase tracking-tighter">
            Categories
          </h2>
          
          {/* AI Part Finder Button */}
          <button className="flex items-center gap-2 bg-linear-to-r from-[#ff6600] to-[#ff9900] text-white px-6 py-3 font-bold rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1">
            <Sparkles className="w-5 h-5" />
            AI PART FINDER
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Carburetors */}
          <div className="group relative bg-[#001b3a] aspect-16/9 md:aspect-auto md:h-[300px] overflow-hidden cursor-pointer">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none">
                CARBURETORS
              </h3>
            </div>
            <img 
              src="/assets/CARBURETORS.jpg" 
              alt="Carburetors" 
              className="w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Turbochargers */}
          <div className="group relative bg-[#001b3a] aspect-16/9 md:aspect-auto md:h-[300px] overflow-hidden cursor-pointer">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none">
                TURBOCHARGERS
              </h3>
            </div>
            <img 
              src="/assets/TURBOCHARGERS.jpg" 
              alt="Turbochargers" 
              className="w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Superchargers */}
          <div className="group relative bg-[#001b3a] aspect-16/9 md:aspect-auto md:h-[300px] overflow-hidden cursor-pointer">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none">
                SUPERCHARGERS
              </h3>
            </div>
            <img 
              src="/assets/SUPERCHARGERS.jpg" 
              alt="Superchargers" 
              className="w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Intercoolers */}
          <div className="group relative bg-[#001b3a] aspect-16/9 md:aspect-auto md:h-[300px] overflow-hidden cursor-pointer">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none uppercase max-w-[250px]">
                INTERCOOLERS /<br />HEAT EXCHANGERS
              </h3>
            </div>
            <img 
              src="/assets/INTERCOOLERS.jpg" 
              alt="Intercoolers" 
              className="w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Trust Badges - Bottom Right of last grid item */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a]">
                <Truck className="w-3 h-3 text-red-600" />
                <span>FAST SHIPPING</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a]">
                <ShieldCheck className="w-3 h-3 text-red-600" />
                <span>SECURE CHECKOUT</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a]">
                <Award className="w-3 h-3 text-red-600" />
                <span>QUALITY GUARANTEED</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
