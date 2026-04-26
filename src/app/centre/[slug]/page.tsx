import Link from 'next/link'
import { notFound } from 'next/navigation'
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

function pillStyle(variant: 'info' | 'teal' | 'amber') {
  const colors = {
    info:  { bg: '#E6F1FB', fg: '#0C447C' },
    teal:  { bg: '#E1F5EE', fg: '#085041' },
    amber: { bg: '#FAEEDA', fg: '#633806' },
  }[variant]
  return {
    fontSize: 11, padding: '4px 10px', borderRadius: 999,
    background: colors.bg, color: colors.fg, fontWeight: 500,
  } as const
}

const labelStyle = {
  fontSize: 11, letterSpacing: 1, color: '#6e6e73',
  margin: '0 0 8px', fontWeight: 500,
} as const

export default async function CentrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: centre } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .neq('plan', 'expired')
    .single()

  if (!centre) notFound()

  // Fetch classes for pricing tiers
  const { data: classes } = await supabase
    .from('classes')
    .select('name, level, price_per_month')
    .eq('company_id', centre.id)
    .order('price_per_month')

  const tc = THEME_COLORS[centre.theme] ?? THEME_COLORS.blue
  const subjects = centre.subjects ?? []

  return (
    <SiteShell>
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Link href="/feed" style={{
          display: 'inline-block',
          fontSize: 13,
          color: '#0071e3',
          textDecoration: 'none',
          marginBottom: 20,
        }}>
          ← Back to all centres
        </Link>

        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.08)',
          borderRadius: 16,
          padding: '28px 24px',
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: tc.bg, color: tc.text,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 600, letterSpacing: '-0.7px', flexShrink: 0,
            }}>
              {initials(centre.name)}
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>{centre.name}</h1>
              <p style={{ fontSize: 14, color: '#6e6e73', margin: '4px 0 0' }}>
                {centre.city}, {centre.state}{centre.established ? ` · since ${centre.established}` : ''}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={pillStyle('info')}>{centre.level === 'both' ? 'Primary + Secondary' : centre.level}</span>
            <span style={pillStyle('teal')}>{centre.mode === 'both' ? 'Physical + Online' : centre.mode}</span>
            {subjects.map((s: string) => (
              <span key={s} style={pillStyle('amber')}>{s}</span>
            ))}
          </div>

          {centre.about && (
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#1d1d1f', margin: '0 0 24px' }}>
              {centre.about}
            </p>
          )}

          {classes && classes.length > 0 && (
            <>
              <p style={labelStyle}>CLASSES</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
                gap: 8,
                marginBottom: 24,
              }}>
                {classes.map((c: any) => (
                  <div key={c.name} style={{
                    background: '#f5f5f7',
                    padding: 12,
                    borderRadius: 10,
                  }}>
                    <p style={{ fontSize: 11, color: '#6e6e73', margin: 0, letterSpacing: 0.3 }}>
                      {c.name.toUpperCase()}
                    </p>
                    <p style={{ fontSize: 18, fontWeight: 600, margin: '3px 0 0', letterSpacing: '-0.3px' }}>
                      RM{c.price_per_month}
                      <span style={{ fontSize: 11, color: '#6e6e73', fontWeight: 400 }}> /mo</span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <p style={labelStyle}>CONTACT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
            {centre.whatsapp && (
              <div style={{ fontSize: 14, color: '#1d1d1f' }}>
                WhatsApp: <strong style={{ color: tc.text }}>{centre.whatsapp}</strong>
              </div>
            )}
            <div style={{ fontSize: 14, color: '#1d1d1f' }}>
              Email: <strong style={{ color: tc.text }}>{centre.email}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href={`/${centre.slug}`} style={{
              background: '#0071e3',
              color: 'white',
              padding: '12px 22px',
              border: 'none',
              borderRadius: 980,
              fontSize: 14,
              fontWeight: 400,
              textDecoration: 'none',
              letterSpacing: '-0.2px',
              display: 'inline-block',
            }}>
              Visit centre portal ↗
            </Link>
            {centre.whatsapp && (
              <a
                href={`https://wa.me/${centre.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'white',
                  color: '#1d1d1f',
                  padding: '12px 22px',
                  border: '0.5px solid rgba(0,0,0,0.15)',
                  borderRadius: 980,
                  fontSize: 14,
                  fontWeight: 400,
                  textDecoration: 'none',
                  letterSpacing: '-0.2px',
                }}
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
