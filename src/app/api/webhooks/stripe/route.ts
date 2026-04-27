import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Database } from '@/types/supabase'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const metadata = session.metadata
    const cartItems = JSON.parse(metadata.cartItems)

    // 1. Create Order
    const { data: order, error: orderError } = await (supabaseAdmin
      .from('orders') as any)
      .insert({
        user_id: metadata.userId === 'guest' ? null : metadata.userId,
        stripe_session_id: session.id as string,
        total_cents: session.amount_total as number,
        status: 'paid',
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
    }

    // 2. Create Order Items
    const orderItemsToInsert = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_cents: item.price_cents,
    }))

    const { error: itemsError } = await (supabaseAdmin
      .from('order_items') as any)
      .insert(orderItemsToInsert)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
    }

    // 3. Update Stock
    for (const item of cartItems) {
      await (supabaseAdmin.rpc as any)('decrement_stock', { 
        product_id: item.id as string, 
        amount: item.quantity as number 
      })
    }
  }

  return NextResponse.json({ received: true })
}