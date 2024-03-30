import { getServerSession } from 'next-auth'
import SideNav from '../components/dashboard/SideNav'
import { redirect } from 'next/navigation'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return redirect('/api/auth/signin')
  }
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  )
}
