'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Database } from '@/types/supabase'
import { useCart } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'

type Product = Database['public']['Tables']['products']['Row']

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block aspect-square relative overflow-hidden bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="hover:text-indigo-600 transition-colors">
          <h3 className="font-semibold text-lg line-clamp-1 text-gray-900">{product.name}</h3>
        </Link>
        <p className="text-gray-700 text-sm line-clamp-2 mt-1 mb-4">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">${(product.price_cents / 100).toFixed(2)}</span>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price_cents: product.price_cents,
              image_url: product.image_url ?? undefined
            })}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}