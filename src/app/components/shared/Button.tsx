import React from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  children: React.ReactNode
}

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
    >
      {props.children}
    </button>
  )
}
