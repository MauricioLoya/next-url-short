export const runtime = 'edge'

import Header from '../components/shared/Header'
import InfoCard from '../components/dashboard/InfoCard'
import getTotalLinksByUser from '../lib/links/sql/getTotalLinksByUser'
import getTodayTotalClicks from '../lib/click/sql/getTodayTotalClicks'
import getLastCreatedLinks from '../lib/links/sql/getLastCreatedLinks'
import getMostClickedLink from '../lib/click/sql/getMostClickedLink'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '../lib/users/sql/user'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session || !session.user || !session.user.email) {
    return redirect('/api/auth/signin')
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return redirect('/api/auth/signin')
  }

  const totalLinks = await getTotalLinksByUser(user.id)
  const todayTotalClicks = await getTodayTotalClicks(user.id)
  const lastCreatedLinks = await getLastCreatedLinks(user.id)
  const mostClickedLinks = await getMostClickedLink(user.id)

  return (
    <div className="w-full">
      <Header
        title="📈 Dashboard"
        description="Your dashboard. Here you have so important informration about your links."
      />
      <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-4">
        <InfoCard title="Total Links" value={totalLinks.toString()} />
        <InfoCard title="Clicks of today" value={todayTotalClicks.toString()} />
        <InfoCard title="Last 5 created Links">
          {lastCreatedLinks.length === 0 && <p>No links created yet</p>}
          <ol className="list-decimal  mt-2 text-sm">
            {lastCreatedLinks.map((link, index) => (
              <li
                key={link.id}
                className="flex items-center justify-between  border-t py-2"
              >
                <Link href={`/dashboard/links/${link.shortCode}`}>
                  {index + 1}.{link.shortCode}
                </Link>
              </li>
            ))}
          </ol>
        </InfoCard>
        <InfoCard title="Top 3 clicked Link">
          <ol className="list-decimal mt-2 text-sm">
            {mostClickedLinks.map((link, index) => (
              <li
                className="flex items-center justify-between  border-t py-2"
                key={link.id}
              >
                <Link href={`/dashboard/links/${link.shortcode}`}>
                  {index + 1}.{link.shortcode}
                </Link>
                {link.click_count}
              </li>
            ))}
          </ol>
        </InfoCard>
      </div>
    </div>
  )
}
