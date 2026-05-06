/**
 * ProductImageGallery.jsx
 * ────────────────────────
 * Main image display + scrollable thumbnail strip.
 * Clicking a thumbnail swaps the main image.
 */
import React, { useState, useEffect } from 'react'

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Reset gallery when the product changes
  useEffect(() => { setActiveIndex(0) }, [images])

  if (!images.length) return null

  return (
    <div className='flex flex-col-reverse sm:flex-row gap-3 w-full'>
      {/* ── Thumbnail strip ─────────────────────────────────────────── */}
      <div className='flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]'>
        {images.map((src, i) => (
          <button
            key={i}
            id={`thumb-${i}`}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-2 transition-all duration-200
              ${i === activeIndex
                ? 'border-black opacity-100'
                : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={src}
              alt={`${productName} thumbnail ${i + 1}`}
              className='w-full h-full object-cover'
            />
          </button>
        ))}
      </div>

      {/* ── Main image ──────────────────────────────────────────────── */}
      <div className='flex-1 overflow-hidden rounded-lg bg-gray-50 relative group'>
        <img
          src={images[activeIndex]}
          alt={productName}
          className='w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-500
                     group-hover:scale-105'
          id='main-product-image'
        />
      </div>
    </div>
  )
}

export default ProductImageGallery
