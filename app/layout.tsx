import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Himalayan Dream Estate - Premium Real Estate in the Himalayas',
  description: 'Discover your dream property in the majestic Himalayas. Browse premium lands, estates, and properties with breathtaking mountain views.',
  keywords: 'Himalayan real estate, mountain properties, land for sale, premium estates, Himalayan dream estate',
  authors: [{ name: 'Himalayan Dream Estate' }],
  openGraph: {
    title: 'Himalayan Dream Estate - Premium Real Estate in the Himalayas',
    description: 'Discover your dream property in the majestic Himalayas. Browse premium lands, estates, and properties with breathtaking mountain views.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
