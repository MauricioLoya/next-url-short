import React from 'react'
interface Props {
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'tel'
    | 'number'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'file'
  name: string
  id: string
  required?: boolean
  label: React.ReactNode
  placeholder: string
  minLength?: number
}
export const Input = (props: Props) => {
  return (
    <label
      htmlFor={props.id}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        minLength={props.minLength ?? 0}
        type={props.type || 'text'}
        required={props.required}
        id={props.id}
        name={props.name}
        className="h-14 px-3 w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={props.placeholder}
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-50 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {props.label}
      </span>
    </label>
  )
}
