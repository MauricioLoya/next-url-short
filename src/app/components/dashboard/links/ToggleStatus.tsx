'use client'

import { Link } from '@/app/lib/Definitios'
import { Button } from '../../shared/Button'
import { updateLinkStatus } from '@/app/lib/links/actions/updateLinkStatus'

interface Props {
  link: Link
}

export const ToggleStatus = async ({ link }: Props) => {
  return (
    <form action={updateLinkStatus} className="flex items-center gap-2">
      <input type="hidden" name="linkId" value={link.id} />
      <input type="hidden" name="shortCode" value={link.shortCode} />
      <Button type="submit">{link.isActive ? 'Active' : 'Inactive'}</Button>
    </form>
  )
}
