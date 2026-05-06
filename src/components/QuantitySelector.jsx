/**
 * QuantitySelector.jsx — +/- quantity control used in Cart.
 */
import React from 'react'

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
  const decrement = () => { if (value > min) onChange(value - 1) }
  const increment = () => { if (value < max) onChange(value + 1) }

  return (
    <div className='inline-flex items-center border border-gray-300 rounded overflow-hidden'>
      <button
        id={`qty-dec-${value}`}
        onClick={decrement}
        disabled={value <= min}
        className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100
                   transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-lg leading-none'
        aria-label='Decrease quantity'
      >
        −
      </button>
      <span className='w-10 text-center text-sm font-medium text-gray-800 select-none'>
        {value}
      </span>
      <button
        id={`qty-inc-${value}`}
        onClick={increment}
        disabled={value >= max}
        className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100
                   transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-lg leading-none'
        aria-label='Increase quantity'
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
