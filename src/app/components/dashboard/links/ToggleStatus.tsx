'use client'

import { Link } from '@/app/lib/Definitios'
import { updateLinkStatus } from '@/app/lib/links/actions/updateLinkStatus'
import { getErrorMessage } from '@/app/lib/utils'
import toast from 'react-hot-toast'
import { SubmitButton } from '../../shared/SubmitButton'

interface Props {
  link: Link
}

export const ToggleStatus = async ({ link }: Props) => {
  return (
    <form
      action={async formData => {
        try {
          await updateLinkStatus(formData)
          toast.success('Link status updated successfully')
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="linkId" value={link.id} />
      <input type="hidden" name="shortCode" value={link.shortCode} />
      <SubmitButton> 🔄 {link.isActive ? 'Active' : 'Inactive'}</SubmitButton>
    </form>
  )
}
