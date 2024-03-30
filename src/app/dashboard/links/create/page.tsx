import Header from '@/app/components/shared/Header'
import LinkForm from '@/app/components/dasboard/links/LinkForm'

export default async function CreateLinkPage() {
  return (
    <div className="w-full">
      <Header title="Create daLink 🌞" description="Create a new link" />
      <LinkForm />
    </div>
  )
}
