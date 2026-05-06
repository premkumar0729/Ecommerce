/**
 * LatestCollection.jsx — Grid of the 10 newest products on the Home page.
 */
import React, { useMemo } from 'react'
import { useShop } from '../context/ShopContext'
import ProductCard from './ProductCard'
import SectionTitle from './SectionTitle'

const LatestCollection = () => {
  const { products } = useShop()

  // Sort by date descending, take first 10
  const latest = useMemo(() =>
    [...products]
      .sort((a, b) => b.date - a.date)
      .slice(0, 10),
    [products]
  )

  return (
    <section className='py-12'>
      <div className='text-center mb-3'>
        <SectionTitle text1='LATEST' text2='COLLECTIONS' className='justify-center' />
        <p className='text-gray-500 text-sm max-w-lg mx-auto -mt-4'>
          Discover our freshest arrivals — thoughtfully crafted pieces for every style.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8'>
        {latest.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default LatestCollection
