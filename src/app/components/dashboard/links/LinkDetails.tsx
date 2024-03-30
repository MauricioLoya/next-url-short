import {
  checkIfLinkBelongsToUser,
  findLinkByShortCode
} from '@/app/lib/links/sql/links'
import { Box } from '../../shared/Box'
import { getServerSession } from 'next-auth'
import { findUserByEmail } from '@/app/lib/users/sql/user'
import { formatClicks } from '@/app/lib/utils'

interface Props {
  shortCode: string
}
export const LinkDetails = async ({ shortCode }: Props) => {
  try {
    const currentLink = await findLinkByShortCode(shortCode)
    if (!currentLink) {
      return <div>404 Not Found</div>
    }
    const session = await getServerSession()
    if (!session?.user?.email) return
    const user = await findUserByEmail(session.user.email)
    if (!user) return <div>404 Not Found</div>
    const LinkBelongsToUser = await checkIfLinkBelongsToUser(
      currentLink.id,
      user.id
    )
    if (!LinkBelongsToUser) return <div>404 Not Found</div>
    return (
      <Box>
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Original Link</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {currentLink.originalUrl}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Created By</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {user.first_name} - {user.email}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Active</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {currentLink.isActive ? 'Yes' : 'No'}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Total Clicks</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {formatClicks(100020)}
                {/* Todo */}
              </dd>
            </div>
          </dl>
        </div>
      </Box>
    )
  } catch (error) {
    console.log('error', error)
    return <div>505 Server Error</div>
  }
}
