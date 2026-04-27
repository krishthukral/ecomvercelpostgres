'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Mail, Lock, UserPlus, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createClient()
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })
      if (error) throw error
      
      if (data.session) {
        setMessage('Account created successfully! Redirecting...')
        router.push('/')
        router.refresh()
      } else {
        setMessage('Success! Please check your email for the confirmation link.')
      }
    } catch (error: any) {
      setMessage(error.message || 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground">Join us to start shopping and track orders</p>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-foreground"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-foreground"
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm text-center font-medium ${
              message.toLowerCase().includes('error') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('failed')
                ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            }`}>
              {message}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Sign Up
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`,
              },
            })
            if (error) setMessage(error.message)
          }}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-800 text-foreground py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors py-2"
        >
          Continue as Guest <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
