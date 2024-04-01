'use client'
interface Props {
  children: React.ReactNode
}
import { useFormStatus } from 'react-dom'
export const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      type="submit"
      className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
    >
      {pending ? <span className="animate-pulse">...</span> : props.children}
    </button>
  )
}
