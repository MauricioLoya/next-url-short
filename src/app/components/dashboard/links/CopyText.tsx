'use client'
import React from 'react'
type Props = {
  text: string
}
const CopyText: React.FC<Props> = ({ text }) => {
  const [copied, setCopied] = React.useState(false)
  const copyText = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  //   return <button onClick={copyText}>{copied ? 'Copied!' : 'Copy'}</button>
  return (
    <button
      onClick={copyText}
      className=" text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
    >
      {copied ? (
        <span id="success-message" className="inline-flex items-center">
          ✅
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">
            Copied
          </span>
        </span>
      ) : (
        <span id="default-message" className="inline-flex items-center">
          📋
          <span className="text-xs font-semibold">Copy</span>
        </span>
      )}
    </button>
  )
}

export default CopyText
