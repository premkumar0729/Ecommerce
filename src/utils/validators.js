/**
 * validators.js
 * ─────────────
 * Pure validation functions — return an errors object (empty = valid).
 */

export const validateLogin = ({ email, password }) => {
  const errors = {}
  if (!email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Password is required.'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.'
  return errors
}

export const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = {}
  if (!name.trim()) errors.name = 'Full name is required.'
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Password is required.'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.'
  else if (!/[A-Z]/.test(password)) errors.password = 'Include at least one uppercase letter.'
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.'
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

export const validateProfile = ({ name, email }) => {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required.'
  if (!email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email.'
  return errors
}

export const formatPrice = (price, currency = '$') => `${currency}${price.toFixed(2)}`
