import Header from '@/app/components/shared/Header'
import LinkForm from '@/app/components/dashboard/links/LinkForm'

export default function CreateLinkPage() {
  return (
    <div className="w-full">
      <Header title="🌞 Create daLink" description="Create a new link" />
      <LinkForm />
    </div>
  )
}
