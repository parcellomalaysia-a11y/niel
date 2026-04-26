import { getCurrentContext } from '@/lib/centre-utils'
import { createClient } from '@/lib/supabase-server'

export default async function ParentsPage() {
  const ctx = await getCurrentContext()
  const supabase = await createClient()

  const { data: parents } = await supabase
    .from('parents')
    .select(`
      id, name, email, whatsapp, parent_code, created_at,
      students(id, name, level)
    `)
    .eq('company_id', ctx.company.id)
    .order('name')

  const list = parents ?? []

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>PARENTS</p>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>Parents · {list.length}</h1>
          <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 0' }}>
            One PAR code per parent. Unlocks all their children's reports at this centre.
          </p>
        </div>
        <button style={primaryBtnStyle}>+ Add parent</button>
      </header>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.08)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f5f5f7', fontSize: 11, color: '#6e6e73', letterSpacing: 0.5, fontWeight: 500 }}>
                <th style={thStyle}>PARENT</th>
                <th style={thStyle}>CHILDREN</th>
                <th style={thStyle}>PAR CODE</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {list.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  <td style={tdStyle}>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{p.name}</p>
                    {p.email && <p style={{ fontSize: 11, color: '#6e6e73', margin: '3px 0 0' }}>{p.email}</p>}
                    {p.whatsapp && <p style={{ fontSize: 11, color: '#6e6e73', margin: '2px 0 0' }}>{p.whatsapp}</p>}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(p.students ?? []).map((s: any) => (
                        <span key={s.id} style={{
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: '#E6F1FB',
                          color: '#0C447C',
                          fontWeight: 500,
                        }}>
                          {s.name.split(' ')[0]}
                        </span>
                      ))}
                      {(p.students ?? []).length === 0 && (
                        <span style={{ fontSize: 11, color: '#9a9a9a' }}>—</span>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <code style={{
                      fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                      fontSize: 11,
                      color: '#1d1d1f',
                    }}>{p.parent_code}</code>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <button style={ghostBtnStyle}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.3px' }}>No parents yet</p>
      <p style={{ fontSize: 13, color: '#6e6e73', margin: '0 0 16px' }}>Add a parent to enrol their children in classes.</p>
      <button style={primaryBtnStyle}>+ Add your first parent</button>
    </div>
  )
}

const thStyle = { padding: '10px 14px', textAlign: 'left' as const, textTransform: 'uppercase' as const }
const tdStyle = { padding: '12px 14px', verticalAlign: 'top' as const }
const primaryBtnStyle = { background: '#0071e3', color: 'white', padding: '9px 18px', border: 'none', borderRadius: 980, fontSize: 13, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
const ghostBtnStyle = { background: 'white', color: '#1d1d1f', padding: '6px 12px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 980, fontSize: 11, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit' } as const
