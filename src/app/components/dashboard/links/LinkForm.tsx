'use client'
import { postLink } from '@/app/lib/links/actions/postLink'
import { Button } from '../../shared/Button'
import { Input } from '../../shared/Input'
export default function LinkForm() {
  return (
    <form action={postLink}>
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
          label={'Your link'}
          placeholder="Enter your original link"
          type="text"
        />
        <Button type="submit">Create Link</Button>
      </div>
    </form>
  )
}
