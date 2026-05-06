/**
 * Dashboard.jsx — Protected page shown after login.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import SectionTitle from '../components/SectionTitle'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

const StatCard = ({ label, value, icon }) => (
  <div className='border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow'>
    <p className='text-2xl mb-1'>{icon}</p>
    <p className='text-2xl font-bold text-gray-900'>{value}</p>
    <p className='text-sm text-gray-500 mt-1'>{label}</p>
  </div>
)

const Dashboard = () => {
  const { user, products, cartItems, getCartCount, getCartAmount, currency, logout } = useShop()

  // Show last 4 products as "recent"
  const recentProducts = products.slice(0, 4)

  return (
    <div className='py-10 min-h-[80vh]'>
      {/* Welcome banner */}
      <div className='bg-black text-white rounded-lg px-8 py-10 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold prata-regular'>
            Welcome back, {user?.name} 👋
          </h1>
          <p className='text-gray-300 text-sm mt-1'>{user?.email}</p>
        </div>
        <div className='flex gap-3'>
          <Link to='/profile'>
            <Button variant='outline' className='border-white text-white hover:bg-white hover:text-black' size='sm'>
              My Profile
            </Button>
          </Link>
          <Button variant='ghost' className='text-gray-300 hover:text-white' size='sm' onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Stats */}
      <SectionTitle text1='YOUR' text2='OVERVIEW' />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12'>
        <StatCard icon='🛍️' label='Total Products' value={products.length} />
        <StatCard icon='🛒' label='Cart Items' value={getCartCount()} />
        <StatCard icon='💰' label='Cart Total' value={`${currency}${getCartAmount().toFixed(2)}`} />
        <StatCard icon='📦' label='Orders' value='0' />
      </div>

      {/* Recently viewed */}
      <SectionTitle text1='RECENTLY' text2='ADDED' />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10'>
        {recentProducts.map(p => <ProductCard key={p._id} product={p} />)}
      </div>

      <div className='text-center'>
        <Link to='/collection'>
          <Button variant='outline' size='lg'>Browse All Products</Button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
