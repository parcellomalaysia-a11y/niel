import Link from 'next/link'
import SiteShell from '@/components/SiteShell'
import { createClient } from '@/lib/supabase-server'

const THEME_COLORS: Record<string, { bg: string; text: string }> = {
  blue:   { bg: '#E6F1FB', text: '#0C447C' },
  green:  { bg: '#EAF3DE', text: '#27500A' },
  coral:  { bg: '#FAECE7', text: '#712B13' },
  pink:   { bg: '#FBEAF0', text: '#72243E' },
  purple: { bg: '#EEEDFE', text: '#3C3489' },
}

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: centres } = await supabase
    .from('companies')
    .select('slug, name, city, state, level, mode, subjects, theme')
    .neq('plan', 'expired')
    .order('created_at', { ascending: false })

  const list = centres ?? []

  return (
    <SiteShell>
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 8px', fontWeight: 500 }}>BROWSE</p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            margin: '0 0 8px',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
          }}>
            Find tuition near you.
          </h1>
          <p style={{ fontSize: 16, color: '#6e6e73', margin: 0, lineHeight: 1.5 }}>
            {list.length} centre{list.length === 1 ? '' : 's'} listed. More joining every week.
          </p>
        </div>

        {/* Filters (UI only for now) */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <select style={selectStyle}><option>All states</option></select>
          <select style={selectStyle}><option>All levels</option></select>
          <select style={selectStyle}><option>Physical + online</option></select>
          <select style={selectStyle}><option>Any subject</option></select>
        </div>

        {/* Map placeholder */}
        <div style={{
          background: '#E1F5EE',
          borderRadius: 14,
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20,
          border: '0.5px solid rgba(0,0,0,0.06)',
        }}>
          <svg viewBox="0 0 800 200" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="200" fill="#E1F5EE" />
            <path d="M 80 80 Q 220 50 380 90 T 750 110 L 750 180 L 80 180 Z" fill="#9FE1CB" opacity="0.4" />
            <circle cx="220" cy="120" r="11" fill="#0071e3" /><text x="220" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">5</text>
            <circle cx="320" cy="100" r="11" fill="#0071e3" /><text x="320" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>
            <circle cx="160" cy="80" r="11" fill="#0071e3" /><text x="160" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>
            <circle cx="500" cy="140" r="11" fill="#0071e3" /><text x="500" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">4</text>
            <circle cx="680" cy="80" r="11" fill="#0071e3" /><text x="680" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>
          </svg>
          <span style={{
            position: 'absolute', top: 12, left: 16, fontSize: 12,
            background: 'white', padding: '4px 10px', borderRadius: 6, color: '#6e6e73', fontWeight: 500,
          }}>Google Maps · coming soon</span>
        </div>

        {/* Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.length === 0 && (
            <p style={{ color: '#6e6e73', textAlign: 'center', padding: '40px 0' }}>
              No centres yet. Check back soon!
            </p>
          )}
          {list.map((c: any) => {
            const tc = THEME_COLORS[c.theme] ?? THEME_COLORS.blue
            return (
              <Link
                key={c.slug}
                href={`/centre/${c.slug}`}
                style={{
                  background: 'white',
                  border: '0.5px solid rgba(0,0,0,0.08)',
                  borderRadius: 12,
                  padding: 16,
                  textDecoration: 'none',
                  color: '#1d1d1f',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: tc.bg, color: tc.text,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 600, letterSpacing: '-0.5px', flexShrink: 0,
                }}>
                  {initials(c.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: '-0.4px' }}>{c.name}</p>
                  <p style={{ fontSize: 13, color: '#6e6e73', margin: '4px 0 6px' }}>
                    {c.city}, {c.state} · {c.level === 'both' ? 'Primary + Secondary' : c.level} · {c.mode === 'both' ? 'Physical + Online' : c.mode}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(c.subjects ?? []).slice(0, 4).map((s: string) => (
                      <span key={s} style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 999,
                        background: '#f5f5f7', color: '#1d1d1f',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
                <span style={{ color: '#6e6e73', fontSize: 18 }}>›</span>
              </Link>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ fontSize: 13, color: '#6e6e73' }}>
            Run a tuition centre?{' '}
            <Link href="/signup" style={{ color: '#0071e3', textDecoration: 'none' }}>List yours →</Link>
          </p>
        </div>
      </section>
    </SiteShell>
  )
}

const selectStyle = {
  fontSize: 13, padding: '8px 12px', borderRadius: 980,
  border: '0.5px solid rgba(0,0,0,0.15)', background: 'white',
  color: '#1d1d1f', fontFamily: 'inherit', cursor: 'pointer',
} as const
