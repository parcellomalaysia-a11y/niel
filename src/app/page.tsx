'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ROTATING_WORDS, ROTATE_INTERVAL_MS } from '@/types'

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitIndex, setExitIndex] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % ROTATING_WORDS.length
        setExitIndex(prev)
        setTimeout(() => setExitIndex(null), 600)
        return next
      })
    }, ROTATE_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

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
      {/* nav */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 32px',
        backdropFilter: 'blur(20px)',
        background: 'rgba(251,251,253,0.8)',
        position: 'sticky',
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
          <Link href="/pricing" style={{ color: '#1d1d1f', textDecoration: 'none', opacity: 0.85 }}>Pricing</Link>
          <Link href="/login" style={{ color: '#1d1d1f', textDecoration: 'none', opacity: 0.85 }}>Log in</Link>
        </div>
      </nav>

      {/* hero */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px 24px 100px',
      }}>
        {/* HUGE ROTATING WORD */}
        <div style={{
          height: 'clamp(96px, 18vw, 200px)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 0 12px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
            {ROTATING_WORDS.map((word, i) => {
              const isActive = i === activeIndex
              const isExiting = i === exitIndex
              let translateY = 40
              let opacity = 0
              if (isActive) { translateY = 0; opacity = 1 }
              if (isExiting) { translateY = -40; opacity = 0 }
              return (
                <span
                  key={word}
                  style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translateY(${translateY}px)`,
                    opacity,
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    whiteSpace: 'nowrap',
                    fontSize: 'clamp(80px, 16vw, 168px)',
                    fontWeight: 600,
                    letterSpacing: '-5px',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #185FA5 0%, #2A7DC8 50%, #5BA3E0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {word}
                </span>
              )
            })}
          </div>
        </div>

        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 600,
          margin: '0 0 14px',
          color: '#1d1d1f',
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
        }}>
          Built for you.
        </h2>

        <p style={{
          fontSize: 19,
          color: '#1d1d1f',
          opacity: 0.7,
          maxWidth: 520,
          margin: '0 0 40px',
          lineHeight: 1.4,
          fontWeight: 400,
          letterSpacing: '-0.2px',
        }}>
          Malaysian tuition platform. Listings, websites, daily logs, monthly reports.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/feed" style={{
            background: '#0071e3',
            color: 'white',
            padding: '12px 22px',
            borderRadius: 980,
            textDecoration: 'none',
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: '-0.2px',
            minWidth: 130,
            textAlign: 'center',
            display: 'inline-block',
          }}>
            Browse tuition
          </Link>
          <Link href="/signup" style={{
            color: '#0071e3',
            padding: '12px 8px',
            textDecoration: 'none',
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: '-0.2px',
            display: 'inline-block',
          }}>
            List your centre &rsaquo;
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer style={{
        padding: '16px 32px',
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
