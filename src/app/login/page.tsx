'use client'

import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

export default function LoginPage() {
  return (
    <SiteShell>
      <section style={{ maxWidth: 400, margin: '0 auto', padding: '60px 24px 100px' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 600,
          margin: '0 0 8px',
          letterSpacing: '-1px',
          textAlign: 'center',
        }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', margin: '0 0 28px', textAlign: 'center' }}>
          Owners and teachers use the same login.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>EMAIL</label>
            <input type="email" placeholder="you@example.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>PASSWORD</label>
            <input type="password" style={inputStyle} />
          </div>
          <button type="button" style={primaryBtnStyle}>
            Log in
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 0.5, background: 'rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 11, color: '#9a9a9a' }}>OR</span>
            <div style={{ flex: 1, height: 0.5, background: 'rgba(0,0,0,0.1)' }} />
          </div>
          <button type="button" style={ghostBtnStyle}>
            Continue with Google
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6e6e73' }}>
          New to NiEL?{' '}
          <Link href="/signup" style={{ color: '#0071e3', textDecoration: 'none' }}>List your centre</Link>
        </p>
      </section>
    </SiteShell>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 11,
  letterSpacing: 1,
  color: '#6e6e73',
  marginBottom: 6,
  fontWeight: 500,
} as const

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  fontSize: 15,
  borderRadius: 10,
  border: '0.5px solid rgba(0,0,0,0.15)',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  background: 'white',
  color: '#1d1d1f',
} as const

const primaryBtnStyle = {
  background: '#0071e3',
  color: 'white',
  padding: '12px 22px',
  border: 'none',
  borderRadius: 980,
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: '-0.2px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  marginTop: 4,
} as const

const ghostBtnStyle = {
  background: 'white',
  color: '#1d1d1f',
  padding: '12px 22px',
  border: '0.5px solid rgba(0,0,0,0.15)',
  borderRadius: 980,
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: '-0.2px',
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const
