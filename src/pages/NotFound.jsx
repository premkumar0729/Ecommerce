/**
 * NotFound.jsx — 404 page.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const NotFound = () => {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center py-20 px-4'>
      <p className='text-[120px] font-bold text-gray-100 leading-none select-none'>404</p>
      <h1 className='text-2xl font-bold text-gray-800 -mt-4 prata-regular'>Page Not Found</h1>
      <p className='text-gray-500 text-sm mt-3 max-w-sm'>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className='flex gap-3 mt-8'>
        <Link to='/'>
          <Button size='lg'>Go Home</Button>
        </Link>
        <Link to='/collection'>
          <Button variant='outline' size='lg'>Browse Products</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
