/**
 * ProductCard.jsx — Displays a single product with hover animation.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const ProductCard = ({ product }) => {
  const { currency } = useShop()
  const { _id, name, price, image } = product

  return (
    <Link
      to={`/product/${_id}`}
      className='group block cursor-pointer'
      id={`product-card-${_id}`}
    >
      {/* Image */}
      <div className='overflow-hidden rounded bg-gray-50'>
        <img
          src={image[0]}
          alt={name}
          className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
        />
      </div>
      {/* Info */}
      <div className='pt-3 pb-1'>
        <p className='text-sm text-gray-800 font-medium truncate'>{name}</p>
        <p className='text-sm font-semibold text-gray-900 mt-0.5'>
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
