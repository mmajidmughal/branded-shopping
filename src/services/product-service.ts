import { supabase } from '@/lib/supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, brands(name), categories(name)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, brands(*), categories(*)')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getCategories(): Promise<any[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getFeaturedProducts(limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select('*, brands(name)')
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createProduct(productData: any) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()

  if (error) throw error
  return data
}
