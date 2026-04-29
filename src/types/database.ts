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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          preferences: Json
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          stock_quantity: number
          category_id: string | null
          brand_id: string | null
          images: string[]
          metadata: Json
          embedding: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          stock_quantity?: number
          category_id?: string | null
          brand_id?: string | null
          images?: string[]
          metadata?: Json
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          stock_quantity?: number
          category_id?: string | null
          brand_id?: string | null
          images?: string[]
          metadata?: Json
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: Json
          tracking_number: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: Json
          tracking_number?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: Json
          tracking_number?: string | null
          created_at?: string
        }
      }
    }
  }
}
