import { sql } from '@vercel/postgres'

type BrowserCount = {
  browser?: string
  browserversion?: string
  count: number
}
export default async function getTopFiveBrowsers(
  linkId: number
): Promise<BrowserCount[]> {
  try {
    const result = await sql`
        SELECT browser, COUNT(browser) as count, browserversion
        FROM clicks
        WHERE linkid = ${linkId}
        GROUP BY browser, browserversion
        ORDER BY count DESC
        LIMIT 5
        `
    return result.rows as BrowserCount[]
  } catch (error) {
    throw error
  }
}
