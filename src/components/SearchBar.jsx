/**
 * SearchBar.jsx — Inline search bar that filters products live.
 * Designed to drop into the Navbar.
 */
import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useShop()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  // Auto-focus when opened
  useEffect(() => {
    if (showSearch) inputRef.current?.focus()
  }, [showSearch])

  const handleChange = (e) => {
    setSearch(e.target.value)
    // Navigate to collection so results are visible
    navigate('/collection')
  }

  const handleClose = () => {
    setSearch('')
    setShowSearch(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose()
  }

  if (!showSearch) return null

  return (
    <div
      id='search-bar'
      className='border-t border-b border-gray-200 bg-white py-3 px-4 flex items-center gap-3'
    >
      {/* Search icon */}
      <img src={assets.search_icon} alt='search' className='w-4 opacity-50' />

      {/* Input */}
      <input
        ref={inputRef}
        type='search'
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Search products…'
        className='flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent'
        aria-label='Search products'
        id='search-input'
      />

      {/* Clear / close */}
      <button
        id='search-close-btn'
        onClick={handleClose}
        className='opacity-50 hover:opacity-100 transition-opacity'
        aria-label='Close search'
      >
        <img src={assets.cross_icon} alt='close' className='w-3' />
      </button>
    </div>
  )
}

export default SearchBar
