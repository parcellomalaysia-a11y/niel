'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { signOut } from '@/lib/dashboard-actions'

interface DashboardShellProps {
  centreName: string
  ownerName: string
  isOwner: boolean
  children: ReactNode
}

export default function DashboardShell({ centreName, ownerName, isOwner, children }: DashboardShellProps) {
  const pathname = usePathname()

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
      {/* top bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px',
        backdropFilter: 'blur(20px)',
        background: 'rgba(251,251,253,0.85)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/" style={{
            fontSize: 19, fontWeight: 600, letterSpacing: '-0.5px',
            color: '#1d1d1f', textDecoration: 'none',
          }}>NiEL</Link>
          <span style={{ color: '#9a9a9a', fontSize: 14 }}>·</span>
          <span style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{centreName}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 13, color: '#6e6e73' }}>{ownerName}</span>
          <form action={signOut}>
            <button type="submit" style={{
              background: 'transparent', border: '0.5px solid rgba(0,0,0,0.15)',
              padding: '6px 14px', borderRadius: 980, fontSize: 12,
              cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.2px',
              color: '#1d1d1f',
            }}>Sign out</button>
          </form>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* sidebar */}
        <aside style={{
          width: 220,
          background: 'transparent',
          padding: '20px 14px',
          borderRight: '0.5px solid rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}>
          <p style={sectionLabelStyle}>BRIGHT STAR</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
            <NavItem href="/dashboard"          active={pathname === '/dashboard'}>Overview</NavItem>
            <NavItem href="/dashboard/profile"  active={pathname === '/dashboard/profile'}>Profile</NavItem>
            <NavItem href="/dashboard/classes"  active={pathname.startsWith('/dashboard/classes')}>Classes</NavItem>
            <NavItem href="/dashboard/parents"  active={pathname === '/dashboard/parents'}>Parents</NavItem>
            {isOwner && (
              <NavItem href="/dashboard/teachers" active={pathname === '/dashboard/teachers'}>Teachers</NavItem>
            )}
            {isOwner && (
              <NavItem href="/dashboard/billing"  active={pathname === '/dashboard/billing'}>Billing</NavItem>
            )}
          </nav>
          <p style={sectionLabelStyle}>VIEW</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ExternalLink href="/feed">Public feed</ExternalLink>
            <ExternalLink href="/centre/bright-star">My listing</ExternalLink>
          </nav>
        </aside>

        {/* main */}
        <div style={{ flex: 1, padding: '28px 32px', minWidth: 0 }}>
          {children}
        </div>
      </div>
    </main>
  )
}

function NavItem({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link href={href} style={{
      padding: '7px 12px',
      borderRadius: 8,
      fontSize: 13,
      textDecoration: 'none',
      color: active ? '#1d1d1f' : '#6e6e73',
      background: active ? 'white' : 'transparent',
      fontWeight: active ? 500 : 400,
      border: active ? '0.5px solid rgba(0,0,0,0.06)' : '0.5px solid transparent',
    }}>{children}</Link>
  )
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} target="_blank" style={{
      padding: '7px 12px',
      borderRadius: 8,
      fontSize: 13,
      textDecoration: 'none',
      color: '#6e6e73',
    }}>{children} ↗</Link>
  )
}

const sectionLabelStyle = {
  fontSize: 11,
  letterSpacing: 1,
  color: '#9a9a9a',
  margin: '0 0 6px 12px',
  fontWeight: 500,
} as const
