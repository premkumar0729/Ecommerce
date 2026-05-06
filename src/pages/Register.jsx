/**
 * Register.jsx — Signup page with validation, loading state & redirect.
 */
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { registerUser } from '../services/authService'
import { validateRegister } from '../utils/validators'
import useForm from '../hooks/useForm'
import InputField from '../components/InputField'
import Button from '../components/Button'

const Register = () => {
  const { login, isAuthenticated } = useShop()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleRegister = async ({ name, email, password }) => {
    const { user, token } = await registerUser({ name, email, password })
    login(user, token)
    navigate('/dashboard', { replace: true })
  }

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validateRegister,
    handleRegister,
  )

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <div className='border border-gray-200 rounded-lg p-8 shadow-sm bg-white'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-gray-900 prata-regular'>Create Account</h1>
            <p className='text-sm text-gray-500 mt-1'>Join us today — it's free</p>
          </div>

          {errors.general && (
            <div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-5' id='register-form' noValidate>
            <InputField
              id='reg-name'
              label='Full Name'
              name='name'
              placeholder='Jane Doe'
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <InputField
              id='reg-email'
              label='Email Address'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <InputField
              id='reg-password'
              label='Password'
              name='password'
              type='password'
              placeholder='Min 6 chars, 1 uppercase'
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <InputField
              id='reg-confirm-password'
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Repeat your password'
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <Button type='submit' loading={loading} size='lg' className='w-full mt-1'>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className='text-center text-sm text-gray-500 mt-6'>
            Already have an account?{' '}
            <Link to='/login' className='text-black font-semibold hover:underline'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
