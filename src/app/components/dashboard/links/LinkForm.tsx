'use client'
import { postLink } from '@/app/lib/links/actions/postLink'
import { SubmitButton } from '../../shared/SubmitButton'
import { Input } from '../../shared/Input'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@/app/lib/utils'
export default function LinkForm() {
  return (
    <form
      action={async formData => {
        try {
          await postLink(formData)
          toast.success('Link created successfully')
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6">
        <Input
          id="original-link"
          name="originalLink"
          label={'Original Link'}
          placeholder="Enter your original link"
          required
          type="url"
        />
        <Input
          minLength={6}
          id="short-code"
          name="shortCode"
          label={'Your link (optional)'}
          placeholder="Enter your original link"
          type="text"
        />
        <small>If it keeps blank your code will be autogenerate</small>
        <SubmitButton>Create Link</SubmitButton>
      </div>
    </form>
  )
}
