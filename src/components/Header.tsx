'use client'

import Link from 'next/link'
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useCart } from '@/store/cart'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const totalItems = useCart((state) => state.totalItems())
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single()
        setIsAdmin((profile as any)?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (!currentUser) setIsAdmin(false)
      // Note: Full role check on event change would require another fetch
      // but session refresh usually handles role in app metadata if synced
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          E-Shop
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-foreground">
            <ShoppingCart className="w-6 h-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          {mounted && (
            <>
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-right mr-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Welcome back</p>
                    <p className="text-sm font-bold text-foreground truncate max-w-[100px]">
                      {user.email?.split('@')[0]}
                    </p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-foreground flex items-center gap-2"
                    title="My Account"
                  >
                    <User className="w-6 h-6" />
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-foreground flex items-center gap-2"
                      title="Admin Dashboard"
                    >
                      <LayoutDashboard className="w-6 h-6" />
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-rose-600"
                    title="Log Out"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-foreground"
                  title="Log In"
                >
                  <User className="w-6 h-6" />
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
