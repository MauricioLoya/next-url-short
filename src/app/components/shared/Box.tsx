import React from 'react'
interface Props {
  children: React.ReactNode
  className?: string
}

export const Box = (props: Props) => {
  return (
    <div className={`bg-gray-50 p-8 rounded-md ` + props.className}>
      {props.children}
    </div>
  )
}
