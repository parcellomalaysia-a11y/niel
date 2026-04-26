import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteShell from '@/components/SiteShell'

interface CentreData {
  slug: string
  code: string
  name: string
  city: string
  state: string
  level: 'Primary' | 'Secondary' | 'Both'
  mode: 'Physical' | 'Online' | 'Both'
  subjects: string[]
  priceTiers: { label: string; price: number }[]
  about: string
  established: number
  whatsapp: string
  email: string
  themeColor: string
  themeText: string
}

const CENTRES: Record<string, CentreData> = {
  'bright-star': {
    slug: 'bright-star', code: 'BS', name: 'Bright Star Tuition',
    city: 'Petaling Jaya', state: 'Selangor', level: 'Both', mode: 'Both',
    subjects: ['Math', 'Science', 'BM', 'English'],
    priceTiers: [
      { label: 'Primary', price: 180 }, { label: 'Secondary', price: 240 }, { label: 'SPM', price: 340 },
    ],
    about: 'Established 2018. Small-group tuition for primary & secondary students. Every student gets a monthly written report from their teacher tracking progress, attendance, and topics covered.',
    established: 2018, whatsapp: '+60 12-345 6789', email: 'hello@brightstar.com',
    themeColor: '#E6F1FB', themeText: '#0C447C',
  },
  'akademi-cemerlang': {
    slug: 'akademi-cemerlang', code: 'AC', name: 'Akademi Cemerlang',
    city: 'Klang', state: 'Selangor', level: 'Secondary', mode: 'Physical',
    subjects: ['Math', 'BM', 'English'],
    priceTiers: [{ label: 'Form 1-3', price: 150 }, { label: 'Form 4-5', price: 220 }],
    about: 'Established 2015. Specialized in SPM preparation with proven results.',
    established: 2015, whatsapp: '+60 12-987 6543', email: 'info@cemerlang.com',
    themeColor: '#EAF3DE', themeText: '#27500A',
  },
  'pintar-elite': {
    slug: 'pintar-elite', code: 'PE', name: 'Pintar Elite Centre',
    city: 'George Town', state: 'Penang', level: 'Both', mode: 'Both',
    subjects: ['Math', 'Science', 'English', 'Mandarin'],
    priceTiers: [{ label: 'Primary', price: 280 }, { label: 'Secondary', price: 350 }, { label: 'IGCSE', price: 480 }],
    about: 'Premium small-group tuition with proven A+ track record across Malaysian and international curricula.',
    established: 2010, whatsapp: '+60 14-555 1234', email: 'admin@pintarelite.my',
    themeColor: '#FAECE7', themeText: '#712B13',
  },
  'jb-smart': {
    slug: 'jb-smart', code: 'JS', name: 'JB Smart Tutor',
    city: 'Johor Bahru', state: 'Johor', level: 'Primary', mode: 'Physical',
    subjects: ['Math', 'BM', 'English'],
    priceTiers: [{ label: 'Std 1-3', price: 120 }, { label: 'Std 4-6', price: 160 }],
    about: 'Affordable primary tuition with personal attention. Small classes, qualified teachers.',
    established: 2019, whatsapp: '+60 17-222 8888', email: 'hello@jbsmart.my',
    themeColor: '#FBEAF0', themeText: '#72243E',
  },
  'borneo-knowledge': {
    slug: 'borneo-knowledge', code: 'BK', name: 'Borneo Knowledge Hub',
    city: 'Kota Kinabalu', state: 'Sabah', level: 'Both', mode: 'Both',
    subjects: ['Math', 'Science', 'BM', 'English'],
    priceTiers: [{ label: 'Primary', price: 200 }, { label: 'Secondary', price: 280 }],
    about: 'Sabah\'s leading tuition centre with online sessions for rural students across East Malaysia.',
    established: 2017, whatsapp: '+60 19-444 7777', email: 'support@borneoknowledge.my',
    themeColor: '#EEEDFE', themeText: '#3C3489',
  },
}

export default async function CentrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const centre = CENTRES[slug]
  if (!centre) notFound()

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
              background: centre.themeColor, color: centre.themeText,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 600, letterSpacing: '-0.7px',
              flexShrink: 0,
            }}>
              {centre.code}
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: '-0.8px' }}>{centre.name}</h1>
              <p style={{ fontSize: 14, color: '#6e6e73', margin: '4px 0 0' }}>
                {centre.city}, {centre.state} · since {centre.established}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={pillStyle('info')}>{centre.level}</span>
            <span style={pillStyle('teal')}>{centre.mode}</span>
            {centre.subjects.map(s => (
              <span key={s} style={pillStyle('amber')}>{s}</span>
            ))}
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#1d1d1f', margin: '0 0 24px' }}>
            {centre.about}
          </p>

          <p style={labelStyle}>PRICING</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${centre.priceTiers.length}, 1fr)`,
            gap: 8,
            marginBottom: 24,
          }}>
            {centre.priceTiers.map(t => (
              <div key={t.label} style={{
                background: '#f5f5f7',
                padding: 12,
                borderRadius: 10,
              }}>
                <p style={{ fontSize: 11, color: '#6e6e73', margin: 0, letterSpacing: 0.5 }}>{t.label.toUpperCase()}</p>
                <p style={{ fontSize: 22, fontWeight: 600, margin: '3px 0 0', letterSpacing: '-0.5px' }}>
                  RM{t.price}<span style={{ fontSize: 11, color: '#6e6e73', fontWeight: 400 }}> /mo</span>
                </p>
              </div>
            ))}
          </div>

          <p style={labelStyle}>CONTACT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: '#1d1d1f' }}>
              WhatsApp: <strong style={{ color: centre.themeText }}>{centre.whatsapp}</strong>
            </div>
            <div style={{ fontSize: 14, color: '#1d1d1f' }}>
              Email: <strong style={{ color: centre.themeText }}>{centre.email}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button style={{
              background: '#0071e3',
              color: 'white',
              padding: '12px 22px',
              border: 'none',
              borderRadius: 980,
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '-0.2px',
            }}>
              Visit centre portal ↗
            </button>
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
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function pillStyle(variant: 'info' | 'teal' | 'amber') {
  const colors = {
    info:  { bg: '#E6F1FB', fg: '#0C447C' },
    teal:  { bg: '#E1F5EE', fg: '#085041' },
    amber: { bg: '#FAEEDA', fg: '#633806' },
  }[variant]
  return {
    fontSize: 11,
    padding: '4px 10px',
    borderRadius: 999,
    background: colors.bg,
    color: colors.fg,
    fontWeight: 500,
  } as const
}

const labelStyle = {
  fontSize: 11,
  letterSpacing: 1,
  color: '#6e6e73',
  margin: '0 0 8px',
  fontWeight: 500,
} as const
