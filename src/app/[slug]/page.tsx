import { headers } from 'next/headers'
import { findLinkByShortCode } from '../lib/links/sql/links'
import { redirect } from 'next/navigation'
import saveClick from '../lib/click/sql/saveClick'
import parser from 'ua-parser-js'

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
  if (!link.isActive) {
    return '404 Not Found (1)'
  }
  const userAgent = headers().get('user-agent') ?? undefined
  const referer = headers().get('referer') ?? undefined
  const ip = (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  const userAgenetParsed = parser(userAgent)
  const browser = userAgenetParsed.browser.name
  const browserVersion = userAgenetParsed.browser.version
  const os = userAgenetParsed.os.name
  const osVersion = userAgenetParsed.os.version
  const deviceVendor = userAgenetParsed.device.vendor
  const deviceModel = userAgenetParsed.device.model
  const deviceType = userAgenetParsed.device.type
  const architecture = userAgenetParsed.cpu.architecture

  try {
    await saveClick({
      linkId: link.id,
      userAgent,
      referer,
      ip,
      userAgentDetail: {
        browser,
        browserVersion,
        os,
        osVersion,
        deviceVendor,
        deviceModel,
        deviceType,
        architecture
      }
    })
  } catch (error) {
    console.log('error', error)
  } finally {
    redirect(link.originalUrl)
  }
}
