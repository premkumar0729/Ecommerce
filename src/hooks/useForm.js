/**
 * useForm.js
 * ──────────
 * Generic form hook: tracks field values, validation errors & submit loading.
 *
 * Usage:
 *   const { values, errors, loading, handleChange, handleSubmit, setError } =
 *     useForm(initialValues, validateFn, onSubmit)
 */
import { useState, useCallback } from 'react'

const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear the field error on change
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const validationErrors = validate ? validate(values) : {}
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      await onSubmit(values)
    } catch (err) {
      setErrors({ general: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }, [values, validate, onSubmit])

  const setError = useCallback((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return { values, errors, loading, handleChange, handleSubmit, setError, reset }
}

export default useForm
