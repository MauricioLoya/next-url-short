import { sql } from '@vercel/postgres'

interface DtoSaveClick {
  linkId?: number
  userAgent?: string
  referer?: string
  ip?: string
}

export default async function saveClick(dto: DtoSaveClick): Promise<number> {
  try {
    const result = await sql`
              INSERT INTO clicks (ipaddress, referrer, useragent, linkid)
              VALUES (${dto.ip}, ${dto.referer}, ${dto.userAgent}, ${dto.linkId})`
    return result.oid
  } catch (error) {
    throw error
  }
}
