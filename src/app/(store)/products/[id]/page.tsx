import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import { Database } from '@/types/supabase'

type Product = Database['public']['Tables']['products']['Row']

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: productData } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!productData) {
    notFound()
  }

  const product = productData as Product

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100 border">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xl">
            No image available
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-indigo-700 mt-2">
            ${(product.price_cents / 100).toFixed(2)}
          </p>
        </div>

        <div className="prose prose-indigo text-gray-800">
          <p>{product.description}</p>
        </div>

        <div className="pt-6 border-t">
          <p className="text-sm text-gray-700 mb-4">
            Stock: <span className={product.stock > 0 ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </p>
          <AddToCartButton product={product} disabled={product.stock <= 0} />
        </div>
      </div>
    </div>
  )
}