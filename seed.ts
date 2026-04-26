import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // We need the service role key for seeding if RLS is strict

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars. Please provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleProducts = [
  {
    name: 'Classic White T-Shirt',
    description: 'A comfortable and stylish white t-shirt made from 100% organic cotton.',
    price_cents: 2500,
    stock: 50,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Denim Jacket',
    description: 'Classic blue denim jacket, perfect for layering in any season.',
    price_cents: 8500,
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Leather Boots',
    description: 'Durable and stylish leather boots for your outdoor adventures.',
    price_cents: 12000,
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1520639889313-7272a74744ae?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Canvas Backpack',
    description: 'A spacious and rugged canvas backpack for everyday use.',
    price_cents: 6500,
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
  },
]

async function seed() {
  console.log('Seeding products...')
  const { data, error } = await supabase.from('products').insert(sampleProducts).select()

  if (error) {
    console.error('Error seeding products:', error)
  } else {
    console.log('Successfully seeded products:', data.length)
  }
}

seed()
