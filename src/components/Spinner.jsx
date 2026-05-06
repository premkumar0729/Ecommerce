/**
 * Spinner.jsx — Centered loading spinner.
 */
import React from 'react'

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-9 w-9', lg: 'h-14 w-14' }
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        className={`animate-spin text-black ${sizes[size]}`}
        viewBox='0 0 24 24'
        fill='none'
      >
        <circle className='opacity-20' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path className='opacity-80' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
      </svg>
    </div>
  )
}

export default Spinner
