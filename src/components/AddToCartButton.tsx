'use client'

import { useCart } from '@/store/cart'
import { Database } from '@/types/supabase'
import { ShoppingCart } from 'lucide-react'

type Product = Database['public']['Tables']['products']['Row']

export default function AddToCartButton({ product, disabled }: { product: Product, disabled?: boolean }) {
  const addItem = useCart((state) => state.addItem)

  return (
    <button
      onClick={() => addItem({
        id: product.id,
        name: product.name,
        price_cents: product.price_cents,
        image_url: product.image_url ?? undefined
      })}
      disabled={disabled}
      className="w-full bg-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-6 h-6" />
      {disabled ? 'Out of Stock' : 'Add to Cart'}
    </button>
  )
}