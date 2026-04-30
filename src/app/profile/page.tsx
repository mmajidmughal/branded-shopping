'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getProfile, updateProfile } from '@/services/profile-service'
import { User, Sparkles, Save, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>({
    full_name: '',
    preferences: {
      style_vibe: 'Minimalist',
      favorite_colors: [],
      interests: []
    }
  })

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      try {
        const profileData = await getProfile(user.id)
        if (profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            preferences: profileData.preferences || {
              style_vibe: 'Minimalist',
              favorite_colors: [],
              interests: []
            }
          })
        }
      } catch (err) {
        console.error("Error loading profile:", err)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)

    try {
      await updateProfile(user.id, profile)
      alert('Profile updated successfully!')
    } catch (err) {
      console.error("Error updating profile:", err)
      alert('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Syncing Identity...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl px-4 py-10 lg:py-20 space-y-12">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight uppercase italic">Personal Profile</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Basic Info */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Account Details</h2>
          </div>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input 
                type="text" 
                value={profile.full_name}
                onChange={e => setProfile({...profile, full_name: e.target.value})}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email (read-only)</label>
              <input 
                disabled
                type="text" 
                value={user.email}
                className="w-full h-10 px-3 rounded-md border bg-muted text-sm"
              />
            </div>
          </div>
        </section>

        {/* Style Preferences (for AI Stylist) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">AI Style Profile</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Style Vibe</label>
              <div className="flex flex-wrap gap-2">
                {['Minimalist', 'Avant-Garde', 'Vintage', 'Streetwear', 'Classic'].map((vibe) => (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setProfile({
                      ...profile, 
                      preferences: { ...profile.preferences, style_vibe: vibe }
                    })}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      profile.preferences.style_vibe === vibe 
                      ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                      : 'bg-background hover:bg-muted'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button 
          disabled={saving}
          type="submit"
          className="w-full h-12 rounded-md bg-primary text-primary-foreground font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save Profile</>}
        </button>
      </form>
    </div>
  )
}
