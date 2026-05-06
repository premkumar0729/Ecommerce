/**
 * Contact.jsx — Contact form + company info panel.
 */
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { apiSendContactMessage } from '../services/api'
import SectionTitle from '../components/SectionTitle'
import InputField from '../components/InputField'
import Button from '../components/Button'

// ── Validation ────────────────────────────────────────────────────────────────
const validate = ({ name, email, message }) => {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required.'
  if (!email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email.'
  if (!message.trim()) errors.message = 'Message is required.'
  else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

// ─────────────────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      await apiSendContactMessage(form)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setErrors({ general: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='py-10'>
      <SectionTitle text1='CONTACT' text2='US' />

      <div className='flex flex-col sm:flex-row gap-10'>
        {/* ── Company info ────────────────────────────────────────────── */}
        <div className='sm:w-2/5'>
          <img
            src={assets.contact_img}
            alt='Contact us'
            className='w-full rounded-lg object-cover max-h-[300px] mb-6'
          />

          <div className='flex flex-col gap-4 text-sm text-gray-600'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>📍 Our Store</p>
              <p>54709 Willms Station<br />Suite 350, Washington, USA</p>
            </div>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>📞 Phone</p>
              <p>+1 (800) 000-0000</p>
            </div>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>✉️ Email</p>
              <p>hello@forever.com</p>
            </div>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>🕐 Business Hours</p>
              <p>Mon – Fri: 9 AM – 6 PM EST<br />Sat – Sun: 10 AM – 4 PM EST</p>
            </div>
          </div>
        </div>

        {/* ── Contact form ─────────────────────────────────────────────── */}
        <div className='flex-1'>
          {submitted ? (
            /* Success state */
            <div className='flex flex-col items-center justify-center h-full text-center py-16'>
              <span className='text-5xl mb-4'>✅</span>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>Message Sent!</h2>
              <p className='text-gray-500 text-sm mb-6'>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button
                id='send-another-btn'
                variant='outline'
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              id='contact-form'
              onSubmit={handleSubmit}
              className='flex flex-col gap-5'
              noValidate
            >
              <h2 className='text-lg font-semibold text-gray-800'>Send us a message</h2>

              {errors.general && (
                <div className='px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700'>
                  {errors.general}
                </div>
              )}

              <InputField
                id='contact-name'
                label='Full Name'
                name='name'
                placeholder='Jane Doe'
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <InputField
                id='contact-email'
                label='Email Address'
                name='email'
                type='email'
                placeholder='you@example.com'
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              {/* Textarea (not using InputField since it's a textarea) */}
              <div className='flex flex-col gap-1'>
                <label htmlFor='contact-message' className='text-sm font-medium text-gray-700'>
                  Message <span className='text-red-500'>*</span>
                </label>
                <textarea
                  id='contact-message'
                  name='message'
                  rows={5}
                  placeholder='Tell us how we can help…'
                  value={form.message}
                  onChange={handleChange}
                  className={`border rounded px-4 py-2.5 text-sm outline-none transition-all duration-200
                    resize-none focus:ring-2 focus:ring-black focus:border-transparent
                    ${errors.message
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                />
                {errors.message && (
                  <p className='text-xs text-red-600'>⚠ {errors.message}</p>
                )}
              </div>

              <Button
                id='contact-submit-btn'
                type='submit'
                loading={loading}
                size='lg'
                className='self-start'
              >
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact