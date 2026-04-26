import SiteShell from '@/components/SiteShell'

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ fontSize: 13, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 12px', fontWeight: 500 }}>PRIVACY POLICY</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, margin: '0 0 8px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: '#6e6e73', margin: '0 0 36px' }}>Last updated: April 2026</p>

        <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.7 }}>
          <H>What we collect</H>
          <P>NiEL collects information you provide directly: centre name, email, password (hashed), payment details (handled by Stripe — we never store card numbers), and content you upload (class files, student records, daily logs).</P>

          <H>How we use it</H>
          <P>To run the platform: process payments, send essential service emails (invites, billing receipts, monthly report notifications), and provide customer support. We do not sell your data or share it with advertisers.</P>

          <H>Where data is stored</H>
          <P>Data is stored in Supabase (Singapore region) and Stripe. Files (PDFs, recordings, worksheets) are stored in Supabase Storage and only accessible via signed URLs validated by your STD or PAR code.</P>

          <H>Cookies</H>
          <P>We use essential cookies for authentication. We do not use advertising trackers.</P>

          <H>Google sign-in</H>
          <P>If you sign in with Google, we receive your name, email address, and profile picture. We do not access your contacts, calendar, drive, or any other Google service data.</P>

          <H>Your rights</H>
          <P>You can export, correct, or delete your data anytime by emailing <a href="mailto:hello@niel.my" style={{ color: '#0071e3' }}>hello@niel.my</a>. We respond within 7 days.</P>

          <H>Children</H>
          <P>Student records on NiEL are entered by tuition centres on behalf of students and parents. Parents may request removal of their child's data anytime.</P>

          <H>Changes</H>
          <P>If we update this policy materially, we'll email account owners at least 14 days in advance.</P>

          <H>Contact</H>
          <P>Questions? Email <a href="mailto:hello@niel.my" style={{ color: '#0071e3' }}>hello@niel.my</a>.</P>
        </div>
      </section>
    </SiteShell>
  )
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 18, fontWeight: 600, margin: '24px 0 8px', letterSpacing: '-0.3px' }}>{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 14px' }}>{children}</p>
}
