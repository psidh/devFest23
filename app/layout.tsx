import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevFest2023 RSVP',
  description: 'Welcome to DevFest 2023!, Please RSVP using the form below.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>{children}</body>
    </html>
  )
}
