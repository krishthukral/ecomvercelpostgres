'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/store/cart'
import { useEffect, useState } from 'react'

export default function Header() {
  const totalItems = useCart((state) => state.totalItems())
  const [mounted, setMounted] = useState(false)

  // Ensure hydration match
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          E-Shop
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-6 h-6" />
          </Link>
        </nav>
      </div>
    </header>
  )
}