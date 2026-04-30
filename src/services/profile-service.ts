import { supabase } from '@/lib/supabase'

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function upsertProfile(profileData: any) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profileData)
    .select()
    .single()

  if (error) throw error
  return data
}
