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

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                1
              </a>
            </li>

            <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
