/**
 * Login.jsx — Login page with form validation, loading state & redirect.
 */
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { loginUser } from '../services/authService'
import { validateLogin } from '../utils/validators'
import useForm from '../hooks/useForm'
import InputField from '../components/InputField'
import Button from '../components/Button'

const Login = () => {
  const { login, isAuthenticated } = useShop()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to where the user came from (or dashboard) after login
  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  const handleLogin = async ({ email, password }) => {
    const { user, token } = await loginUser({ email, password })
    login(user, token)
    navigate(from, { replace: true })
  }

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin,
    handleLogin,
  )

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='border border-gray-200 rounded-lg p-8 shadow-sm bg-white'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-gray-900 prata-regular'>Welcome Back</h1>
            <p className='text-sm text-gray-500 mt-1'>Sign in to your account</p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-5' id='login-form' noValidate>
            <InputField
              id='login-email'
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
              id='login-password'
              label='Password'
              name='password'
              type='password'
              placeholder='••••••••'
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className='flex justify-end'>
              <button type='button' className='text-xs text-gray-500 hover:text-black transition-colors'>
                Forgot password?
              </button>
            </div>

            <Button type='submit' loading={loading} size='lg' className='w-full mt-1'>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <p className='text-center text-sm text-gray-500 mt-6'>
            Don't have an account?{' '}
            <Link to='/register' className='text-black font-semibold hover:underline'>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login