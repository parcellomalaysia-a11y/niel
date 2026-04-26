import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCurrentContext } from '@/lib/centre-utils'
import { createClient } from '@/lib/supabase-server'

export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ctx = await getCurrentContext()
  const supabase = await createClient()

  const { data: cls } = await supabase
    .from('classes')
    .select('*')
    .eq('id', id)
    .eq('company_id', ctx.company.id)
    .maybeSingle()

  if (!cls) notFound()

  const [enrollmentsRes, filesRes, teachersRes] = await Promise.all([
    supabase
      .from('enrollments')
      .select('id, students(id, name, level)')
      .eq('class_id', cls.id),
    supabase
      .from('class_files')
      .select('id, display_name, file_type, category, created_at')
      .eq('class_id', cls.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('class_assignments')
      .select('teachers(id, name)')
      .eq('class_id', cls.id),
  ])

  const enrollments = enrollmentsRes.data ?? []
  const files = filesRes.data ?? []
  const teachers = (teachersRes.data ?? []).map((a: any) => a.teachers).filter(Boolean)

  return (
    <section>
      <Link href="/dashboard/classes" style={{ fontSize: 12, color: '#0071e3', textDecoration: 'none', display: 'inline-block', marginBottom: 14 }}>
        ← Classes
      </Link>

      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.8px' }}>{cls.name}</h1>
        <p style={{ fontSize: 14, color: '#6e6e73', margin: 0 }}>
          {cls.schedule}
          {teachers.length > 0 && ` · ${teachers.map((t: any) => t.name).join(', ')}`}
          {cls.price_per_month && ` · RM${cls.price_per_month}/month`}
        </p>
      </header>

      {/* STD code card */}
      <div style={{
        background: '#E1F5EE',
        border: '0.5px solid #9FE1CB',
        borderRadius: 14,
        padding: '14px 18px',
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 11, letterSpacing: 1, color: '#085041', margin: '0 0 6px', fontWeight: 500 }}>CLASS-LOCKED CODE</p>
        <p style={{ fontSize: 13, color: '#04342C', margin: '0 0 10px' }}>Students enter this code at <strong>niel.my/{ctx.company.slug}/open</strong> to view this class&rsquo;s files only.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <code style={{
            fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            fontSize: 14,
            fontWeight: 500,
            color: '#04342C',
            background: 'white',
            padding: '6px 12px',
            borderRadius: 8,
            border: '0.5px solid #9FE1CB',
          }}>{cls.student_code}</code>
          <button style={ghostBtnStyle}>Copy</button>
          <button style={ghostBtnStyle}>Regenerate</button>
        </div>
      </div>

      {/* Quick actions */}
      <p style={sectionLabel}>QUICK ACTIONS</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <button style={primaryBtnStyle}>Upload file →</button>
        <button style={primaryBtnStyle}>Log session →</button>
        <button style={ghostBtnStyle}>View reports →</button>
      </div>

      {/* Students */}
      <p style={sectionLabel}>STUDENTS · {enrollments.length}</p>
      {enrollments.length > 0 ? (
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {enrollments.map((e: any) => (
                <tr key={e.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '10px 6px', fontWeight: 500 }}>{e.students.name}</td>
                  <td style={{ padding: '10px 6px', color: '#6e6e73', fontSize: 12 }}>{e.students.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={emptyStyle}>No students enrolled yet.</p>
      )}

      {/* Files */}
      <p style={sectionLabel}>CLASS FILES · {files.length}</p>
      {files.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {files.map((f: any) => (
            <div key={f.id} style={{
              background: 'white',
              border: '0.5px solid rgba(0,0,0,0.08)',
              borderRadius: 10,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 6,
                background: fileTypeColor(f.file_type),
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 600, letterSpacing: '-0.2px',
              }}>{f.file_type.toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{f.display_name}</p>
                <p style={{ fontSize: 11, color: '#6e6e73', margin: '3px 0 0' }}>
                  {capitalize(f.category)} · {new Date(f.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={emptyStyle}>No files uploaded yet.</p>
      )}
    </section>
  )
}

function fileTypeColor(t: string) {
  switch (t.toLowerCase()) {
    case 'pdf': return '#C53030'
    case 'doc':
    case 'docx': return '#2563EB'
    case 'mp3': return '#7C3AED'
    case 'mp4': return '#059669'
    default: return '#6B7280'
  }
}

function capitalize(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

const sectionLabel = { fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 10px', fontWeight: 500 } as const
const cardStyle = { background: 'white', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '6px 16px' } as const
const primaryBtnStyle = { background: '#0071e3', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 980, fontSize: 12, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
const ghostBtnStyle = { background: 'white', color: '#1d1d1f', padding: '8px 16px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 980, fontSize: 12, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
const emptyStyle = { fontSize: 13, color: '#9a9a9a', margin: '0 0 24px' } as const
