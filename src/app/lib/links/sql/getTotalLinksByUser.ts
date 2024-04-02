import { sql } from "@vercel/postgres"

export default async function getTotalLinksByUser(
  userId: number
): Promise<number> {
  try {
    const result = await sql`
    SELECT COUNT(id) as count
    FROM links
    WHERE userid = ${userId}
    `
    if (!result) return 0
    if (result.rowCount === 0) return 0
    return result.rows[0].count as number
  } catch (error) {
    throw error
  }
}
