import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as allProducts } from '../assets/assets'

// ─── Context ────────────────────────────────────────────────────────────────
export const ShopContext = createContext(null)

// ─── Hook ───────────────────────────────────────────────────────────────────
export const useShop = () => {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopContextProvider')
  return ctx
}

// ─── Provider ───────────────────────────────────────────────────────────────
const ShopContextProvider = ({ children }) => {
  const currency = '$'
  const deliveryFee = 10

  // ── Auth state (persisted to localStorage) ──────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shop_user')) || null }
    catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('shop_token') || null)

  // ── Cart state ──────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState({})

  // ── Orders state (persisted to localStorage) ────────────────────────────
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shop_orders')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('shop_orders', JSON.stringify(orders))
  }, [orders])

  // ── Search state ────────────────────────────────────────────────────────
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // ── Toast state ─────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([])

  // ── Persist auth whenever it changes ────────────────────────────────────
  useEffect(() => {
    if (user) localStorage.setItem('shop_user', JSON.stringify(user))
    else localStorage.removeItem('shop_user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('shop_token', token)
    else localStorage.removeItem('shop_token')
  }, [token])

  // ── Toast helpers ────────────────────────────────────────────────────────
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Auth helpers ─────────────────────────────────────────────────────────
  const login = useCallback((userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    addToast(`Welcome back, ${userData.name}!`, 'success')
  }, [addToast])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setCartItems({})
    addToast('Logged out successfully.', 'info')
  }, [addToast])

  const isAuthenticated = Boolean(token && user)

  // ── Cart helpers ─────────────────────────────────────────────────────────
  const addToCart = useCallback((itemId, size) => {
    if (!size) { addToast('Please select a size.', 'warning'); return }
    setCartItems(prev => {
      const updated = structuredClone(prev)
      if (!updated[itemId]) updated[itemId] = {}
      updated[itemId][size] = (updated[itemId][size] || 0) + 1
      return updated
    })
    addToast('Item added to cart!', 'success')
  }, [addToast])

  const clearCart = useCallback(() => {
    setCartItems({})
  }, [])

  // ── Order helpers ─────────────────────────────────────────────────────────
  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: 'order-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Processing',
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }, [])

  const updateCartQuantity = useCallback((itemId, size, quantity) => {
    setCartItems(prev => {
      const updated = structuredClone(prev)
      if (quantity <= 0) {
        delete updated[itemId]?.[size]
        if (updated[itemId] && Object.keys(updated[itemId]).length === 0)
          delete updated[itemId]
      } else {
        if (!updated[itemId]) updated[itemId] = {}
        updated[itemId][size] = quantity
      }
      return updated
    })
  }, [])

  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce((total, sizes) =>
      total + Object.values(sizes).reduce((s, q) => s + q, 0), 0)
  }, [cartItems])

  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [id, sizes]) => {
      const product = allProducts.find(p => p._id === id)
      if (!product) return total
      return total + Object.values(sizes).reduce((s, q) => s + product.price * q, 0)
    }, 0)
  }, [cartItems, allProducts])

  // ── Context value ────────────────────────────────────────────────────────
  const value = {
    // Data
    products: allProducts,
    currency,
    deliveryFee,
    // Auth
    user,
    token,
    isAuthenticated,
    login,
    logout,
    // Cart
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    clearCart,
    // Orders
    orders,
    addOrder,
    // Search
    search,
    setSearch,
    showSearch,
    setShowSearch,
    // Toasts
    toasts,
    addToast,
    removeToast,
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider