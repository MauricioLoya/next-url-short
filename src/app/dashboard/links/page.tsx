import { Button } from '@/app/components/shared/Button'
import Header from '@/app/components/shared/Header'
import { listAllLinks } from '@/app/lib/links/sql/links'
import { findUserByEmail } from '@/app/lib/users/sql/user'
import { formatDateToLocal } from '@/app/lib/utils'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function LinksPage() {
  const session = await getServerSession()
  if (!session || !session.user || !session.user.email) {
    return redirect('/api/auth/signin')
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return redirect('/api/auth/signin')
  }
  const links = await listAllLinks(user.id)

  return (
    <div className="w-full">
      <Header
        title="🔗 Links"
        description="Manage your links"
        actionButton={
          <div className="flex justify-center items-center">
            <Link href="/dashboard/links/create">
              <Button>+ New Link</Button>
            </Link>
          </div>
        }
      />
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Url
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Short Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Create at
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Active
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {links.map(link => (
                <tr key={link.id}>
                  <td className="px-4 py-2 text-gray-900">
                    {link.originalUrl}
                  </td>
                  <td className="px-4 py-2 text-gray-900">{link.shortCode}</td>
                  <td className="px-4 py-2 text-center text-gray-900">
                    {formatDateToLocal(link.createdAt)}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-900">
                    {link.isActive ? 'Yes' : 'No'}
                  </td>
                  <td className="flex items-center justify-center gap-3 px-4 py-2  text-gray-900">
                    <Link
                      href={`/dashboard/links/${link.shortCode}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
