/**
 * Account.jsx — Combined account page.
 *
 * • Not logged in  → tabbed Login / Register forms
 * • Logged in      → Profile view with edit & logout
 */
import React, { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { apiLogin, apiRegister, apiUpdateProfile } from '../services/api'
import { validateLogin, validateRegister, validateProfile } from '../utils/validators'
import useForm from '../hooks/useForm'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

// ─── Sub-component: Auth Forms ────────────────────────────────────────────────
const AuthForms = ({ onLogin }) => {
  const [tab, setTab] = useState('login') // 'login' | 'register'

  // ── Login form ─────────────────────────────────────────────────────────────
  const handleLogin = async ({ email, password }) => {
    const { user, token } = await apiLogin({ email, password })
    onLogin(user, token)
  }
  const loginForm = useForm({ email: '', password: '' }, validateLogin, handleLogin)

  // ── Register form ──────────────────────────────────────────────────────────
  const handleRegister = async ({ name, email, password }) => {
    const { user, token } = await apiRegister({ name, email, password })
    onLogin(user, token)
  }
  const regForm = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validateRegister,
    handleRegister,
  )

  return (
    <div className='max-w-md mx-auto py-10'>
      <SectionTitle text1='MY' text2='ACCOUNT' className='justify-center' />

      {/* Tabs */}
      <div className='flex border-b border-gray-200 mb-8'>
        {['login', 'register'].map(t => (
          <button
            key={t}
            id={`account-tab-${t}`}
            onClick={() => setTab(t)}
            className={`flex-1 pb-3 text-sm font-medium capitalize transition-colors
              ${tab === t
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {t === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {/* ── Login tab ────────────────────────────────────────────────── */}
      {tab === 'login' && (
        <form
          id='account-login-form'
          onSubmit={loginForm.handleSubmit}
          className='flex flex-col gap-5'
          noValidate
        >
          {loginForm.errors.general && (
            <div className='px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
              {loginForm.errors.general}
            </div>
          )}
          <InputField
            id='acct-login-email'
            label='Email Address'
            name='email'
            type='email'
            placeholder='you@example.com'
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            error={loginForm.errors.email}
            required
          />
          <InputField
            id='acct-login-password'
            label='Password'
            name='password'
            type='password'
            placeholder='••••••••'
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            error={loginForm.errors.password}
            required
          />
          <Button
            type='submit'
            loading={loginForm.loading}
            size='lg'
            className='w-full'
            id='account-login-btn'
          >
            {loginForm.loading ? 'Signing in…' : 'Sign In'}
          </Button>
          <p className='text-center text-xs text-gray-400'>
            Don't have an account?{' '}
            <button
              type='button'
              className='text-black underline'
              onClick={() => setTab('register')}
            >
              Create one
            </button>
          </p>
        </form>
      )}

      {/* ── Register tab ─────────────────────────────────────────────── */}
      {tab === 'register' && (
        <form
          id='account-register-form'
          onSubmit={regForm.handleSubmit}
          className='flex flex-col gap-5'
          noValidate
        >
          {regForm.errors.general && (
            <div className='px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
              {regForm.errors.general}
            </div>
          )}
          <InputField
            id='acct-reg-name'
            label='Full Name'
            name='name'
            placeholder='Jane Doe'
            value={regForm.values.name}
            onChange={regForm.handleChange}
            error={regForm.errors.name}
            required
          />
          <InputField
            id='acct-reg-email'
            label='Email Address'
            name='email'
            type='email'
            placeholder='you@example.com'
            value={regForm.values.email}
            onChange={regForm.handleChange}
            error={regForm.errors.email}
            required
          />
          <InputField
            id='acct-reg-password'
            label='Password'
            name='password'
            type='password'
            placeholder='Min 6 chars, 1 uppercase'
            value={regForm.values.password}
            onChange={regForm.handleChange}
            error={regForm.errors.password}
            required
          />
          <InputField
            id='acct-reg-confirm'
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            placeholder='Repeat password'
            value={regForm.values.confirmPassword}
            onChange={regForm.handleChange}
            error={regForm.errors.confirmPassword}
            required
          />
          <Button
            type='submit'
            loading={regForm.loading}
            size='lg'
            className='w-full'
            id='account-register-btn'
          >
            {regForm.loading ? 'Creating account…' : 'Create Account'}
          </Button>
          <p className='text-center text-xs text-gray-400'>
            Already have an account?{' '}
            <button
              type='button'
              className='text-black underline'
              onClick={() => setTab('login')}
            >
              Sign in
            </button>
          </p>
        </form>
      )}
    </div>
  )
}

// ─── Sub-component: Profile View ──────────────────────────────────────────────
const ProfileView = ({ user, token, onLogout, onUpdateUser }) => {
  const { addToast } = useShop()
  const [editMode, setEditMode] = useState(false)

  const handleUpdate = async (values) => {
    const { user: updated } = await apiUpdateProfile(token, values)
    onUpdateUser(updated, token)
    addToast('Profile updated!', 'success')
    setEditMode(false)
  }

  const { values, errors, loading, handleChange, handleSubmit, reset } = useForm(
    { name: user?.name || '', email: user?.email || '' },
    validateProfile,
    handleUpdate,
  )

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <div className='max-w-xl mx-auto py-10'>
      <SectionTitle text1='MY' text2='ACCOUNT' />

      {/* Avatar */}
      <div className='flex items-center gap-5 mb-8'>
        <div className='w-16 h-16 rounded-full bg-black text-white flex items-center
                        justify-center text-2xl font-bold shrink-0'>
          {avatarLetter}
        </div>
        <div>
          <p className='font-semibold text-gray-900 text-lg'>{user?.name}</p>
          <p className='text-gray-500 text-sm'>{user?.email}</p>
        </div>
      </div>

      {/* Profile form */}
      <div className='border border-gray-200 rounded-lg p-6 bg-white mb-5'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='font-semibold text-gray-800'>Account Details</h2>
          {!editMode && (
            <Button id='edit-acct-btn' variant='outline' size='sm' onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>

        {errors.general && (
          <div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
            {errors.general}
          </div>
        )}

        <form id='account-profile-form' onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
          <InputField
            id='acct-profile-name'
            label='Full Name'
            name='name'
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            disabled={!editMode}
            required
          />
          <InputField
            id='acct-profile-email'
            label='Email'
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            disabled={!editMode}
            required
          />
          {editMode && (
            <div className='flex gap-3 pt-2'>
              <Button type='submit' loading={loading} size='md'>
                {loading ? 'Saving…' : 'Save Changes'}
              </Button>
              <Button
                type='button'
                variant='outline'
                size='md'
                onClick={() => { reset(); setEditMode(false) }}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Logout */}
      <Button
        id='account-logout-btn'
        variant='outline'
        size='md'
        onClick={onLogout}
        className='w-full'
      >
        Logout
      </Button>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
const Account = () => {
  const { isAuthenticated, user, token, login, logout } = useShop()

  if (!isAuthenticated) {
    return <AuthForms onLogin={login} />
  }

  return (
    <ProfileView
      user={user}
      token={token}
      onLogout={logout}
      onUpdateUser={login}
    />
  )
}

export default Account
