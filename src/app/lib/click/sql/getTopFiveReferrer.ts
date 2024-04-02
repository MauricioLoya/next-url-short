import { sql } from '@vercel/postgres'

type ReferrerCount = {
  referrer: string
  count: number
}

export default async function getTopFiveReferrer(
  linkId: number
): Promise<ReferrerCount[]> {
  try {
    const result = await sql`
              SELECT referrer, COUNT(referrer) as count
                  FROM clicks
                  WHERE linkid = ${linkId}
                  GROUP BY referrer
                  ORDER BY count DESC
                  LIMIT 5;`
    return result.rows as ReferrerCount[]
  } catch (error) {
    throw error
  }
}
