'use client'

import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Ensure hydration match
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="py-20 text-center">Loading cart...</div>

  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-6">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to initiate checkout. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No img</div>
                )}
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium w-10 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-lg">
                    ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-xl border h-fit space-y-6">
          <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${(totalPrice() / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 border-t">
              <span>Total</span>
              <span>${(totalPrice() / 100).toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-400"
          >
            {isCheckingOut ? 'Processing...' : (
              <>
                Checkout <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-gray-500">
            Secure payment powered by Stripe.
          </p>
        </div>
      </div>
    </div>
  )
}