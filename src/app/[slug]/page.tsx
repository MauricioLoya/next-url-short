import { headers } from 'next/headers'
import { findLinkByShortCode } from '../lib/links/sql/links'
import { redirect } from 'next/navigation'
import saveClick from '../lib/click/sql/saveClick'

interface Params {
  params: { slug: string }
}

export default async function RedirectionPage({ params }: Params) {
  if (!params.slug) {
    return '404 Not Found'
  }
  const link = await findLinkByShortCode(params.slug)
  if (!link) {
    return '404 Not Found'
  }
  const userAgent = headers().get('user-agent') ?? undefined
  const referer = headers().get('referer') ?? undefined
  const ip = (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  try {
    await saveClick({
      linkId: link.id,
      userAgent,
      referer,
      ip
    })
  } catch (error) {
    console.log('error', error)
  } finally {
    redirect(link.originalUrl)
  }
}
