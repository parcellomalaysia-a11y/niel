import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export interface CurrentUserContext {
  userId: string
  email: string | null
  teacher: {
    id: string
    name: string
    email: string
    is_owner: boolean
    status: string
  }
  company: {
    id: string
    slug: string
    name: string
    plan: string | null
    plan_expires_at: string | null
    theme: string
    city: string | null
    state: string | null
    level: string | null
    mode: string | null
    subjects: string[] | null
    about: string | null
    established: number | null
    whatsapp: string | null
  }
}

/**
 * Load the current logged-in user's teacher record + their centre.
 * Redirects to /login if not signed in, or /onboarding (in M4) if not linked.
 */
export async function getCurrentContext(): Promise<CurrentUserContext> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: teacher } = await supabase
    .from('teachers')
    .select('*')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (!teacher) {
    // User signed in but no teacher record linked — for now show login error
    // M4 will add proper onboarding flow
    redirect('/login?error=no_centre_linked')
  }

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', teacher.company_id)
    .single()

  if (!company) {
    redirect('/login?error=company_not_found')
  }

  return {
    userId: user.id,
    email: user.email ?? null,
    teacher,
    company,
  }
}
