import { sql } from '@vercel/postgres'

type PlatformCount = {
  os?: string
  osversion?: string
  devicevendor?: string
  devicemodel?: string
  count: number
}

export default async function getTopFiveReferrer(
  linkId: number
): Promise<PlatformCount[]> {
  try {
    const result = await sql`
              SELECT os, COUNT(os) as count, devicevendor, devicemodel, osversion
                  FROM clicks
                  WHERE linkid = ${linkId}
                  GROUP BY os, devicevendor, devicemodel, osversion
                  ORDER BY count DESC
                  LIMIT 5;`
    return result.rows as PlatformCount[]
  } catch (error) {
    throw error
  }
}
