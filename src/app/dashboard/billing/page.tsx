import { redirect } from 'next/navigation'
import { getCurrentContext } from '@/lib/centre-utils'

export default async function BillingPage() {
  const ctx = await getCurrentContext()

  // Owner-only
  if (!ctx.teacher.is_owner) {
    redirect('/dashboard')
  }

  const c = ctx.company
  const planLabel = c.plan === 'monthly' ? 'Monthly · RM79/month'
    : c.plan === 'yearly' ? 'Yearly · RM399/year'
    : 'No active plan'

  const expiry = c.plan_expires_at
    ? new Date(c.plan_expires_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const isActive = c.plan && c.plan !== 'expired'

  return (
    <section style={{ maxWidth: 720 }}>
      <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>BILLING</p>
      <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.8px' }}>Billing</h1>
      <p style={{ fontSize: 14, color: '#6e6e73', margin: '0 0 24px' }}>
        Manage your plan and view invoices.
      </p>

      {/* Current plan */}
      <div style={{
        background: 'white',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 14,
        padding: '20px 22px',
        marginBottom: 18,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 6px', fontWeight: 500 }}>CURRENT PLAN</p>
            <p style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.4px' }}>{planLabel}</p>
            {expiry && (
              <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 0' }}>
                Renews {expiry}
              </p>
            )}
          </div>
          {isActive ? (
            <span style={pillTeal}>Active</span>
          ) : (
            <span style={pillRed}>No plan</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          {c.plan === 'monthly' && (
            <button style={primaryBtnStyle}>Switch to yearly · save RM549</button>
          )}
          {isActive && (
            <button style={dangerGhostStyle}>Cancel plan</button>
          )}
          {!isActive && (
            <button style={primaryBtnStyle}>Choose a plan →</button>
          )}
        </div>
      </div>

      {/* Coming soon notice */}
      <div style={{
        background: '#FAEEDA',
        border: '0.5px solid #FAC775',
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 24,
      }}>
        <p style={{ fontSize: 13, color: '#633806', margin: 0, lineHeight: 1.5 }}>
          <strong>Coming in M4:</strong> Stripe checkout for new sign-ups, downloadable invoices, payment method management.
        </p>
      </div>

      {/* Invoices placeholder */}
      <p style={sectionLabel}>RECENT INVOICES</p>
      <div style={{
        background: 'white',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f5f5f7', fontSize: 11, color: '#6e6e73', letterSpacing: 0.5, fontWeight: 500 }}>
              <th style={thStyle}>DATE</th>
              <th style={thStyle}>DESCRIPTION</th>
              <th style={thStyle}>AMOUNT</th>
              <th style={thStyle}>STATUS</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <td style={tdStyle}>25 Apr 2026</td>
              <td style={tdStyle}>Monthly · NiEL</td>
              <td style={tdStyle}>RM79.00</td>
              <td style={tdStyle}><span style={pillTeal}>Paid</span></td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <button style={ghostBtnStyle}>Download</button>
              </td>
            </tr>
            <tr style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <td style={tdStyle}>25 Mar 2026</td>
              <td style={tdStyle}>Monthly · NiEL</td>
              <td style={tdStyle}>RM79.00</td>
              <td style={tdStyle}><span style={pillTeal}>Paid</span></td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <button style={ghostBtnStyle}>Download</button>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>25 Feb 2026</td>
              <td style={tdStyle}>Monthly · NiEL</td>
              <td style={tdStyle}>RM79.00</td>
              <td style={tdStyle}><span style={pillTeal}>Paid</span></td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <button style={ghostBtnStyle}>Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: '#9a9a9a', margin: '12px 0 0', textAlign: 'center' }}>
        Mock invoices — real billing history appears once Stripe is wired in M4.
      </p>
    </section>
  )
}

const sectionLabel = { fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 10px', fontWeight: 500 } as const
const thStyle = { padding: '10px 14px', textAlign: 'left' as const, textTransform: 'uppercase' as const }
const tdStyle = { padding: '12px 14px' }
const pillTeal = { fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#E1F5EE', color: '#085041', fontWeight: 500 } as const
const pillRed  = { fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#FCEBEB', color: '#791F1F', fontWeight: 500 } as const
const primaryBtnStyle = { background: '#0071e3', color: 'white', padding: '9px 18px', border: 'none', borderRadius: 980, fontSize: 13, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
const ghostBtnStyle = { background: 'white', color: '#1d1d1f', padding: '6px 12px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 980, fontSize: 11, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit' } as const
const dangerGhostStyle = { background: 'white', color: '#791F1F', padding: '9px 18px', border: '0.5px solid #F09595', borderRadius: 980, fontSize: 13, fontWeight: 400, letterSpacing: '-0.2px', cursor: 'pointer', fontFamily: 'inherit' } as const
