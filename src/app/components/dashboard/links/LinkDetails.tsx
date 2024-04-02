import {
  checkIfLinkBelongsToUser,
  findLinkByShortCode
} from '@/app/lib/links/sql/links'
import { Box } from '../../shared/Box'
import { getServerSession } from 'next-auth'
import { findUserByEmail } from '@/app/lib/users/sql/user'
import { formatClicks } from '@/app/lib/utils'
import { Suspense } from 'react'
import getTotalClickByLinkId from '@/app/lib/click/sql/getTotalClickByLinkId'
import getTopFiveBrowsers from '@/app/lib/click/sql/getTopFiveBrowsers'
import getTopFiveReferrer from '@/app/lib/click/sql/getTopFiveReferrer'
import getTopfivePlatforms from '@/app/lib/click/sql/getTopPlatforms'
import getLastClickedDays from '@/app/lib/click/sql/getLastClickedDays'
import LineChart from './LineChart'

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
    const totalClicks = await getTotalClickByLinkId(currentLink.id)
    let topFiveBrowsers = await getTopFiveBrowsers(currentLink.id)
    let topFiveReferrer = await getTopFiveReferrer(currentLink.id)
    let topFivePlatforms = await getTopfivePlatforms(currentLink.id)
    const lastClickedDaysLimit = 7

    topFiveBrowsers = topFiveBrowsers.filter(item => item.browser)
    topFiveReferrer = topFiveReferrer.filter(item => item.referrer)
    topFivePlatforms = topFivePlatforms.filter(item => item.os)

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
                {formatClicks(totalClicks)}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Top Browsers</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <ol className="list-decimal ml-6">
                  {topFiveBrowsers.length === 0 && <p>No data available</p>}
                  {topFiveBrowsers.map((item, index) => (
                    <li key={index}>
                      {item.browser + `v(${item.browserversion})`}
                    </li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Top Referrers</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <ol className="list-decimal ml-6">
                  {topFiveReferrer.length === 0 && <p>No data available</p>}
                  {topFiveReferrer.map((item, index) => (
                    <li key={index}>{item.referrer}</li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Top Platforms</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <ol className="list-decimal ml-6">
                  {topFivePlatforms.length === 0 && <p>No data available</p>}
                  {topFivePlatforms.map((item, index) => (
                    <li key={index}>{item.os}</li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">
                Last {lastClickedDaysLimit} Days
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <Suspense fallback="Loading...">
                  <LineChart limit={7} linkId={currentLink.id} />
                </Suspense>
              </dd>
            </div>
          </dl>
        </div>
      </Box>
    )
  } catch (error) {
    return <div>505 Server Error</div>
  }
}
