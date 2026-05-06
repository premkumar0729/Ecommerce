/**
 * Profile.jsx — Protected user profile page with editable fields.
 */
import React, { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { updateProfile } from '../services/authService'
import { validateProfile } from '../utils/validators'
import useForm from '../hooks/useForm'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const Profile = () => {
  const { user, token, login, addToast } = useShop()
  const [editMode, setEditMode] = useState(false)

  const handleUpdate = async (values) => {
    const { user: updated } = await updateProfile(token, values)
    login(updated, token) // refreshes user in context + localStorage
    addToast('Profile updated successfully!', 'success')
    setEditMode(false)
  }

  const { values, errors, loading, handleChange, handleSubmit, reset } = useForm(
    { name: user?.name || '', email: user?.email || '' },
    validateProfile,
    handleUpdate,
  )

  const handleCancel = () => { reset(); setEditMode(false) }

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <div className='py-10 min-h-[80vh] max-w-2xl mx-auto'>
      <SectionTitle text1='MY' text2='PROFILE' />

      {/* Avatar + basic info */}
      <div className='flex items-center gap-5 mb-8'>
        <div className='w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold'>
          {avatarLetter}
        </div>
        <div>
          <p className='font-semibold text-gray-900 text-lg'>{user?.name}</p>
          <p className='text-gray-500 text-sm'>{user?.email}</p>
        </div>
      </div>

      {/* Profile form */}
      <div className='border border-gray-200 rounded-lg p-6 bg-white'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='font-semibold text-gray-800'>Account Details</h2>
          {!editMode && (
            <Button
              id='edit-profile-btn'
              variant='outline'
              size='sm'
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
        </div>

        {errors.general && (
          <div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} id='profile-form' noValidate className='flex flex-col gap-5'>
          <InputField
            id='profile-name'
            label='Full Name'
            name='name'
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            disabled={!editMode}
            required
          />
          <InputField
            id='profile-email'
            label='Email Address'
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
              <Button type='button' variant='outline' size='md' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile
