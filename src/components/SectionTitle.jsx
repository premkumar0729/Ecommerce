/**
 * SectionTitle.jsx — Reusable decorative section heading used across pages.
 */
import React from 'react'

const SectionTitle = ({ text1, text2, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 mb-8 ${className}`}>
      <div className='flex items-center gap-2'>
        <p className='text-gray-700 font-medium tracking-wide'>
          {text1} <span className='font-bold text-gray-900'>{text2}</span>
        </p>
      </div>
      <div className='flex-1 max-w-[80px] h-[1px] bg-gray-400' />
    </div>
  )
}

export default SectionTitle
