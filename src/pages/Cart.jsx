/**
 * cart.jsx — Full cart page.
 * Shows cart items, subtotal, delivery fee, total, and checkout CTA.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const Cart = () => {
  const { cartItems, currency, deliveryFee, getCartAmount, getCartCount } = useShop()

  // Flatten cartItems: { productId: { size: qty } } → flat array
  const lineItems = Object.entries(cartItems).flatMap(([productId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => ({ productId, size, quantity }))
  )

  const subtotal = getCartAmount()
  const shipping = subtotal > 0 ? deliveryFee : 0
  const total = subtotal + shipping
  const cartCount = getCartCount()

  if (lineItems.length === 0) {
    return (
      <div className='py-10 min-h-[70vh]'>
        <SectionTitle text1='YOUR' text2='CART' />
        <EmptyState
          icon='🛒'
          title='Your cart is empty'
          message={"Looks like you haven't added anything yet. Start browsing our collection!"}
        ctaLabel='Browse Products'
        ctaTo='/collection'
        />
      </div>
    )
  }

  return (
    <div className='py-10 min-h-[70vh]'>
      <SectionTitle text1='YOUR' text2='CART' />

      <div className='flex flex-col lg:flex-row gap-10'>

        {/* ── Item list ──────────────────────────────────────────────── */}
        <div className='flex-1'>
          <p className='text-xs text-gray-400 mb-3'>{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
          <div className='border border-gray-200 rounded-lg bg-white divide-y divide-gray-100 px-4'>
            {lineItems.map(({ productId, size, quantity }) => (
              <CartItem
                key={`${productId}-${size}`}
                productId={productId}
                size={size}
                quantity={quantity}
              />
            ))}
          </div>
        </div>

        {/* ── Order summary ──────────────────────────────────────────── */}
        <div className='lg:w-80 shrink-0'>
          <div className='border border-gray-200 rounded-lg bg-white p-6 sticky top-4'>
            <h2 className='font-semibold text-gray-900 mb-5'>Order Summary</h2>

            <div className='flex flex-col gap-3 text-sm mb-5'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal ({cartCount} items)</span>
                <span>{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Delivery</span>
                <span>{shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}</span>
              </div>
              <hr className='border-gray-100' />
              <div className='flex justify-between font-bold text-gray-900 text-base'>
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon placeholder */}
            <div className='flex gap-2 mb-5'>
              <input
                id='coupon-input'
                type='text'
                placeholder='Coupon code'
                className='flex-1 border border-gray-300 rounded px-3 py-2 text-xs outline-none
                           focus:ring-1 focus:ring-black focus:border-transparent'
              />
              <button
                id='coupon-apply-btn'
                className='text-xs border border-gray-300 rounded px-3 py-2 hover:border-gray-500 transition-colors'
              >
                Apply
              </button>
            </div>

            {/* Checkout */}
            <Link to='/placeorder'>
              <Button
                id='checkout-btn'
                size='lg'
                className='w-full'
              >
                Proceed to Checkout
              </Button>
            </Link>

            <Link
              to='/collection'
              className='block text-center text-xs text-gray-400 hover:text-black mt-4 transition-colors'
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart