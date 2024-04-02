import { sql } from '@vercel/postgres'

export default async function getTotalClickByLinkId(
  linkId: number
): Promise<number> {
  try {
    const result =
      await sql`select count(id) from clicks where linkid = ${linkId};`
    if (!result) return 0
    if (result.rowCount === 0) return 0
    return result.rows[0].count as number
  } catch (error) {
    throw error
  }
}
