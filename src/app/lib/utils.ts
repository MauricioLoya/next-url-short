import { ClickByDay } from './click/sql/getLastClickedDays'

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export function formatClicks(clicks: number): string {
  if (clicks < 1000) {
    return `${clicks} clicks`
  } else if (clicks >= 1000 && clicks < 1000000) {
    return `${(clicks / 1000).toFixed(1).replace(/\.0$/, '')}K clicks`
  } else if (clicks >= 1000000 && clicks < 1000000000) {
    return `${(clicks / 1000000).toFixed(1).replace(/\.0$/, '')}M clicks`
  } else {
    return `${(clicks / 1000000000).toFixed(1).replace(/\.0$/, '')}B clicks`
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  } else {
    return 'An error occurred'
  }
}

export const generateYAxis = (clicks: ClickByDay[]) => {
  const yAxisLabels = []
  const highestRecord = Math.max(...clicks.map(click => click.count))
  const topLabel = Math.ceil(highestRecord)

  if (topLabel < 10) {
    for (let i = topLabel; i >= 0; i--) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 100) {
    for (let i = topLabel; i >= 0; i -= 10) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 1000) {
    for (let i = topLabel; i >= 0; i -= 100) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 10000) {
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 100000) {
    for (let i = topLabel; i >= 0; i -= 10000) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 1000000) {
    for (let i = topLabel; i >= 0; i -= 100000) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 10000000) {
    for (let i = topLabel; i >= 0; i -= 1000000) {
      yAxisLabels.push(`${i}`)
    }
  } else if (topLabel < 100000000) {
    for (let i = topLabel; i >= 0; i -= 10000000) {
      yAxisLabels.push(`${i}`)
    }
  }

  return { yAxisLabels, topLabel }
}
