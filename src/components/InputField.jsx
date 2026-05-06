/**
 * InputField.jsx — Reusable labeled input with error display.
 */
import React from 'react'

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-gray-700'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border rounded px-4 py-2.5 text-sm outline-none transition-all duration-200
          focus:ring-2 focus:ring-black focus:border-transparent
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        `}
        {...props}
      />
      {error && (
        <p className='text-xs text-red-600 flex items-center gap-1'>
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

export default InputField
