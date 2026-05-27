import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars. Please provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleProducts = [
  // CARBURETORS
  {
    name: 'Dominator 1050 CFM Carburetor',
    description: 'High-performance 4-barrel carburetor for drag racing and extreme street performance.',
    price_cents: 84900,
    stock: 12,
    category: 'CARBURETORS',
    image_url: '/assets/CARBURETORS.jpg',
  },
  {
    name: 'Street Avenger 600 CFM',
    description: 'Perfect for street rods and muscle cars, features vacuum secondaries for smooth operation.',
    price_cents: 45900,
    stock: 25,
    category: 'CARBURETORS',
    image_url: '/assets/CARBURETORS.jpg',
  },
  {
    name: 'Double Pumper 750 CFM',
    description: 'Mechanical secondaries for instant throttle response. Ideal for modified engines.',
    price_cents: 58900,
    stock: 18,
    category: 'CARBURETORS',
    image_url: '/assets/CARBURETORS.jpg',
  },
  {
    name: 'Ultra XP 850 CFM',
    description: 'Race-ready aluminum carburetor with adjustable air bleeds and high-flow boosters.',
    price_cents: 92900,
    stock: 8,
    category: 'CARBURETORS',
    image_url: '/assets/CARBURETORS.jpg',
  },
  // TURBOCHARGERS
  {
    name: 'GT45 Stage 3 Turbo',
    description: 'T4 flange, .66 A/R compressor, 1.05 A/R turbine. Supports up to 800HP.',
    price_cents: 125000,
    stock: 5,
    category: 'TURBOCHARGERS',
    image_url: '/assets/TURBOCHARGERS.jpg',
  },
  {
    name: 'S366 SX-E Super Core',
    description: 'Forged milled wheel, 360 degree thrust bearing. High efficiency for mid-range boost.',
    price_cents: 89900,
    stock: 10,
    category: 'TURBOCHARGERS',
    image_url: '/assets/TURBOCHARGERS.jpg',
  },
  // SUPERCHARGERS
  {
    name: 'Roots Style 6-71 Blower',
    description: 'The classic muscle car look. High-torque output from low RPM. Polished finish.',
    price_cents: 349900,
    stock: 3,
    category: 'SUPERCHARGERS',
    image_url: '/assets/SUPERCHARGERS.jpg',
  },
  {
    name: 'Centrifugal SC-V3',
    description: 'Internal belt drive system, quiet operation, massive top-end power gains.',
    price_cents: 275000,
    stock: 7,
    category: 'SUPERCHARGERS',
    image_url: '/assets/SUPERCHARGERS.jpg',
  },
  // INTERCOOLERS
  {
    name: 'Vertical Flow Front Mount',
    description: '3" core, bar and plate design for maximum heat dissipation. 2.5" inlets.',
    price_cents: 32900,
    stock: 15,
    category: 'INTERCOOLERS / HEAT EXCHANGERS',
    image_url: '/assets/INTERCOOLERS.jpg',
  },
  {
    name: 'Liquid-to-Air Heat Exchanger',
    description: 'Compact design for tight engine bays. High thermal conductivity core.',
    price_cents: 48900,
    stock: 9,
    category: 'INTERCOOLERS / HEAT EXCHANGERS',
    image_url: '/assets/INTERCOOLERS.jpg',
  },
]

async function seed() {
  console.log('Clearing old products...')
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('Seeding performance products...')
  const { data, error } = await supabase.from('products').insert(sampleProducts).select()

  if (error) {
    console.error('Error seeding products:', error)
  } else {
    console.log('Successfully seeded products:', data?.length)
  }
}

seed()
