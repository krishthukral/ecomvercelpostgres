'use client'

import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, User, UserPlus, Zap, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  // Ensure hydration match
  useEffect(() => {
    setMounted(true)
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    checkUser()
  }, [supabase.auth])

  if (!mounted) return <div className="py-20 text-center">Loading cart...</div>

  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-6">
        <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  const handleCheckout = async (forceGuest = false) => {
    setIsCheckingOut(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user && !forceGuest) {
        setShowAuthModal(true)
        setIsCheckingOut(false)
        return
      }

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {user ? `${user.email?.split('@')[0]}'s Cart` : 'Shopping Cart'}
        </h1>
        {user && (
          <p className="text-slate-500 text-sm mt-1">Logged in as {user.email}</p>
        )}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 flex-shrink-0">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No img</div>
                )}
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium w-10 text-center text-foreground">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-lg text-foreground">
                    ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-fit space-y-6">
          <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4 text-foreground">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${(totalPrice() / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 border-t border-slate-100 dark:border-slate-800 text-foreground">
              <span>Total</span>
              <span>${(totalPrice() / 100).toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={() => handleCheckout(false)}
            disabled={isCheckingOut}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
          >
            {isCheckingOut ? 'Processing...' : (
              <>
                Checkout <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-slate-500">
            Secure payment powered by Stripe.
          </p>
        </div>
      </div>

      {/* Auth / Guest Choice Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8 space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Checkout Options</h3>
                <p className="text-muted-foreground">How would you like to proceed?</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleCheckout(true)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Guest Checkout</p>
                      <p className="text-sm text-muted-foreground">No account required. Fast & secure.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </button>

                <Link
                  href="/login"
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Login</p>
                      <p className="text-sm text-muted-foreground">See order history & save details.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/login"
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Create Account</p>
                      <p className="text-sm text-muted-foreground">Unlock exclusive member benefits.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
