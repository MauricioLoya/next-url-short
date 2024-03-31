import { sql } from '@vercel/postgres'

interface DtoSaveClick {
  linkId?: number
  userAgent?: string
  referer?: string
  ip?: string
  userAgentDetail?: {
    browser?: string
    browserVersion?: string
    os?: string
    osVersion?: string
    deviceVendor?: string
    deviceModel?: string
    deviceType?: string
    architecture?: string
  }
}

export default async function saveClick(dto: DtoSaveClick): Promise<number> {
  try {
    const result = await sql`
              INSERT INTO clicks (
                ipaddress,
                referrer,
                useragent,
                linkid,
                browser,
                browserversion,
                os,
                osversion,
                devicevendor,
                devicemodel,
                devicetype,
                architecture
                )
                VALUES (
                    ${dto.ip},
                    ${dto.referer},
                    ${dto.userAgent},
                    ${dto.linkId},
                    ${dto.userAgentDetail?.browser},
                    ${dto.userAgentDetail?.browserVersion},
                    ${dto.userAgentDetail?.os},
                    ${dto.userAgentDetail?.osVersion},
                    ${dto.userAgentDetail?.deviceVendor},
                    ${dto.userAgentDetail?.deviceModel},
                    ${dto.userAgentDetail?.deviceType},
                    ${dto.userAgentDetail?.architecture}
                )`
    return result.oid
  } catch (error) {
    throw error
  }
}
