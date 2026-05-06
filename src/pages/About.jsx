/**
 * About.jsx — Brand story page with mission, vision & why-us sections.
 */
import React from 'react'
import { assets } from '../assets/assets'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'

const ValueCard = ({ icon, title, text }) => (
  <div className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
    <span className='text-3xl'>{icon}</span>
    <h3 className='font-semibold text-gray-900 mt-3 mb-1'>{title}</h3>
    <p className='text-sm text-gray-600 leading-relaxed'>{text}</p>
  </div>
)

const About = () => {
  return (
    <div className='py-10'>

      {/* Hero row */}
      <div className='flex flex-col sm:flex-row gap-10 items-center mb-16'>
        <div className='sm:w-1/2'>
          <SectionTitle text1='ABOUT' text2='US' />
          <p className='text-gray-600 leading-relaxed mb-4'>
            We are a modern fashion-forward brand committed to making quality clothing
            accessible to everyone. Since our founding, we have worked with ethical
            manufacturers to bring you pieces that feel as good as they look.
          </p>
          <p className='text-gray-600 leading-relaxed mb-6'>
            Our curated collections span Women's, Men's, and Kids' categories —
            from everyday essentials to statement outerwear. Every stitch reflects
            our dedication to craftsmanship and sustainability.
          </p>
          <Link
            to='/collection'
            className='inline-block bg-black text-white text-sm px-6 py-3 rounded
                       hover:bg-gray-800 transition-colors'
          >
            Shop the Collection
          </Link>
        </div>
        <div className='sm:w-1/2'>
          <img
            src={assets.about_img}
            alt='About our brand'
            className='w-full rounded-lg object-cover max-h-[420px]'
          />
        </div>
      </div>

      {/* Mission / Vision */}
      <SectionTitle text1='OUR' text2='VALUES' />
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16'>
        <ValueCard
          icon='🎯'
          title='Our Mission'
          text='To democratise style — offering on-trend, high-quality clothing at prices that
                dont break the bank delivered straight to your door.'
        />
        <ValueCard
          icon='🔭'
          title='Our Vision'
          text='To become the most trusted fashion destination for modern families, known
                for our transparency, quality, and unwavering commitment to the customer.'
        />
        <ValueCard
          icon='🌿'
          title='Sustainability'
          text='We partner only with manufacturers who meet our ethical sourcing standards,
                and we continuously invest in reducing packaging waste.'
        />
      </div>

      {/* Why choose us */}
      <div className='bg-gray-50 rounded-xl px-8 py-10'>
        <SectionTitle text1='WHY' text2='CHOOSE US' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700'>
          {[
            ['🚚 Fast Delivery',       'Orders dispatched within 24 hours on weekdays.'],
            ['↩️ Easy Returns',         '7-day hassle-free returns, no questions asked.'],
            ['💳 Secure Payments',     'All transactions are encrypted and PCI-compliant.'],
            ['📞 24/7 Support',        'Our team is available around the clock to help you.'],
            ['🏷️ Best Price Promise', 'Found it cheaper elsewhere? We\'ll match the price.'],
            ['⭐ Verified Reviews',    'Every review is from a genuine, verified purchase.'],
          ].map(([title, desc]) => (
            <div key={title} className='flex gap-3'>
              <span className='shrink-0 text-base'>{title.split(' ')[0]}</span>
              <div>
                <p className='font-medium text-gray-900'>{title.split(' ').slice(1).join(' ')}</p>
                <p className='text-gray-500'>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About