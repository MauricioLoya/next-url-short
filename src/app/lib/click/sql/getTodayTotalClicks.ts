import { sql } from '@vercel/postgres'

export default async function getTodayTotalClicks(
  userId: number
): Promise<number> {
  try {
    const result = await sql`
        select
            count(l.id) as count
        from
            links l
            join clicks as c on c.linkid = l.id
        where
            c.clickedat >= CURRENT_DATE
            and l.userid = ${userId};
    `
    if (!result) return 0
    if (result.rowCount === 0) return 0
    return result.rows[0].count as number
  } catch (error) {
    throw error
  }
}
