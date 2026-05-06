/**
 * EmptyState.jsx — Generic empty-state with icon, title, message and CTA.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const EmptyState = ({
  icon = '🛍️',
  title = 'Nothing here yet',
  message = '',
  ctaLabel = '',
  ctaTo = '',
  onCtaClick = null,
}) => {
  return (
    <div className='flex flex-col items-center justify-center py-24 px-4 text-center'>
      <span className='text-6xl mb-5 select-none'>{icon}</span>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>{title}</h2>
      {message && <p className='text-gray-500 text-sm max-w-xs mb-6'>{message}</p>}
      {ctaLabel && ctaTo && (
        <Link to={ctaTo}>
          <Button size='md'>{ctaLabel}</Button>
        </Link>
      )}
      {ctaLabel && onCtaClick && (
        <Button size='md' onClick={onCtaClick}>{ctaLabel}</Button>
      )}
    </div>
  )
}

export default EmptyState
