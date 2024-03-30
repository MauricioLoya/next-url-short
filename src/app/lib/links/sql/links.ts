import { sql } from '@vercel/postgres'
import ShortUniqueId from 'short-unique-id'
import { Link } from '../../Definitios'

interface DtoCreateLink {
  userId: number
  originalLink: string
  shortCode?: string
}
export async function createLink(dto: DtoCreateLink): Promise<void> {
  try {
    if (dto.shortCode) {
      const shortCodeExists = await checkIfShortCodeExists(dto.shortCode)
      if (shortCodeExists) {
        throw new Error('Short code already exists')
      }
    }
    if (!dto.shortCode) {
      const uid = new ShortUniqueId({ length: 10 })
      dto.shortCode = uid.rnd()
    }
    await sql`
      INSERT INTO links (userid, shortcode, originalurl)
      VALUES (${dto.userId}, ${dto.shortCode}, ${dto.originalLink})
      RETURNING *
    `
  } catch (error) {
    throw error
  }
}

export async function findLinkByShortCode(
  shortCode: string
): Promise<Link | null> {
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
      FROM
        links
      WHERE
        shortcode = ${shortCode}
    `
    if (result.rowCount === 0) {
      return null
    }
    return result.rows[0] as Link
  } catch (error) {
    throw error
  }
}

export async function toggleLinkStatus(linkId: number): Promise<void> {
  try {
    await sql`
      UPDATE links
      SET isactive = NOT isactive
      WHERE id = ${linkId}
    `
  } catch (error) {
    throw error
  }
}

export async function checkIfLinkBelongsToUser(
  linkId: number,
  userId: number
): Promise<boolean> {
  try {
    const result = await sql`
      SELECT id FROM links
      WHERE id = ${linkId} AND userid = ${userId}
    `
    return result.rowCount > 0
  } catch (error) {
    throw error
  }
}

export async function listAllLinks(userId: number): Promise<Link[]> {
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
      FROM
        links
      WHERE
        userid = ${userId}
    `
    if (result.rowCount === 0) {
      return []
    }
    return result.rows as Link[]
  } catch (error) {
    throw error
  }
}

async function checkIfShortCodeExists(shortCode: string) {
  const result = await sql`
        SELECT * FROM links
        WHERE shortcode = ${shortCode}
    `
  return result.rowCount > 0
}
