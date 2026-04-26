'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface SiteShellProps {
  children: ReactNode
  /** if true, makes nav sticky with backdrop blur (default: true) */
  stickyNav?: boolean
}

export default function SiteShell({ children, stickyNav = true }: SiteShellProps) {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#fbfbfd',
      color: '#1d1d1f',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", "Inter", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 32px',
        backdropFilter: stickyNav ? 'blur(20px)' : undefined,
        background: stickyNav ? 'rgba(251,251,253,0.8)' : 'transparent',
        position: stickyNav ? 'sticky' : 'static',
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/" style={{
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: '#1d1d1f',
          textDecoration: 'none',
        }}>
          NiEL
        </Link>
        <div style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          <Link href="/feed" style={{ color: '#1d1d1f', textDecoration: 'none', opacity: 0.85 }}>Browse</Link>
          <Link href="/pricing" style={{ color: '#1d1d1f', textDecoration: 'none', opacity: 0.85 }}>Pricing</Link>
          <Link href="/login" style={{ color: '#1d1d1f', textDecoration: 'none', opacity: 0.85 }}>Log in</Link>
        </div>
      </nav>

      <div style={{ flex: 1, width: '100%' }}>
        {children}
      </div>

      <footer style={{
        padding: '20px 32px',
        fontSize: 12,
        color: '#6e6e73',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
      }}>
        <span>NiEL · Malaysia</span>
        <div style={{ display: 'flex', gap: 18 }}>
          <Link href="/how" style={{ color: '#6e6e73', textDecoration: 'none' }}>How it works</Link>
          <Link href="/about" style={{ color: '#6e6e73', textDecoration: 'none' }}>About</Link>
          <Link href="/privacy" style={{ color: '#6e6e73', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#6e6e73', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  )
}
