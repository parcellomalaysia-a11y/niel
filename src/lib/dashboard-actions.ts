'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function updateCompanyProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Find the user's company via teachers table
  const { data: teacher } = await supabase
    .from('teachers')
    .select('company_id, is_owner')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (!teacher || !teacher.is_owner) {
    return { error: 'Only owners can update centre profile.' }
  }

  const updates: Record<string, any> = {
    name: formData.get('name')?.toString(),
    city: formData.get('city')?.toString(),
    state: formData.get('state')?.toString(),
    level: formData.get('level')?.toString(),
    mode: formData.get('mode')?.toString(),
    theme: formData.get('theme')?.toString(),
    about: formData.get('about')?.toString(),
    whatsapp: formData.get('whatsapp')?.toString(),
  }

  const subjectsRaw = formData.get('subjects')?.toString() ?? ''
  updates.subjects = subjectsRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const { error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', teacher.company_id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/profile')
  return { success: true }
}
