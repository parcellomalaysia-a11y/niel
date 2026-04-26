import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

const STEPS = [
  { n: '01', title: 'Sign up', body: 'Centre owner signs up and pays. Portal goes live the same day at niel.my/your-centre with your branding and colour theme.' },
  { n: '02', title: 'Add classes & teachers', body: 'Create classes, invite teachers, add students and parents. Each class gets its own STD code; each parent gets one PAR code that unlocks all their kids.' },
  { n: '03', title: 'Daily logs', body: 'After each class, teacher takes 30 seconds per student: score 1-5, topic taught, and a tag (improving / OK / lacking). Saves automatically.' },
  { n: '04', title: 'Auto monthly reports', body: 'On the 1st of each month, the system aggregates daily logs into draft reports for every student. Teacher reviews, edits, and publishes. Parents see beautiful charts in their dashboard.' },
]

const FOR_PARENTS = [
  'One PAR code → all your kids visible',
  'Clear monthly reports with charts',
  'See progress trend over time',
  'Filter by individual child',
]

const FOR_STUDENTS = [
  'Per-class STD code',
  'Recordings, worksheets, past papers',
  'Files organized by category',
  'Class-locked access',
]

const FOR_TEACHERS = [
  'Daily logs auto-feed monthly reports',
  'No more manual report writing',
  'Upload files in seconds',
  'See only your assigned classes',
]

const FOR_CENTRES = [
  'Listed on public feed',
  'Auto-generated themed website',
  'Unlimited teachers',
  'RM79/month all-inclusive',
]

export default function HowPage() {
  return (
    <SiteShell>
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 13, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 12px', fontWeight: 500 }}>HOW IT WORKS</p>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 600,
            margin: '0 0 16px',
            letterSpacing: '-1.8px',
            lineHeight: 1.05,
          }}>
            Daily logs become<br/>monthly reports.
          </h1>
          <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 520, margin: '0 auto', lineHeight: 1.5 }}>
            Teachers spend 30 seconds per student per class. Parents get clear written reports every month.
          </p>
        </div>

        {/* 4 steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 64,
        }}>
          {STEPS.map(s => (
            <div key={s.n} style={{
              background: 'white',
              border: '0.5px solid rgba(0,0,0,0.08)',
              borderRadius: 14,
              padding: 20,
            }}>
              <p style={{ fontSize: 13, color: '#0071e3', margin: '0 0 8px', fontWeight: 600, letterSpacing: 0.5 }}>STEP {s.n}</p>
              <h3 style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.5px' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#6e6e73', margin: 0, lineHeight: 1.5 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Audience cards */}
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          margin: '0 0 24px',
          letterSpacing: '-1px',
          textAlign: 'center',
        }}>Built for everyone in tuition.</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginBottom: 48,
        }}>
          <AudienceCard title="For parents" items={FOR_PARENTS} />
          <AudienceCard title="For students" items={FOR_STUDENTS} />
          <AudienceCard title="For teachers" items={FOR_TEACHERS} />
          <AudienceCard title="For centres" items={FOR_CENTRES} />
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px 20px', background: '#f5f5f7', borderRadius: 14 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 10px', letterSpacing: '-0.7px' }}>Ready to start?</h2>
          <p style={{ fontSize: 15, color: '#6e6e73', margin: '0 0 18px' }}>List your centre from RM79/month.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/signup" style={{
              background: '#0071e3', color: 'white', padding: '12px 22px', borderRadius: 980,
              textDecoration: 'none', fontWeight: 400, fontSize: 15, letterSpacing: '-0.2px',
            }}>List your centre</Link>
            <Link href="/feed" style={{
              color: '#0071e3', padding: '12px 12px', textDecoration: 'none', fontWeight: 400, fontSize: 15,
            }}>Browse tuition →</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function AudienceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{
      background: 'white',
      border: '0.5px solid rgba(0,0,0,0.08)',
      borderRadius: 12,
      padding: 16,
    }}>
      <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', letterSpacing: '-0.3px' }}>{title}</p>
      <ul style={{ padding: '0 0 0 16px', margin: 0, fontSize: 13, color: '#6e6e73', lineHeight: 1.7 }}>
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}
