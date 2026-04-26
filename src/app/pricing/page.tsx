import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

export default function PricingPage() {
  return (
    <SiteShell>
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 13, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 12px', fontWeight: 500 }}>PRICING</p>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 600,
            margin: '0 0 14px',
            letterSpacing: '-1.8px',
            lineHeight: 1.05,
          }}>
            Simple pricing.<br/>One price unlocks everything.
          </h1>
          <p style={{ fontSize: 17, color: '#6e6e73', maxWidth: 480, margin: '0 auto', lineHeight: 1.5 }}>
            No free tier. Sign up means going live the same day.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          maxWidth: 720,
          margin: '0 auto',
        }}>
          {/* MONTHLY */}
          <div style={{
            background: 'white',
            border: '2px solid #0071e3',
            borderRadius: 16,
            padding: '28px 24px',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute',
              top: 16,
              right: 16,
              fontSize: 11,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 999,
              background: '#E6F1FB',
              color: '#0C447C',
            }}>Most popular</span>
            <p style={{ fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 8px', fontWeight: 500 }}>MONTHLY</p>
            <p style={{ fontSize: 40, fontWeight: 600, margin: 0, letterSpacing: '-1.5px' }}>
              RM79<span style={{ fontSize: 16, fontWeight: 400, color: '#6e6e73' }}> /month</span>
            </p>
            <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 18px' }}>Auto-renews monthly. Cancel anytime.</p>
            <ul style={{ padding: '0 0 0 18px', margin: 0, fontSize: 14, color: '#1d1d1f', lineHeight: 1.8 }}>
              <li>Listed on public feed + Google Maps</li>
              <li>Auto-portal at niel.my/your-name</li>
              <li>Daily logs + monthly reports</li>
              <li>Class file sharing</li>
              <li>Unlimited teachers</li>
            </ul>
            <Link href="/signup?plan=monthly" style={{
              display: 'block',
              marginTop: 20,
              background: '#0071e3',
              color: 'white',
              padding: '12px 22px',
              borderRadius: 980,
              textDecoration: 'none',
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: '-0.2px',
              textAlign: 'center',
            }}>
              Start with monthly
            </Link>
          </div>

          {/* YEARLY */}
          <div style={{
            background: 'white',
            border: '0.5px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
            padding: '28px 24px',
          }}>
            <p style={{ fontSize: 11, letterSpacing: 1, color: '#6e6e73', margin: '0 0 8px', fontWeight: 500 }}>YEARLY · SAVE RM549</p>
            <p style={{ fontSize: 40, fontWeight: 600, margin: 0, letterSpacing: '-1.5px' }}>
              RM399<span style={{ fontSize: 16, fontWeight: 400, color: '#6e6e73' }}> /year</span>
            </p>
            <p style={{ fontSize: 13, color: '#6e6e73', margin: '6px 0 18px' }}>Pay once. No recurring charges.</p>
            <ul style={{ padding: '0 0 0 18px', margin: 0, fontSize: 14, color: '#1d1d1f', lineHeight: 1.8 }}>
              <li>Everything in Monthly</li>
              <li>Pay once, no recurring</li>
              <li>Save RM549 vs monthly</li>
              <li>FPX + GrabPay supported</li>
            </ul>
            <Link href="/signup?plan=yearly" style={{
              display: 'block',
              marginTop: 20,
              background: 'white',
              color: '#0071e3',
              padding: '12px 22px',
              borderRadius: 980,
              textDecoration: 'none',
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: '-0.2px',
              textAlign: 'center',
              border: '1px solid #0071e3',
            }}>
              Start with yearly
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 13, color: '#6e6e73' }}>
            Questions? <Link href="/about" style={{ color: '#0071e3' }}>Read more</Link> · or email <a href="mailto:hello@niel.my" style={{ color: '#0071e3' }}>hello@niel.my</a>
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
