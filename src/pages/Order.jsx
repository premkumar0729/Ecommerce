/**
 * Order.jsx — My Orders page
 * ────────────────────────────
 * • Reads orders array from ShopContext (localStorage-persisted)
 * • Shows each order with items, totals, address, and status badge
 * • Empty state if no orders yet
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'

// ── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    Processing: 'bg-yellow-100 text-yellow-700',
    Shipped:    'bg-blue-100  text-blue-700',
    Delivered:  'bg-green-100 text-green-700',
    Cancelled:  'bg-red-100   text-red-700',
  }
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || styles.Processing}`}>
      ● {status}
    </span>
  )
}

// ── Format date ───────────────────────────────────────────────────────────────
const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch { return 'Unknown date' }
}

// ── Single order card ─────────────────────────────────────────────────────────
const OrderCard = ({ order }) => {
  const { currency } = useShop()
  const { id, createdAt, items = [], shippingAddress, totalAmount, deliveryFee, subtotal, status, paymentMethod } = order

  const methodLabels = { cod: 'Cash on Delivery', stripe: 'Card', razorpay: 'UPI / Wallet' }

  return (
    <div
      id={`order-${id}`}
      className='border border-gray-200 rounded-lg bg-white overflow-hidden
                 hover:shadow-md transition-shadow'
    >
      {/* Order header */}
      <div className='flex flex-wrap items-start justify-between gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200'>
        <div>
          <p className='text-xs text-gray-500 font-mono'>{id}</p>
          <p className='text-xs text-gray-400 mt-0.5'>{formatDate(createdAt)}</p>
        </div>
        <StatusBadge status={status || 'Processing'} />
      </div>

      {/* Items */}
      <div className='px-5 py-4 flex flex-col gap-3 border-b border-gray-100'>
        {items.map((item, i) => (
          <div key={i} className='flex items-center gap-3'>
            <img
              src={item.image}
              alt={item.name}
              className='w-12 h-14 object-cover rounded bg-gray-50 shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-800 truncate'>{item.name}</p>
              <p className='text-xs text-gray-500 mt-0.5'>
                Size: {item.size} · Qty: {item.quantity}
              </p>
            </div>
            <p className='text-sm font-semibold text-gray-900 shrink-0'>
              {currency}{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Footer: address + totals */}
      <div className='px-5 py-4 flex flex-col sm:flex-row gap-4 justify-between text-xs text-gray-600'>
        {/* Shipping address */}
        {shippingAddress && (
          <div>
            <p className='font-medium text-gray-700 mb-1'>Ship to</p>
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.address}, {shippingAddress.city}</p>
            <p>{shippingAddress.phone}</p>
          </div>
        )}

        {/* Totals + payment */}
        <div className='text-right shrink-0'>
          <div className='flex flex-col gap-1 text-gray-500 mb-2'>
            <div className='flex justify-end gap-6'>
              <span>Subtotal</span>
              <span>{currency}{(subtotal || 0).toFixed(2)}</span>
            </div>
            <div className='flex justify-end gap-6'>
              <span>Delivery</span>
              <span>{currency}{(deliveryFee || 0).toFixed(2)}</span>
            </div>
          </div>
          <div className='flex justify-end gap-6 font-bold text-gray-900 text-sm'>
            <span>Total</span>
            <span>{currency}{(totalAmount || 0).toFixed(2)}</span>
          </div>
          <p className='text-gray-400 mt-1 capitalize'>
            💳 {methodLabels[paymentMethod] || paymentMethod}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
const Order = () => {
  const { orders } = useShop()

  return (
    <div className='py-10 min-h-[70vh]'>
      <div className='flex items-center justify-between mb-2'>
        <SectionTitle text1='MY' text2='ORDERS' />
        {orders.length > 0 && (
          <p className='text-xs text-gray-400'>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon='📦'
          title="You haven't placed any orders yet"
          message='Browse our collection and add your favourites to the cart.'
          ctaLabel='Start Shopping'
          ctaTo='/collection'
        />
      ) : (
        <div className='flex flex-col gap-5'>
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}

          <div className='text-center pt-4'>
            <Link to='/collection'>
              <Button variant='outline' size='md'>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order