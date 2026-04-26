export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price_cents: number
          stock: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_cents: number
          stock?: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_cents?: number
          stock?: number
          image_url?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          stripe_session_id: string | null
          status: string
          total_cents: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          stripe_session_id?: string | null
          status?: string
          total_cents: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          stripe_session_id?: string | null
          status?: string
          total_cents?: number
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price_cents: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price_cents: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price_cents?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_stock: {
        Args: {
          product_id: string
          amount: number
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}