import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/SessionProvider'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const jetBrans = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'daLink',
  description: 'Shorten your links with daLink'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={jetBrans.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster position="bottom-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
