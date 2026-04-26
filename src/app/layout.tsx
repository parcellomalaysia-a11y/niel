import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NiEL — Malaysian tuition platform',
  description: 'Find tuition. Run tuition. Listings, websites, daily logs, monthly reports — built for Malaysia.',
  metadataBase: new URL('https://niel.my'),
  openGraph: {
    title: 'NiEL — Malaysian tuition platform',
    description: 'Listings, websites, daily logs, monthly reports — built for Malaysia.',
    url: 'https://niel.my',
    siteName: 'NiEL',
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NiEL — Malaysian tuition platform',
    description: 'Listings, websites, daily logs, monthly reports.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
