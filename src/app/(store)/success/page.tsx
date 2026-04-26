'use client'

import { useEffect } from 'react'
import { useCart } from '@/store/cart'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="py-20 text-center space-y-6">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
      <p className="text-xl text-gray-500 max-w-md mx-auto">
        Thank you for your purchase. Your order is being processed and will be shipped soon.
      </p>
      <div className="pt-8">
        <Link
          href="/"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}