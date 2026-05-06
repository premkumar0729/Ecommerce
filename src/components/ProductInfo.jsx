/**
 * ProductInfo.jsx
 * ────────────────
 * Right-side panel: name, price, stars, size picker,
 * quantity selector, and Add to Cart.
 */
import React, { useState } from 'react'
import { useShop } from '../context/ShopContext'
import Button from './Button'
import QuantitySelector from './QuantitySelector'
import { assets } from '../assets/assets'

// ── Star rating display ────────────────────────────────────────────────────
const StarRating = ({ rating = 4 }) => (
  <div className='flex items-center gap-1' aria-label={`Rating: ${rating} stars`}>
    {[1, 2, 3, 4, 5].map(n => (
      <img
        key={n}
        src={n <= rating ? assets.star_icon : assets.star_dull_icon}
        alt=''
        className='w-3.5'
      />
    ))}
    <span className='text-xs text-gray-400 ml-1'>(122 reviews)</span>
  </div>
)

// ── Size badge ────────────────────────────────────────────────────────────
const SizeBadge = ({ size, selected, onClick }) => (
  <button
    id={`size-${size}`}
    onClick={() => onClick(size)}
    className={`px-4 py-2 text-sm border rounded transition-all duration-150
      ${selected
        ? 'border-black bg-black text-white'
        : 'border-gray-300 text-gray-700 hover:border-gray-600'
      }`}
    aria-pressed={selected}
  >
    {size}
  </button>
)

// ── Main component ─────────────────────────────────────────────────────────
const ProductInfo = ({ product }) => {
  const { addToCart, currency } = useShop()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const { _id, name, price, description, category, subCategory, sizes = [] } = product

  const handleAddToCart = () => {
    // addToCart already shows "please select a size" toast if empty
    // We pass quantity by calling it `quantity` times
    for (let i = 0; i < quantity; i++) {
      addToCart(_id, selectedSize)
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      {/* Name */}
      <h1 className='text-2xl sm:text-3xl font-medium text-gray-900 leading-snug prata-regular'>
        {name}
      </h1>

      {/* Stars */}
      <StarRating rating={4} />

      {/* Price */}
      <p className='text-2xl font-semibold text-gray-900'>
        {currency}{price}
      </p>

      {/* Description */}
      <p className='text-gray-600 text-sm leading-relaxed border-b border-gray-100 pb-5'>
        {description}
      </p>

      {/* Category tags */}
      <div className='flex gap-2 text-xs text-gray-500'>
        <span className='px-2 py-1 bg-gray-100 rounded'>{category}</span>
        {subCategory && (
          <span className='px-2 py-1 bg-gray-100 rounded'>{subCategory}</span>
        )}
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className='text-sm font-medium text-gray-700 mb-2'>
            Select Size
            {!selectedSize && (
              <span className='text-xs text-gray-400 ml-2'>(required)</span>
            )}
          </p>
          <div className='flex flex-wrap gap-2'>
            {sizes.map(size => (
              <SizeBadge
                key={size}
                size={size}
                selected={selectedSize === size}
                onClick={setSelectedSize}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className='text-sm font-medium text-gray-700 mb-2'>Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      {/* Add to cart */}
      <Button
        id='add-to-cart-btn'
        size='lg'
        onClick={handleAddToCart}
        className='w-full sm:w-auto sm:min-w-[200px]'
      >
        Add to Cart
      </Button>

      {/* Trust badges */}
      <div className='border-t border-gray-100 pt-5 flex flex-col gap-2 text-xs text-gray-500'>
        <p>✓ 100% Original product</p>
        <p>✓ Cash on delivery available</p>
        <p>✓ Easy return & exchange within 7 days</p>
      </div>
    </div>
  )
}

export default ProductInfo
