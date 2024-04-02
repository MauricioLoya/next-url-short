import InfoCard from './InfoCard'

export default function DashboardPageSkeleton() {
  return (
    <div>
      <header className="bg-gray-50 mb-10 rounded-md">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="invisible text-2xl font-bold text-gray-900 sm:text-3xl">
                Dashboard
              </h1>

              <p className="invisible mt-1.5 text-sm text-gray-500">
                Welcome to your dashboard. Here you can see all your links and
                their performance.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              {/* {props.actionButton} */}
            </div>
          </div>
        </div>
      </header>
      <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-4">
        <InfoCard title="" value="" />
        <InfoCard title="" value="" />
        <InfoCard title="" value="" />
        <InfoCard title="" value="" />
      </div>
    </div>
  )
}
