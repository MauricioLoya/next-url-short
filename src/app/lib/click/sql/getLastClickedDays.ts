import { sql } from '@vercel/postgres'

export type ClickByDay = {
  day: string
  count: number
}
export default async function getLastClickedDays(
  linkId: number,
  lasDays: number
): Promise<ClickByDay[]> {
  try {
    const result = await sql`
      SELECT
        date_trunc('day', clickedat) as day,
        count(id) as count
      FROM
        clicks
      WHERE
        linkid = ${linkId}
      GROUP BY
        day
      ORDER BY
        day
        limit ${lasDays}
    `
    return result.rows as ClickByDay[]
  } catch (error) {
    throw error
  }
}
