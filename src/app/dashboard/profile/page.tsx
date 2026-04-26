import { getCurrentContext } from '@/lib/centre-utils'
import { updateCompanyProfile } from '@/lib/dashboard-actions'

const STATES = ['Selangor', 'Kuala Lumpur', 'Penang', 'Johor', 'Sabah', 'Sarawak', 'Perak', 'Kedah', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis', 'Putrajaya', 'Labuan']
const THEMES = [
  { key: 'blue',   label: 'Blue',   bg: '#E6F1FB', fg: '#0C447C' },
  { key: 'green',  label: 'Green',  bg: '#EAF3DE', fg: '#3B6D11' },
  { key: 'coral',  label: 'Coral',  bg: '#FAECE7', fg: '#993C1D' },
  { key: 'pink',   label: 'Pink',   bg: '#FBEAF0', fg: '#993556' },
  { key: 'purple', label: 'Purple', bg: '#EEEDFE', fg: '#3C3489' },
]

export default async function ProfilePage() {
  const ctx = await getCurrentContext()
  const c = ctx.company

  return (
    <section style={{ maxWidth: 720 }}>
      <p style={{ fontSize: 11, letterSpacing: 1.5, color: '#0071e3', margin: '0 0 6px', fontWeight: 500 }}>PROFILE</p>
      <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.8px' }}>Public listing</h1>
      <p style={{ fontSize: 14, color: '#6e6e73', margin: '0 0 24px' }}>
        This is what shows up at <strong>niel.my/{c.slug}</strong> and on the public feed.
      </p>

      <form action={updateCompanyProfile} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="CENTRE NAME">
          <input name="name" defaultValue={c.name} style={inputStyle} required />
        </Field>

        <Field label="URL" hint={`niel.my/${c.slug}`} note="Slug locked. Contact support to change.">
          <input value={c.slug} readOnly style={{ ...inputStyle, background: '#f5f5f7', color: '#6e6e73' }} />
        </Field>

        <Field label="THEME COLOUR">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {THEMES.map(t => (
              <label key={t.key} style={{ cursor: 'pointer' }}>
                <input type="radio" name="theme" value={t.key} defaultChecked={c.theme === t.key} style={{ display: 'none' }} />
                <span style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: t.bg,
                  color: t.fg,
                  fontSize: 12,
                  fontWeight: 500,
                  border: c.theme === t.key ? `2px solid ${t.fg}` : '2px solid transparent',
                }}>{t.label}</span>
              </label>
            ))}
          </div>
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="CITY">
            <input name="city" defaultValue={c.city ?? ''} style={inputStyle} />
          </Field>
          <Field label="STATE">
            <select name="state" defaultValue={c.state ?? ''} style={inputStyle}>
              <option value="">—</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="LEVEL">
            <select name="level" defaultValue={c.level ?? 'both'} style={inputStyle}>
              <option value="primary">Primary only</option>
              <option value="secondary">Secondary only</option>
              <option value="both">Both</option>
            </select>
          </Field>
          <Field label="MODE">
            <select name="mode" defaultValue={c.mode ?? 'both'} style={inputStyle}>
              <option value="physical">Physical only</option>
              <option value="online">Online only</option>
              <option value="both">Both</option>
            </select>
          </Field>
        </div>

        <Field label="SUBJECTS" hint="Comma-separated">
          <input name="subjects" defaultValue={(c.subjects ?? []).join(', ')} placeholder="Math, Science, BM, English" style={inputStyle} />
        </Field>

        <Field label="WHATSAPP">
          <input name="whatsapp" defaultValue={c.whatsapp ?? ''} placeholder="+60 12-345 6789" style={inputStyle} />
        </Field>

        <Field label="ABOUT">
          <textarea name="about" defaultValue={c.about ?? ''} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} />
        </Field>

        <div>
          <button type="submit" style={primaryBtnStyle}>Save changes</button>
        </div>
      </form>
    </section>
  )
}

function Field({ label, hint, note, children }: { label: string; hint?: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, letterSpacing: 1, color: '#6e6e73', marginBottom: 6, fontWeight: 500 }}>
        {label} {hint && <span style={{ color: '#1d1d1f', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>· {hint}</span>}
      </label>
      {children}
      {note && <p style={{ fontSize: 11, color: '#9a9a9a', margin: '4px 0 0' }}>{note}</p>}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 14,
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
  padding: '10px 22px',
  border: 'none',
  borderRadius: 980,
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: '-0.2px',
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const
