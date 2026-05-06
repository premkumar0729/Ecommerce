/**
 * authService.js
 * ──────────────
 * Handles all auth-related API calls.
 * Switch MOCK_MODE to false and set BASE_URL when your backend is ready.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const MOCK_MODE = true  // ← flip to false when backend is live

// Simulate network delay in mock mode
const delay = (ms = 800) => new Promise(res => setTimeout(res, ms))

// ── Login ────────────────────────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  if (MOCK_MODE) {
    await delay()
    // Accept any valid-looking credentials in mock mode
    if (!email || !password) throw new Error('Invalid credentials')
    return {
      user: { id: '1', name: email.split('@')[0], email },
      token: 'mock-jwt-token-' + Date.now(),
    }
  }

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
}

// ── Register ─────────────────────────────────────────────────────────────────
export const registerUser = async ({ name, email, password }) => {
  if (MOCK_MODE) {
    await delay()
    return {
      user: { id: '1', name, email },
      token: 'mock-jwt-token-' + Date.now(),
    }
  }

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data
}

// ── Update Profile ────────────────────────────────────────────────────────────
export const updateProfile = async (token, profileData) => {
  if (MOCK_MODE) {
    await delay(600)
    return { user: profileData }
  }

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Update failed')
  return data
}
