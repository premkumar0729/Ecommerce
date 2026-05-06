/**
 * Button.jsx — Reusable button with variants, sizes, and loading state.
 */
import React from 'react'

const VARIANTS = {
  primary:  'bg-black text-white hover:bg-gray-800 border border-black',
  outline:  'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  danger:   'bg-red-600 text-white hover:bg-red-700 border border-red-600',
  ghost:    'bg-transparent text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent',
}

const SIZES = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 rounded disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClass = VARIANTS[variant] || VARIANTS.primary
  const sizeClass = SIZES[size] || SIZES.md

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && (
        <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' fill='none'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
