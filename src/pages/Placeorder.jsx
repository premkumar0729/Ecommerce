/**
 * Placeorder.jsx — Checkout page
 * ────────────────────────────────
 * • Shows cart summary (items + totals)
 * • Collects delivery address + payment method
 * • Validates inputs, creates order, clears cart, redirects to /order
 */
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import InputField from '../components/InputField'
import EmptyState from '../components/EmptyState'

// ── Form validation ────────────────────────────────────────────────────────
const validate = ({ name, address, city, phone }) => {
  const errors = {}
  if (!name.trim())    errors.name    = 'Full name is required.'
  if (!address.trim()) errors.address = 'Street address is required.'
  if (!city.trim())    errors.city    = 'City is required.'
  if (!phone.trim())   errors.phone   = 'Phone number is required.'
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(phone.trim()))
    errors.phone = 'Enter a valid phone number.'
  return errors
}

// ── Payment method tab ─────────────────────────────────────────────────────
const PaymentTab = ({ id, label, icon, selected, onSelect }) => (
  <button
    id={`pay-${id}`}
    onClick={() => onSelect(id)}
    className={`flex items-center gap-2 border rounded px-4 py-3 text-sm transition-all
      ${selected
        ? 'border-black bg-black text-white'
        : 'border-gray-300 text-gray-600 hover:border-gray-500'
      }`}
  >
    <span>{icon}</span> {label}
  </button>
)

// ─────────────────────────────────────────────────────────────────────────────
const Placeorder = () => {
  const {
    cartItems, products, currency, deliveryFee,
    getCartAmount, getCartCount,
    addOrder, clearCart, addToast,
  } = useShop()

  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', address: '', city: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [loading, setLoading] = useState(false)

  // Flatten cart to line items with product data
  const lineItems = Object.entries(cartItems).flatMap(([productId, sizes]) =>
    Object.entries(sizes)
      .map(([size, quantity]) => {
        const product = products.find(p => p._id === productId)
        return product ? { product, size, quantity } : null
      })
      .filter(Boolean)
  )

  const subtotal = getCartAmount()
  const shipping = subtotal > 0 ? deliveryFee : 0
  const total    = subtotal + shipping
  const count    = getCartCount()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    // Guard: empty cart
    if (lineItems.length === 0) {
      addToast('Your cart is empty.', 'warning')
      return
    }

    // Validate form
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    // Simulate async (ready for real API call later)
    await new Promise(res => setTimeout(res, 800))

    // Build order object
    const orderPayload = {
      items: lineItems.map(({ product, size, quantity }) => ({
        productId:  product._id,
        name:       product.name,
        image:      product.image[0],
        price:      product.price,
        size,
        quantity,
      })),
      shippingAddress: { ...form },
      paymentMethod,
      subtotal,
      deliveryFee: shipping,
      totalAmount: total,
    }

    addOrder(orderPayload)
    clearCart()
    addToast('Order placed successfully! 🎉', 'success')
    setLoading(false)
    navigate('/order')
  }

  // ── Empty cart guard ──────────────────────────────────────────────────────
  if (lineItems.length === 0) {
    return (
      <div className='py-10 min-h-[70vh]'>
        <SectionTitle text1='PLACE' text2='ORDER' />
        <EmptyState
          icon='🛒'
          title='Nothing to checkout'
          message='Your cart is empty. Add some products first!'
          ctaLabel='Browse Collection'
          ctaTo='/collection'
        />
      </div>
    )
  }

  return (
    <div className='py-10 min-h-[70vh]'>
      <SectionTitle text1='PLACE' text2='ORDER' />

      <form id='place-order-form' onSubmit={handlePlaceOrder} noValidate>
        <div className='flex flex-col lg:flex-row gap-10'>

          {/* ── LEFT: Delivery address ───────────────────────────────── */}
          <div className='flex-1'>
            <h2 className='font-semibold text-gray-800 mb-5'>Delivery Information</h2>

            <div className='flex flex-col gap-4'>
              <InputField
                id='po-name'
                label='Full Name'
                name='name'
                placeholder='Jane Doe'
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <InputField
                id='po-address'
                label='Street Address'
                name='address'
                placeholder='123 Main Street, Apt 4B'
                value={form.address}
                onChange={handleChange}
                error={errors.address}
                required
              />
              <InputField
                id='po-city'
                label='City'
                name='city'
                placeholder='New York'
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
              <InputField
                id='po-phone'
                label='Phone Number'
                name='phone'
                type='tel'
                placeholder='+1 (800) 000-0000'
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </div>

            {/* Payment method */}
            <div className='mt-8'>
              <h2 className='font-semibold text-gray-800 mb-4'>Payment Method</h2>
              <div className='flex flex-wrap gap-3'>
                <PaymentTab
                  id='cod'
                  label='Cash on Delivery'
                  icon='💵'
                  selected={paymentMethod === 'cod'}
                  onSelect={setPaymentMethod}
                />
                <PaymentTab
                  id='stripe'
                  label='Credit / Debit Card'
                  icon='💳'
                  selected={paymentMethod === 'stripe'}
                  onSelect={setPaymentMethod}
                />
                <PaymentTab
                  id='razorpay'
                  label='UPI / Wallet'
                  icon='📱'
                  selected={paymentMethod === 'razorpay'}
                  onSelect={setPaymentMethod}
                />
              </div>
              {paymentMethod !== 'cod' && (
                <p className='text-xs text-gray-400 mt-2'>
                  ⚠ Online payment is not yet available — order will be placed as Cash on Delivery.
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT: Order summary ─────────────────────────────────── */}
          <div className='lg:w-96 shrink-0'>
            <div className='border border-gray-200 rounded-lg bg-white p-6 sticky top-4'>
              <h2 className='font-semibold text-gray-900 mb-5'>
                Order Summary ({count} item{count !== 1 ? 's' : ''})
              </h2>

              {/* Line items */}
              <div className='flex flex-col gap-3 mb-5 max-h-60 overflow-y-auto pr-1'>
                {lineItems.map(({ product, size, quantity }) => (
                  <div
                    key={`${product._id}-${size}`}
                    className='flex items-center gap-3'
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className='w-12 h-14 object-cover rounded bg-gray-50 shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-medium text-gray-800 truncate'>
                        {product.name}
                      </p>
                      <p className='text-xs text-gray-500 mt-0.5'>
                        Size: {size} · Qty: {quantity}
                      </p>
                    </div>
                    <p className='text-xs font-semibold text-gray-900 shrink-0'>
                      {currency}{(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className='border-gray-100 mb-4' />

              {/* Totals */}
              <div className='flex flex-col gap-2 text-sm mb-5'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Delivery</span>
                  <span>{currency}{shipping.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100'>
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit */}
              <Button
                id='place-order-btn'
                type='submit'
                size='lg'
                loading={loading}
                className='w-full'
              >
                {loading ? 'Placing Order…' : 'Place Order'}
              </Button>

              <Link
                to='/cart'
                className='block text-center text-xs text-gray-400 hover:text-black mt-3 transition-colors'
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Placeorder