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
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500 text-xl font-medium">
            No image available
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-4">
            ${(product.price_cents / 100).toFixed(2)}
          </p>
        </div>

        <div className="max-w-none text-foreground/90 leading-relaxed text-xl font-medium">
          <p>{product.description}</p>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-lg text-foreground mb-6 flex flex-col gap-1">
            <span className="font-bold">Availability:</span>
            <span className={product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400 font-black' : 'text-red-600 dark:text-red-400 font-black'}>
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </span>
          </p>
          <AddToCartButton product={product} disabled={product.stock <= 0} />
        </div>
      </div>
    </div>
  )
}