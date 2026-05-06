/**
 * api.js — Centralised service layer for all API calls.
 * ───────────────────────────────────────────────────────
 * Set VITE_API_URL in your .env file when the backend is ready.
 * While MOCK_MODE = true, all calls return simulated data.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const MOCK_MODE = true  // ← flip to false when backend is live

const delay = (ms = 700) => new Promise(res => setTimeout(res, ms))

// ─── Helper ──────────────────────────────────────────────────────────────────
const request = async (method, path, body, token) => {
  if (MOCK_MODE) return null // handled per-function in mock mode

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `Request failed: ${res.status}`)
  return data
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const apiLogin = async ({ email, password }) => {
  if (MOCK_MODE) {
    await delay()
    if (!email || !password) throw new Error('Invalid credentials')
    return {
      user: { id: '1', name: email.split('@')[0], email },
      token: 'mock-jwt-' + Date.now(),
    }
  }
  return request('POST', '/auth/login', { email, password })
}

export const apiRegister = async ({ name, email, password }) => {
  if (MOCK_MODE) {
    await delay()
    return {
      user: { id: Date.now().toString(), name, email },
      token: 'mock-jwt-' + Date.now(),
    }
  }
  return request('POST', '/auth/register', { name, email, password })
}

export const apiUpdateProfile = async (token, data) => {
  if (MOCK_MODE) {
    await delay(500)
    return { user: data }
  }
  return request('PUT', '/auth/profile', data, token)
}

// ─── Products ─────────────────────────────────────────────────────────────────
// Products are currently served from assets.js (static).
// These stubs are ready for when you add a real backend.
export const apiFetchProducts = async () => {
  if (MOCK_MODE) {
    const { products } = await import('../assets/assets')
    await delay(300)
    return products
  }
  return request('GET', '/products')
}

export const apiFetchProductById = async (id) => {
  if (MOCK_MODE) {
    const { products } = await import('../assets/assets')
    await delay(200)
    return products.find(p => p._id === id) || null
  }
  return request('GET', `/products/${id}`)
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export const apiPlaceOrder = async (token, orderData) => {
  if (MOCK_MODE) {
    await delay(800)
    return { orderId: 'mock-order-' + Date.now(), status: 'confirmed' }
  }
  return request('POST', '/orders', orderData, token)
}

export const apiFetchOrders = async (token) => {
  if (MOCK_MODE) {
    await delay(400)
    return []
  }
  return request('GET', '/orders', null, token)
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export const apiSendContactMessage = async ({ name, email, message }) => {
  if (MOCK_MODE) {
    await delay(600)
    return { success: true }
  }
  return request('POST', '/contact', { name, email, message })
}
