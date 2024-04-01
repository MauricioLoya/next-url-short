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
