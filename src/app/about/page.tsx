import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

export default function AboutPage() {
  return (
    <SiteShell>
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ fontSize: 13, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 12px', fontWeight: 500 }}>ABOUT</p>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontWeight: 600,
          margin: '0 0 24px',
          letterSpacing: '-1.8px',
          lineHeight: 1.05,
        }}>
          Helping Malaysian tuition centres run better.
        </h1>

        <p style={{ fontSize: 17, color: '#1d1d1f', lineHeight: 1.6, margin: '0 0 18px' }}>
          NiEL exists because every Malaysian parent wants to know how their child is actually doing in tuition — but most centres don't have time to write monthly reports by hand.
        </p>

        <p style={{ fontSize: 17, color: '#1d1d1f', lineHeight: 1.6, margin: '0 0 18px' }}>
          We built NiEL so teachers can take 30 seconds per student per class to log progress — and the system writes the monthly report automatically. Parents see beautiful charts and clear summaries. Students get class files in one place. Centre owners get a public listing, an auto-generated website, and proper teacher accounts — all for RM79 a month.
        </p>

        <p style={{ fontSize: 17, color: '#1d1d1f', lineHeight: 1.6, margin: '0 0 36px' }}>
          One platform. Built for Malaysia.
        </p>

        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.08)',
          borderRadius: 14,
          padding: 20,
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 10px', fontWeight: 500 }}>CONTACT</p>
          <p style={{ fontSize: 15, color: '#1d1d1f', margin: 0, lineHeight: 1.7 }}>
            Email <a href="mailto:hello@niel.my" style={{ color: '#0071e3' }}>hello@niel.my</a><br/>
            Made in Kuala Lumpur 🇲🇾
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link href="/signup" style={{
            background: '#0071e3',
            color: 'white',
            padding: '12px 22px',
            borderRadius: 980,
            textDecoration: 'none',
            fontWeight: 400,
            fontSize: 15,
            letterSpacing: '-0.2px',
          }}>List your centre</Link>
        </div>
      </section>
    </SiteShell>
  )
}
