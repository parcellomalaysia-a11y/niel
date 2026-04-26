import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentContext } from '@/lib/centre-utils'
import { createClient } from '@/lib/supabase-server'

export default async function TeachersPage() {
  const ctx = await getCurrentContext()

  // Owner-only
  if (!ctx.teacher.is_owner) {
    redirect('/dashboard')
  }

  const supabase = await createClient()

  const { data: teachers } = await supabase
    .from('teachers')
    .select(`
      id, name, email, is_owner, status, created_at,
      class_assignments(class_id, classes(name))
    `)
    .eq('company_id', ctx.company.id)
    .order('is_owner', { ascending: false })
    .order('name')

  const all = teachers ?? []
  const active = all.filter((t: any) => t.status === 'active')
  const pending = all.filter((t: any) => t.status === 'pending')

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>TEACHERS</p>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>Teachers · {all.length}</h1>
          <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 0' }}>
            Each teacher only sees classes assigned to them.
          </p>
        </div>
        <button style={primaryBtnStyle}>+ Invite teacher</button>
      </header>

      {/* Active section */}
      <p style={sectionLabel}>ACTIVE · {active.length}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {active.map((t: any) => {
          const classes = (t.class_assignments ?? []).map((ca: any) => ca.classes?.name).filter(Boolean)
          return (
            <div key={t.id} style={cardRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <Avatar name={t.name} owner={t.is_owner} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{t.name}</p>
                    {t.is_owner && <span style={pillPurple}>Owner</span>}
                    {!t.is_owner && <span style={pillGray}>Teacher</span>}
                  </div>
                  <p style={{ fontSize: 12, color: '#6e6e73', margin: '3px 0 0' }}>
                    {t.email}
                    {classes.length > 0 && ` · ${classes.length} class${classes.length === 1 ? '' : 'es'}: ${classes.join(', ')}`}
                  </p>
                </div>
              </div>
              <button style={ghostBtnStyle}>Manage</button>
            </div>
          )
        })}
      </div>

      {/* Pending section */}
      {pending.length > 0 && (
        <>
          <p style={sectionLabel}>PENDING INVITES · {pending.length}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pending.map((t: any) => (
              <div key={t.id} style={{ ...cardRow, background: '#FAEEDA', borderColor: '#FAC775' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                  <Avatar name={t.name} pending />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{t.name}</p>
                      <span style={pillAmber}>Invite sent</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#633806', margin: '3px 0 0' }}>{t.email}</p>
                  </div>
                </div>
                <button style={{ ...ghostBtnStyle, color: '#854F0B' }}>Resend invite</button>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: 32, padding: 16, background: '#f5f5f7', borderRadius: 12 }}>
        <p style={{ fontSize: 12, color: '#6e6e73', margin: 0, lineHeight: 1.5 }}>
          <strong>Coming in M5:</strong> Send invite emails (via Resend), assign classes during invite, teacher's restricted dashboard view.
        </p>
      </div>
    </section>
  )
}

function Avatar({ name, owner, pending }: { name: string; owner?: boolean; pending?: boolean }) {
  const initials = name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  let bg = '#E6F1FB'
  let fg = '#0C447C'
  if (owner)   { bg = '#EEEDFE'; fg = '#3C3489' }
  if (pending) { bg = 'white';   fg = '#854F0B' }
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 600, letterSpacing: '-0.3px',
      flexShrink: 0,
      border: pending ? '1px dashed #BA7517' : 'none',
    }}>{initials}</div>
  )
}

const sectionLabel = { fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 10px', fontWeight: 500 } as const

const cardRow = {
  background: 'white',
  border: '0.5px solid rgba(0,0,0,0.08)',
  borderRadius: 12,
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
} as const

const pillPurple = { fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#EEEDFE', color: '#3C3489', fontWeight: 500 } as const
const pillGray   = { fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#F1EFE8', color: '#444441', fontWeight: 500 } as const
const pillAmber  = { fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#FAEEDA', color: '#633806', fontWeight: 500 } as const

const primaryBtnStyle = { background: '#0071e3', color: 'white', padding: '9px 18px', border: 'none', borderRadius: 980, fontSize: 13, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
const ghostBtnStyle = { background: 'white', color: '#1d1d1f', padding: '6px 12px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 980, fontSize: 11, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit' } as const
