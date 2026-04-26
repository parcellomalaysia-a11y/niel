import Link from 'next/link'
import { getCurrentContext } from '@/lib/centre-utils'
import { createClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const ctx = await getCurrentContext()
  const supabase = await createClient()
  const companyId = ctx.company.id

  // Run stats queries in parallel
  const [classesRes, studentsRes, parentsRes, draftsRes, recentReportsRes, recentEntriesRes] = await Promise.all([
    supabase.from('classes').select('*', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('students').select('*', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('parents').select('*', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('monthly_reports').select('id, enrollments!inner(students!inner(company_id))', { count: 'exact', head: true })
      .eq('status', 'draft')
      .eq('enrollments.students.company_id', companyId),
    supabase
      .from('monthly_reports')
      .select('id, month, year, status, published_at, enrollments!inner(students!inner(name, company_id), classes!inner(name))')
      .eq('status', 'published')
      .eq('enrollments.students.company_id', companyId)
      .order('published_at', { ascending: false })
      .limit(5),
    supabase
      .from('daily_entries')
      .select('id, session_date, topic, score, enrollments!inner(students!inner(name, company_id), classes!inner(name))')
      .eq('enrollments.students.company_id', companyId)
      .order('session_date', { ascending: false })
      .limit(5),
  ])

  const classCount   = classesRes.count   ?? 0
  const studentCount = studentsRes.count  ?? 0
  const parentCount  = parentsRes.count   ?? 0
  const draftCount   = draftsRes.count    ?? 0

  const planLabel = ctx.company.plan === 'monthly' ? 'Monthly · RM79'
    : ctx.company.plan === 'yearly' ? 'Yearly · RM399'
    : 'No active plan'

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>OVERVIEW</p>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>
            Welcome back, {ctx.teacher.name.split(' ')[0]}.
          </h1>
        </div>
        <span style={pillStyle('teal')}>{planLabel}</span>
      </header>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 10,
        marginBottom: 24,
      }}>
        <Stat label="CLASSES"     value={classCount} href="/dashboard/classes" />
        <Stat label="STUDENTS"    value={studentCount} />
        <Stat label="PARENTS"     value={parentCount} href="/dashboard/parents" />
        <Stat label="DRAFTS DUE"  value={draftCount} highlight />
      </div>

      {/* Drafts banner */}
      {draftCount > 0 && (
        <div style={{
          background: '#FAEEDA',
          border: '0.5px solid #FAC775',
          borderRadius: 12,
          padding: '12px 16px',
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: '#633806', margin: 0 }}>
            <strong>{draftCount} monthly draft{draftCount === 1 ? '' : 's'} ready to review</strong>
          </p>
          <Link href="/dashboard/classes" style={{
            background: '#854F0B', color: 'white',
            padding: '7px 14px', borderRadius: 980,
            fontSize: 12, textDecoration: 'none', fontWeight: 400,
          }}>Review →</Link>
        </div>
      )}

      {/* Quick actions */}
      <p style={sectionLabel}>QUICK ACTIONS</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        <Link href="/dashboard/classes" style={primaryBtnStyle}>+ Add class</Link>
        <Link href="/dashboard/parents" style={ghostBtnStyle}>+ Add parent</Link>
        {ctx.teacher.is_owner && (
          <Link href="/dashboard/teachers" style={ghostBtnStyle}>+ Invite teacher</Link>
        )}
      </div>

      {/* Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div style={cardStyle}>
          <p style={sectionLabel}>RECENT REPORTS PUBLISHED</p>
          {recentReportsRes.data && recentReportsRes.data.length > 0 ? (
            <ul style={listStyle}>
              {recentReportsRes.data.map((r: any) => (
                <li key={r.id} style={listItemStyle}>
                  <span style={{ fontWeight: 500 }}>
                    {r.enrollments.students.name}
                  </span>
                  <span style={{ color: '#6e6e73', fontSize: 12 }}>
                    {r.enrollments.classes.name} · {monthName(r.month)} {r.year}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={emptyStyle}>No published reports yet.</p>
          )}
        </div>
        <div style={cardStyle}>
          <p style={sectionLabel}>RECENT DAILY LOGS</p>
          {recentEntriesRes.data && recentEntriesRes.data.length > 0 ? (
            <ul style={listStyle}>
              {recentEntriesRes.data.map((e: any) => (
                <li key={e.id} style={listItemStyle}>
                  <span style={{ fontWeight: 500 }}>{e.enrollments.students.name}</span>
                  <span style={{ color: '#6e6e73', fontSize: 12 }}>
                    {e.enrollments.classes.name} · {e.topic} · {e.score}/5
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={emptyStyle}>No daily logs yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, href, highlight }: { label: string; value: number; href?: string; highlight?: boolean }) {
  const content = (
    <div style={{
      background: highlight ? '#FAEEDA' : '#f5f5f7',
      border: highlight ? '0.5px solid #FAC775' : '0.5px solid transparent',
      padding: '14px 16px',
      borderRadius: 12,
      cursor: href ? 'pointer' : 'default',
    }}>
      <p style={{ fontSize: 10, letterSpacing: 0.8, color: highlight ? '#633806' : '#6e6e73', margin: '0 0 4px', fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: '-0.7px', color: highlight ? '#633806' : '#1d1d1f' }}>{value}</p>
    </div>
  )
  return href ? <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link> : content
}

function monthName(m: number) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1] ?? ''
}

function pillStyle(variant: 'teal' | 'amber') {
  const c = variant === 'teal' ? { bg: '#E1F5EE', fg: '#085041' } : { bg: '#FAEEDA', fg: '#633806' }
  return {
    fontSize: 12, padding: '4px 10px', borderRadius: 999,
    background: c.bg, color: c.fg, fontWeight: 500,
  } as const
}

const sectionLabel = { fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 10px', fontWeight: 500 } as const
const cardStyle = { background: 'white', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '14px 18px' } as const
const listStyle = { listStyle: 'none', padding: 0, margin: 0 } as const
const listItemStyle = { padding: '10px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 13 } as const
const emptyStyle = { fontSize: 12, color: '#9a9a9a', margin: '8px 0 0' } as const
const primaryBtnStyle = { background: '#0071e3', color: 'white', padding: '9px 18px', borderRadius: 980, fontSize: 13, textDecoration: 'none', fontWeight: 400, letterSpacing: '-0.2px' } as const
const ghostBtnStyle = { background: 'white', color: '#1d1d1f', padding: '9px 18px', borderRadius: 980, fontSize: 13, textDecoration: 'none', fontWeight: 400, letterSpacing: '-0.2px', border: '0.5px solid rgba(0,0,0,0.15)' } as const
