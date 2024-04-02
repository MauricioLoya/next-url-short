import { sql } from '@vercel/postgres'
import { Link } from '../../Definitios'

export default async function getLastCreatedLinks(
  userId: number,
  limit: number = 5
): Promise<Link[]> {
  try {
    const result = await sql`
            SELECT 
                id,
                userid as "userId",
                shortcode as  "shortCode",
                originalurl as "originalUrl",
                createdat as "createdAt",
                isactive as "isActive",
                expiresat as "expiresAt"
            FROM links
            where
                userid = ${userId}
            ORDER BY
                createdat
            DESC LIMIT ${limit};
            `
    if (result.rowCount === 0) {
      return []
    }
    return result.rows as Link[]
  } catch (error) {
    throw error
  }
}
