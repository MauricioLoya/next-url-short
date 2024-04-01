import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/SessionProvider'
import { Toaster } from 'react-hot-toast'

const jetBrans = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <title>daLink</title>
      <body className={jetBrans.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
