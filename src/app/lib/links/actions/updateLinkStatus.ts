'use server'

import { getServerSession } from 'next-auth'
import { findUserByEmail } from '../../users/sql/user'
import { checkIfLinkBelongsToUser, toggleLinkStatus } from '../sql/links'
import { revalidatePath } from 'next/cache'

export const updateLinkStatus = async (form: FormData) => {
  const session = await getServerSession()
  if (!session?.user?.email) return

  const linkId = Number(form.get('linkId')?.toString())
  const shortCode = form.get('shortCode')?.toString()
  if (!linkId || !shortCode) return
  try {
    const user = await findUserByEmail(session.user.email)
    if (!user) return
    const linkBelongsToUser = await checkIfLinkBelongsToUser(linkId, user.id)
    if (!linkBelongsToUser) return
    await toggleLinkStatus(linkId)
    revalidatePath('/dashboard' + shortCode)
    revalidatePath('/dashboard/links/' + shortCode)
  } catch (error) {
    throw error
  }
}
