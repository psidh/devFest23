import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const myFont = localFont({ src: './GoogleSans-Regular-v1.27.ttf' });

export const metadata: Metadata = {
  title: 'DevFest2023 RSVP',
  description: 'Welcome to DevFest 2023!, Please RSVP using the form below.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black ${myFont.className}`}>{children}</body>
    </html>
  );
}
