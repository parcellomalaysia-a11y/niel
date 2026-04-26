import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

interface Centre {
  slug: string
  code: string
  name: string
  city: string
  state: string
  level: 'Primary' | 'Secondary' | 'Both'
  mode: 'Physical' | 'Online' | 'Both'
  subjects: string[]
  priceFrom: number
  about: string
  themeColor: string
  themeText: string
}

// Mock data (M2 deploy 2 will pull from Supabase)
const CENTRES: Centre[] = [
  { slug: 'bright-star',       code: 'BS', name: 'Bright Star Tuition',     city: 'Petaling Jaya', state: 'Selangor', level: 'Both',      mode: 'Both',     subjects: ['Math', 'Science', 'BM'],     priceFrom: 180, about: 'Small-group tuition for primary & secondary. Auto monthly reports for every student.', themeColor: '#E6F1FB', themeText: '#0C447C' },
  { slug: 'akademi-cemerlang', code: 'AC', name: 'Akademi Cemerlang',       city: 'Klang',         state: 'Selangor', level: 'Secondary', mode: 'Physical', subjects: ['Math', 'BM', 'English'],      priceFrom: 150, about: 'Established 2015. Specialized in SPM preparation.', themeColor: '#EAF3DE', themeText: '#27500A' },
  { slug: 'pintar-elite',      code: 'PE', name: 'Pintar Elite Centre',     city: 'George Town',   state: 'Penang',   level: 'Both',      mode: 'Both',     subjects: ['Math', 'Science', 'English'], priceFrom: 280, about: 'Premium small-group tuition with proven A+ track record.', themeColor: '#FAECE7', themeText: '#712B13' },
  { slug: 'jb-smart',          code: 'JS', name: 'JB Smart Tutor',          city: 'Johor Bahru',   state: 'Johor',    level: 'Primary',   mode: 'Physical', subjects: ['Math', 'BM', 'English'],      priceFrom: 120, about: 'Affordable primary tuition with personal attention.', themeColor: '#FBEAF0', themeText: '#72243E' },
  { slug: 'borneo-knowledge',  code: 'BK', name: 'Borneo Knowledge Hub',    city: 'Kota Kinabalu', state: 'Sabah',    level: 'Both',      mode: 'Both',     subjects: ['Math', 'Science', 'BM'],      priceFrom: 200, about: 'Sabah\'s leading tuition centre with online sessions for rural students.', themeColor: '#EEEDFE', themeText: '#3C3489' },
]

export default function FeedPage() {
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
            {CENTRES.length} centres listed. More joining every week.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <select style={selectStyle}>
            <option>All states</option>
            <option>Selangor</option>
            <option>Kuala Lumpur</option>
            <option>Penang</option>
            <option>Johor</option>
            <option>Sabah</option>
          </select>
          <select style={selectStyle}>
            <option>All levels</option>
            <option>Primary</option>
            <option>Secondary</option>
          </select>
          <select style={selectStyle}>
            <option>Physical + online</option>
            <option>Physical only</option>
            <option>Online only</option>
          </select>
          <select style={selectStyle}>
            <option>Any subject</option>
            <option>Math</option>
            <option>Science</option>
            <option>BM</option>
            <option>English</option>
          </select>
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
            position: 'absolute',
            top: 12,
            left: 16,
            fontSize: 12,
            background: 'white',
            padding: '4px 10px',
            borderRadius: 6,
            color: '#6e6e73',
            fontWeight: 500,
          }}>Google Maps · coming soon</span>
        </div>

        {/* Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CENTRES.map((c) => (
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
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: c.themeColor,
                color: c.themeText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '-0.5px',
                flexShrink: 0,
              }}>
                {c.code}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: '-0.4px' }}>{c.name}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: '#1d1d1f' }}>from RM{c.priceFrom}<span style={{ fontSize: 11, color: '#6e6e73', fontWeight: 400 }}> /mo</span></p>
                </div>
                <p style={{ fontSize: 13, color: '#6e6e73', margin: '4px 0 6px' }}>{c.city}, {c.state} · {c.level} · {c.mode}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.subjects.map(s => (
                    <span key={s} style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: '#f5f5f7',
                      color: '#1d1d1f',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
              <span style={{ color: '#6e6e73', fontSize: 18 }}>›</span>
            </Link>
          ))}
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
  fontSize: 13,
  padding: '8px 12px',
  borderRadius: 980,
  border: '0.5px solid rgba(0,0,0,0.15)',
  background: 'white',
  color: '#1d1d1f',
  fontFamily: 'inherit',
  cursor: 'pointer',
} as const
