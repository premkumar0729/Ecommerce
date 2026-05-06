/**
 * Home.jsx — Extended home page: Hero + LatestCollection + Features strip.
 */
import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/latestcollection'
import { assets } from '../assets/assets'

const FeatureItem = ({ icon, title, text }) => (
  <div className='flex flex-col items-center text-center gap-2 px-4'>
    <img src={icon} alt={title} className='w-10 h-10 object-contain' />
    <p className='font-semibold text-gray-800 text-sm'>{title}</p>
    <p className='text-gray-500 text-xs leading-relaxed'>{text}</p>
  </div>
)

const Home = () => {
  return (
    <div>
      {/* Existing Hero section — untouched */}
      <Hero />

      {/* Latest products */}
      <LatestCollection />

      {/* Features / Trust strip */}
      <section className='border-t border-gray-200 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8'>
        <FeatureItem
          icon={assets.exchange_icon}
          title='Easy Exchange Policy'
          text='We offer hassle-free exchange within 7 days of delivery.'
        />
        <FeatureItem
          icon={assets.quality_icon}
          title='7-Day Return Policy'
          text='Return any item within a week for a full refund, no questions asked.'
        />
        <FeatureItem
          icon={assets.support_img}
          title='24/7 Customer Support'
          text='Our dedicated team is here for you around the clock.'
        />
      </section>
    </div>
  )
}

export default Home