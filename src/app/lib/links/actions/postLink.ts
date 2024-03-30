'use server'

import { getServerSession } from 'next-auth'
import { findUserByEmail } from '../../users/sql/user'
import { createLink } from '../sql/links'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const postLink = async (form: FormData) => {
  const session = await getServerSession()
  if (!session?.user?.email) return
  const originalLink = form.get('originalLink')?.toString()
  const shortCode = form.get('shortCode')?.toString()
  if (!originalLink) {
    return
  }
  try {
    const user = await findUserByEmail(session.user.email)
    if (!user) return

    await createLink({
      originalLink,
      shortCode,
      userId: user.id
    })

    revalidatePath('/dashboard/links')
    redirect('/dashboard/links')
  } catch (error) {
    throw error
  }
}
