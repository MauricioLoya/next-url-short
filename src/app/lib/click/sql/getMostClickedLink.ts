import { sql } from '@vercel/postgres'

type MostClickedLink = {
  id: number
  shortcode: string
  originalurl: string
  click_count: number
}

export default async function getMostClickedLink(
  userId: number
): Promise<MostClickedLink[]> {
  try {
    const result = await sql`
              SELECT
                  l.id,
                  l.shortcode,
                  l.originalurl,
                  COUNT(c.id) AS click_count
              FROM
                  links l
              JOIN
                  clicks c ON c.linkid = l.id
              WHERE
                  l.userid = ${userId}
              GROUP BY
                  l.id
              ORDER BY
                  click_count DESC
              LIMIT 3;
          `
    if (result.rowCount === 0) {
      return []
    }
    return result.rows as MostClickedLink[]
  } catch (error) {
    throw error
  }
}
