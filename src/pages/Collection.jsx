/**
 * Collection.jsx
 * ──────────────
 * Full product listing with:
 *  - Category & sub-category filters (sidebar)
 *  - Sort by price / newest
 *  - Live search results when search is active
 *  - Responsive grid
 */
import React, { useState, useMemo } from 'react'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'

// ── Filter constants ──────────────────────────────────────────────────────────
const CATEGORIES = ['Women', 'Men', 'Kids']
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']

const SORT_OPTIONS = [
  { value: 'relevant', label: 'Relevant' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
  { value: 'newest',   label: 'Newest First' },
]

// ── Helper checkbox ───────────────────────────────────────────────────────────
const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className='flex items-center gap-2 cursor-pointer group'>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='accent-black w-3.5 h-3.5 cursor-pointer'
    />
    <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>{label}</span>
  </label>
)

// ─────────────────────────────────────────────────────────────────────────────
const Collection = () => {
  const { products, search, showSearch, currency } = useShop()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [sortBy, setSortBy] = useState('relevant')
  const [showFilters, setShowFilters] = useState(false)

  // Toggle helper
  const toggle = (arr, setArr, value) =>
    setArr(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])

  // ── Filtered + sorted products ─────────────────────────────────────────────
  const displayed = useMemo(() => {
    let result = [...products]

    // Search filter
    if (showSearch && search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // Sub-category filter
    if (selectedSubCategories.length > 0) {
      result = result.filter(p => selectedSubCategories.includes(p.subCategory))
    }

    // Sorting
    switch (sortBy) {
      case 'low-high': result.sort((a, b) => a.price - b.price); break
      case 'high-low': result.sort((a, b) => b.price - a.price); break
      case 'newest':   result.sort((a, b) => b.date - a.date);   break
      default: break
    }

    return result
  }, [products, search, showSearch, selectedCategories, selectedSubCategories, sortBy])

  const isFiltered = selectedCategories.length > 0 || selectedSubCategories.length > 0
  const hasSearch  = showSearch && search.trim()

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSubCategories([])
    setSortBy('relevant')
  }

  return (
    <div className='py-8'>
      {/* Page header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <SectionTitle
          text1={hasSearch ? `RESULTS FOR` : 'ALL'}
          text2={hasSearch ? `"${search}"` : 'COLLECTIONS'}
          className='mb-0'
        />

        {/* Mobile: toggle filters */}
        <button
          id='toggle-filters-btn'
          className='sm:hidden text-sm border border-gray-300 px-3 py-1.5 rounded flex items-center gap-2'
          onClick={() => setShowFilters(f => !f)}
        >
          <span>☰</span> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sort dropdown */}
        <div className='flex items-center gap-2 ml-auto'>
          <label className='text-xs text-gray-500 hidden sm:block'>Sort by:</label>
          <select
            id='sort-select'
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className='border border-gray-300 text-sm px-3 py-1.5 rounded outline-none
                       hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-transparent
                       cursor-pointer bg-white'
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex gap-8'>
        {/* ── Sidebar filters ───────────────────────────────────────────── */}
        <aside
          className={`
            w-52 shrink-0 flex-col gap-6
            ${showFilters ? 'flex' : 'hidden'} sm:flex
          `}
        >
          {/* Categories */}
          <div>
            <p className='text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3'>
              Category
            </p>
            <div className='flex flex-col gap-2'>
              {CATEGORIES.map(cat => (
                <FilterCheckbox
                  key={cat}
                  label={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggle(selectedCategories, setSelectedCategories, cat)}
                />
              ))}
            </div>
          </div>

          {/* Sub-categories */}
          <div>
            <p className='text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3'>
              Type
            </p>
            <div className='flex flex-col gap-2'>
              {SUB_CATEGORIES.map(sub => (
                <FilterCheckbox
                  key={sub}
                  label={sub}
                  checked={selectedSubCategories.includes(sub)}
                  onChange={() => toggle(selectedSubCategories, setSelectedSubCategories, sub)}
                />
              ))}
            </div>
          </div>

          {/* Clear */}
          {isFiltered && (
            <button
              id='clear-filters-btn'
              onClick={clearFilters}
              className='text-xs text-red-500 hover:text-red-700 underline text-left transition-colors'
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* ── Product grid ──────────────────────────────────────────────── */}
        <div className='flex-1'>
          {/* Result count */}
          <p className='text-xs text-gray-400 mb-4'>
            {displayed.length} product{displayed.length !== 1 ? 's' : ''} found
          </p>

          {displayed.length === 0 ? (
            <EmptyState
              icon='🔍'
              title={hasSearch ? 'No products match your search' : 'No products found'}
              message={hasSearch
                ? `We couldn't find anything for "${search}". Try a different term.`
                : 'Try adjusting your filters.'}
              ctaLabel='Clear Filters'
              onCtaClick={clearFilters}
            />
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
              {displayed.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection