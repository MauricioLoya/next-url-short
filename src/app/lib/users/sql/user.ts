import { sql } from '@vercel/postgres'
import { User } from '../../Definitios'

async function findUserByEmail(email: string): Promise<User | null> {
  const result = await sql`
        SELECT * FROM users
        WHERE email = ${email}
    `
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0] as User
}

async function createUserByProvider(
  user: Omit<User, 'id' | 'updated_at'>
): Promise<User> {
  const result = await sql`
        INSERT INTO users (email, provider, first_name, last_name)
        VALUES (${user.email}, ${user.provider}, ${user.first_name}, ${
    user.last_name ?? null
  })
        RETURNING *
    `
  return result.rows[0] as User
}

export { findUserByEmail, createUserByProvider }
