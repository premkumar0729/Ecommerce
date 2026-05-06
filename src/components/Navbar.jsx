/**
 * Navbar.jsx — Extended to include SearchBar toggle and auth-aware profile dropdown.
 */
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import SearchBar from './SearchBar'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { isAuthenticated, logout, getCartCount, showSearch, setShowSearch } = useShop()
  const navigate = useNavigate()

  const cartCount = getCartCount()

  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/account' : '/login')
  }

  return (
    <>
      <div className='flex items-center justify-between py-5 font-medium'>
        {/* Logo */}
        <Link to='/'>
          <img src={assets.logo} alt='logo' className='w-36' />
        </Link>

        {/* Desktop nav links */}
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          {[
            { to: '/',           label: 'HOME'       },
            { to: '/collection', label: 'COLLECTION' },
            { to: '/about',      label: 'ABOUT'      },
            { to: '/contact',    label: 'CONTACT'    },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
              }
            >
              <p>{label}</p>
              <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
          ))}
        </ul>

        {/* Right-side icons */}
        <div className='flex items-center gap-5'>
          {/* Search toggle */}
          <button
            id='search-toggle-btn'
            onClick={() => setShowSearch(s => !s)}
            className='hover:opacity-70 transition-opacity'
            aria-label='Toggle search'
          >
            <img src={assets.search_icon} alt='search' className='w-5 cursor-pointer' />
          </button>

          {/* Profile dropdown */}
          <div className='relative group'>
            <button
              id='profile-btn'
              onClick={handleProfileClick}
              aria-label='Account'
            >
              <img
                src={assets.profile_icon}
                alt='profile'
                className='w-5 cursor-pointer'
              />
            </button>

            {/* Dropdown */}
            <div className='absolute dropdown-menu right-0 pt-4 hidden group-hover:block z-50'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md'>
                <Link to='/account' className='cursor-pointer hover:text-black transition-colors text-sm'>
                  My Account
                </Link>
                <Link to='/order' className='cursor-pointer hover:text-black transition-colors text-sm'>
                  My Orders
                </Link>
                {isAuthenticated && (
                  <button
                    id='navbar-logout-btn'
                    onClick={logout}
                    className='cursor-pointer hover:text-black transition-colors text-sm text-left'
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to='/cart' className='relative' id='cart-nav-link'>
            <img src={assets.cart_icon} alt='cart' className='w-5 cursor-pointer' />
            {cartCount > 0 && (
              <p className='absolute right-[-5px] bottom-[-3px] text-center w-4 leading-4
                            bg-black text-white aspect-square rounded-full text-[8px]'>
                {cartCount > 99 ? '99+' : cartCount}
              </p>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            id='mobile-menu-btn'
            onClick={() => setVisible(true)}
            className='sm:hidden'
            aria-label='Open menu'
          >
            <img src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer' />
          </button>
        </div>

        {/* Mobile slide-in menu */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white
                      transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}
        >
          <div className='flex flex-col text-gray-700'>
            <div
              onClick={() => setVisible(false)}
              className='flex items-center gap-4 cursor-pointer p-4'
            >
              <img src={assets.dropdown_icon} className='h-3 rotate-180' alt='back' />
              <p>Back</p>
            </div>
            {[
              { to: '/',           label: 'Home'       },
              { to: '/collection', label: 'Collection' },
              { to: '/about',      label: 'About'      },
              { to: '/contact',    label: 'Contact'    },
              { to: '/account',    label: 'Account'    },
              { to: '/cart',       label: 'Cart'       },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setVisible(false)}
                className='py-2 pl-6 border-b border-gray-100 text-sm'
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* SearchBar — renders below the nav bar when open */}
      <SearchBar />
    </>
  )
}

export default Navbar