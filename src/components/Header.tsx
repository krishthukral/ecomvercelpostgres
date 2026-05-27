'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#001b3a] text-white w-full z-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none">
              CONSOLIDATED
            </span>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter leading-none text-[#ff6600]">
              PERFORMANCE
            </span>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden lg:flex flex-col items-end gap-1">
            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-6">
                <Link href="/catalogue" className="text-sm font-bold tracking-widest hover:text-[#ff6600] transition-colors">
                  CATALOGUE
                </Link>
                <a href="tel:1111111111" className="text-sm font-bold tracking-widest hover:text-[#ff6600] transition-colors">
                  (111)111-1111
                </a>
              </nav>

              {/* Search Bar & Contact Link */}
              <div className="flex flex-col items-start gap-1">
                <Link href="/contact" className="text-[10px] text-gray-400 hover:text-white transition-colors">
                  (Contact)
                </Link>
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for parts..."
                      className="bg-[#2a2a2a] text-white px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#ff6600] text-sm"
                    />
                  </div>
                  <button className="bg-[#ff6600] text-white px-6 py-2 font-bold text-sm hover:bg-[#e65c00] transition-colors">
                    SEARCH
                  </button>
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4 ml-2">
                <Link href="/cart" className="hover:text-[#ff6600] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <Link href="/login" className="hover:text-[#ff6600] transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
            <Link href="/catalogue" className="font-bold">CATALOGUE</Link>
            <a href="tel:1111111111" className="font-bold">(111)111-1111</a>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#2a2a2a] text-white px-4 py-2 w-full focus:outline-none"
              />
              <button className="bg-[#ff6600] text-white px-6 py-2 font-bold w-full">
                SEARCH
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
