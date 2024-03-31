import { LinkDetails } from '@/app/components/dashboard/links/LinkDetails'
import { ToggleStatus } from '@/app/components/dashboard/links/ToggleStatus'
import Header from '@/app/components/shared/Header'
import { findLinkByShortCode } from '@/app/lib/links/sql/links'
import Link from 'next/link'
import { Suspense } from 'react'
interface Params {
  params: { shortCode: string }
}
export default async function EditLinkPage({ params }: Params) {
  const currentLink = await findLinkByShortCode(params.shortCode)
  if (!currentLink) {
    return <div>404 Not Found</div>
  }
  return (
    <div className="w-full">
      <Header
        title={`✍️ Edit your link - ${params.shortCode}`}
        description="Here you can edit the url of your link"
        actionButton={
          <div className="flex justify-center gap-2">
            <ToggleStatus link={currentLink} />
            <Link
              target="_blank"
              href={`https://dalink.xyz/${params.shortCode}`}
              className="rounded-md bg-gray-200 hover:bg-gray-400 font-medium px-3 py-3 text-sm"
            >
              ✈️ Visit
            </Link>
          </div>
        }
      />
      <Suspense fallback="Loading...">
        <LinkDetails shortCode={params.shortCode} />
      </Suspense>
    </div>
  )
}
