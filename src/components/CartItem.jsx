/**
 * CartItem.jsx — Single row in the Cart page.
 * Shows image, name, size badge, price, quantity selector, and remove button.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import QuantitySelector from './QuantitySelector'
import { useShop } from '../context/ShopContext'

const CartItem = ({ productId, size, quantity }) => {
  const { products, currency, updateCartQuantity } = useShop()
  const product = products.find(p => p._id === productId)
  if (!product) return null

  const handleRemove = () => updateCartQuantity(productId, size, 0)
  const handleQtyChange = (qty) => updateCartQuantity(productId, size, qty)

  return (
    <div
      id={`cart-item-${productId}-${size}`}
      className='flex items-start gap-4 py-5 border-b border-gray-100 last:border-b-0'
    >
      {/* Product image */}
      <Link to={`/product/${productId}`} className='shrink-0'>
        <img
          src={product.image[0]}
          alt={product.name}
          className='w-20 h-24 object-cover rounded bg-gray-50 hover:opacity-90 transition-opacity'
        />
      </Link>

      {/* Details */}
      <div className='flex-1 min-w-0'>
        <Link
          to={`/product/${productId}`}
          className='font-medium text-gray-800 text-sm leading-snug hover:underline line-clamp-2'
        >
          {product.name}
        </Link>
        <div className='flex items-center gap-3 mt-2'>
          {/* Size badge */}
          <span className='text-xs px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600'>
            {size}
          </span>
          <span className='text-sm font-semibold text-gray-900'>
            {currency}{(product.price * quantity).toFixed(2)}
          </span>
          <span className='text-xs text-gray-400'>
            ({currency}{product.price} ea.)
          </span>
        </div>

        {/* Quantity + Remove */}
        <div className='flex items-center gap-4 mt-3'>
          <QuantitySelector value={quantity} onChange={handleQtyChange} />
          <button
            id={`remove-${productId}-${size}`}
            onClick={handleRemove}
            className='text-xs text-red-500 hover:text-red-700 underline transition-colors'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
