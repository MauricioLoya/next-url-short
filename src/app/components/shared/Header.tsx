interface Props {
  title: string
  description?: string
  actionButton?: React.ReactNode
}

export default function Header(props: Props) {
  return (
    <header className="bg-gray-50 mb-10">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {props.title}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">{props.description}</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            {props.actionButton}
          </div>
        </div>
      </div>
    </header>
  )
}
