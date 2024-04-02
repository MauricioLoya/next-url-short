import getLastClickedDays from '@/app/lib/click/sql/getLastClickedDays'
import { formatDateToLocal, generateYAxis } from '@/app/lib/utils'
type Props = {
  limit: number
  linkId: number
}

export default async function RevenueChart(props: Props) {
  const clicksByDay = await getLastClickedDays(props.linkId, props.limit)
  console.log(clicksByDay)

  const chartHeight = 350
  const { yAxisLabels, topLabel } = generateYAxis(clicksByDay)

  if (!clicksByDay || clicksByDay.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>
  }
  return (
    <div className="w-full md:col-span-4">
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (
              <p key={label}>{label.toString()}</p>
            ))}
          </div>

          {clicksByDay.map(click => (
            <div key={click.day} className="flex flex-col items-center gap-2">
              {/* bars */}
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * click.count}px`
                }}
              ></div>
              {/* x-axis */}
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {formatDateToLocal(click.day)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500 ">
            Clicks in the last {props.limit} days
          </h3>
        </div>
      </div>
    </div>
  )
}
