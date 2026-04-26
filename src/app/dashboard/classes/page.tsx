import Link from 'next/link'
import { getCurrentContext } from '@/lib/centre-utils'
import { createClient } from '@/lib/supabase-server'

export default async function ClassesPage() {
  const ctx = await getCurrentContext()
  const supabase = await createClient()

  const { data: classes } = await supabase
    .from('classes')
    .select(`
      id, name, subject, level, schedule, price_per_month, student_code,
      class_assignments(teachers(id, name)),
      enrollments(id),
      class_files(id),
      monthly_reports!inner(id, status, enrollments!inner(class_id))
    `)
    .eq('company_id', ctx.company.id)
    .order('name')

  // Fallback simpler query without the inner-join trick (the above might be heavy)
  const { data: simpleClasses } = await supabase
    .from('classes')
    .select('id, name, subject, level, schedule, price_per_month, student_code')
    .eq('company_id', ctx.company.id)
    .order('name')

  const list = classes ?? simpleClasses ?? []

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>CLASSES</p>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>Classes · {list.length}</h1>
          <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 0' }}>Each class has its own STD code. Students use the code to access class files.</p>
        </div>
        <button style={primaryBtnStyle}>+ New class</button>
      </header>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((c: any) => {
            const teachers = c.class_assignments?.map((ca: any) => ca.teachers?.name).filter(Boolean) ?? []
            const students = c.enrollments?.length ?? 0
            const files = c.class_files?.length ?? 0
            const draftCount = c.monthly_reports?.filter((r: any) => r.status === 'draft' && r.enrollments?.class_id === c.id).length ?? 0
            return (
              <Link key={c.id} href={`/dashboard/classes/${c.id}`} style={{
                background: 'white',
                border: '0.5px solid rgba(0,0,0,0.08)',
                borderRadius: 12,
                padding: '14px 16px',
                textDecoration: 'none',
                color: '#1d1d1f',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, margin: 0, letterSpacing: '-0.4px' }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: '#6e6e73', margin: '4px 0 4px', fontFamily: 'ui-monospace, SF Mono, Menlo, monospace' }}>
                    {c.student_code}
                  </p>
                  <p style={{ fontSize: 12, color: '#6e6e73', margin: 0 }}>
                    {c.schedule}
                    {teachers.length > 0 && ` · ${teachers.join(', ')}`}
                    {students > 0 && ` · ${students} student${students === 1 ? '' : 's'}`}
                    {files > 0 && ` · ${files} file${files === 1 ? '' : 's'}`}
                  </p>
                </div>
                {draftCount > 0 && (
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#FAEEDA', color: '#633806', fontWeight: 500 }}>
                    {draftCount} draft
                  </span>
                )}
                <span style={{ color: '#9a9a9a', fontSize: 18, marginLeft: 4 }}>›</span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div style={{
      background: 'white',
      border: '0.5px dashed rgba(0,0,0,0.15)',
      borderRadius: 14,
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.3px' }}>No classes yet</p>
      <p style={{ fontSize: 13, color: '#6e6e73', margin: '0 0 16px' }}>Add your first class to start logging student progress.</p>
      <button style={primaryBtnStyle}>+ Add your first class</button>
    </div>
  )
}

const primaryBtnStyle = {
  background: '#0071e3',
  color: 'white',
  padding: '9px 18px',
  border: 'none',
  borderRadius: 980,
  fontSize: 13,
  fontWeight: 400,
  letterSpacing: '-0.2px',
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const
