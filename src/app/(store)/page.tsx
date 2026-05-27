import { ChevronLeft, ChevronRight, Ribbon, Truck, ShieldCheck, Award, Sparkles } from 'lucide-react'

export default function HomePage() {
  const categories = [
    { name: 'CARBURETORS', img: '/assets/CARBURETORS.jpg' },
    { name: 'TURBOCHARGERS', img: '/assets/TURBOCHARGERS.jpg' },
    { name: 'SUPERCHARGERS', img: '/assets/SUPERCHARGERS.jpg' },
    { name: 'INTERCOOLERS / HEAT EXCHANGERS', img: '/assets/INTERCOOLERS.jpg' },
    { name: 'FORCED INDUCTION', img: '/assets/FORCED INDUCTION.jpg' },
    { name: 'ENGINE MANAGEMENT', img: '/assets/ENGINE MANAGEMENT.jpg' },
    { name: 'EFI COMPONENTS', img: '/assets/EFI COMPONENTS.jpg' },
    { name: 'FUELING', img: '/assets/FUELING.jpg' },
    { name: 'FUEL PUMPS', img: '/assets/FUELP PUMPS.jpg' },
    { name: 'IGNITION', img: '/assets/IGNITION.jpg' },
    { name: 'TANKS', img: '/assets/TANKS.jpg' },
    { name: 'REGULATORS', img: '/assets/REGULATORS.jpg' },
    { name: 'AN FITTINGS', img: '/assets/AN FITTINGS.jpg' },
    { name: 'AN HOSE', img: '/assets/AN HOSE.jpg' },
    { name: 'AN TUBING', img: '/assets/AN TUBING.jpg' },
    { name: 'PLUMBING', img: '/assets/plumbing.jpg' },
  ]

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
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-black italic text-black uppercase tracking-tighter">
            Categories
          </h2>
          
          {/* AI Part Finder Button */}
          <button className="flex items-center gap-2 bg-linear-to-r from-[#ff6600] to-[#ff9900] text-white px-6 py-3 font-bold rounded-full shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1">
            <Sparkles className="w-5 h-5" />
            AI PART FINDER
          </button>
        </div>

        {/* Categories Grid - Optimized for all 16 assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group relative bg-[#001b3a] aspect-square overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-xl md:text-2xl font-black italic text-white leading-none uppercase max-w-[180px] drop-shadow-md">
                  {category.name}
                </h3>
              </div>
              <img 
                src={category.img} 
                alt={category.name} 
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              
              {/* Only show trust badges on the last item in a specific way or in footer */}
              {index === categories.length - 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 scale-75 origin-bottom-right md:scale-90">
                  <div className="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a] shadow-sm">
                    <Truck className="w-3 h-3 text-red-600" />
                    <span>FAST SHIPPING</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a] shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-red-600" />
                    <span>SECURE CHECKOUT</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-sm text-[10px] font-bold text-[#001b3a] shadow-sm">
                    <Award className="w-3 h-3 text-red-600" />
                    <span>QUALITY GUARANTEED</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges Footer Row (Optional, for better mobile visibility) */}
      <div className="bg-[#f8f8f8] border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="bg-[#001b3a] p-2 rounded-full">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black italic text-xs leading-none uppercase">Fast Shipping</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Orders over $99</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#001b3a] p-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black italic text-xs leading-none uppercase">Secure Checkout</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">SSL Encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#001b3a] p-2 rounded-full">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black italic text-xs leading-none uppercase">Quality Guaranteed</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">100% Genuine Parts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
