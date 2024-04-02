import { Box } from '../shared/Box'

type Props = {
  title: string
  value?: string
  children?: React.ReactNode
}
export default function InfoCard({ title, value, children }: Props) {
  return (
    <Box>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl">{value}</div>
      {children}
    </Box>
  )
}
