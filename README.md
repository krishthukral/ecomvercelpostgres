# Modern E-Shop (Next.js 15 + Supabase + Stripe)

A fully functional, high-performance e-commerce prototype built with the modern web stack.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Database & Auth:** Supabase (Postgres)
- **State Management:** Zustand (Client-side cart with persistence)
- **Payments:** Stripe (Checkout + Webhooks)
- **Icons:** Lucide React

## Getting Started

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://duhkdxkepjsojuoprlfu.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Initialize the Database

Run the SQL found in `supabase_schema.sql` in your Supabase SQL Editor. This will:
- Create `products`, `orders`, and `order_items` tables.
- Set up Row Level Security (RLS) policies.
- Create the `decrement_stock` function for order fulfillment.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `src/app/(store)` - Core shopping routes (Home, Product Details, Cart, Success)
- `src/app/(auth)` - Authentication routes
- `src/app/dashboard` - User order history
- `src/app/api` - Stripe Checkout and Webhook endpoints
- `src/components` - Reusable UI components
- `src/lib/supabase` - Supabase clients (Client, Server, Admin)
- `src/store/cart.ts` - Zustand cart implementation

## Order Flow

1. User adds items to the cart (stored in Zustand + LocalStorage).
2. User initiates checkout; an API call creates a Stripe Checkout Session.
3. Upon successful payment, Stripe sends a webhook to `/api/webhooks/stripe`.
4. The webhook (using Supabase Service Role) creates the order, inserts order items, and decrements product stock.
5. User is redirected to the `/success` page where the cart is cleared.
