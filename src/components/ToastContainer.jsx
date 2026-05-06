/**
 * ToastContainer.jsx
 * ──────────────────
 * Renders toast notifications from ShopContext.
 * Place once, inside ShopContextProvider (already done in main.jsx).
 */
import React from 'react'
import { useShop } from '../context/ShopContext'

const ICONS = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
}

const COLORS = {
  success: 'bg-green-600',
  error:   'bg-red-600',
  warning: 'bg-yellow-500',
  info:    'bg-gray-800',
}

const Toast = ({ id, message, type, onClose }) => (
  <div
    id={`toast-${id}`}
    className={`
      flex items-center gap-3 px-4 py-3 rounded shadow-lg text-white text-sm
      min-w-[240px] max-w-[340px] cursor-pointer
      animate-[slideIn_0.25s_ease-out]
      ${COLORS[type] || COLORS.info}
    `}
    onClick={() => onClose(id)}
    role='alert'
  >
    <span className='text-base font-bold'>{ICONS[type] || ICONS.info}</span>
    <span className='flex-1'>{message}</span>
    <span className='opacity-70 text-xs'>✕</span>
  </div>
)

const ToastContainer = () => {
  const { toasts, removeToast } = useShop()
  if (!toasts.length) return null

  return (
    <div className='fixed bottom-6 right-6 z-[9999] flex flex-col gap-2'>
      {toasts.map(t => (
        <Toast key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>
  )
}

export default ToastContainer
