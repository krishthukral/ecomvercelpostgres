'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Database } from '@/types/supabase'
import { useCart } from '@/store/cart'
import { ShoppingCart, Plus } from 'lucide-react'

type Product = Database['public']['Tables']['products']['Row']

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)

  return (
    <div className="bg-[#001329] border border-white/5 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block aspect-square relative overflow-hidden bg-black/20 p-4">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600 italic font-bold">NO IMAGE</div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-[#ff6600] transition-colors">
            <h3 className="font-black italic text-lg uppercase tracking-tight text-white line-clamp-1">{product.name}</h3>
          </Link>
        </div>
        
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest line-clamp-2 mb-4 h-8">
          {product.description || 'Professional Grade Performance Part'}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#ff6600] font-black italic uppercase leading-none">Price</span>
            <span className="font-black italic text-2xl text-white tracking-tighter">
              ${(product.price_cents / 100).toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price_cents: product.price_cents,
              image_url: product.image_url ?? undefined
            })}
            className="bg-[#ff6600] text-white p-3 rounded-none hover:bg-[#e65c00] transition-all transform active:scale-95 shadow-lg flex items-center gap-2 group/btn"
          >
            <Plus className="w-5 h-5 font-bold" />
            <span className="font-black italic text-xs uppercase tracking-widest">Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
