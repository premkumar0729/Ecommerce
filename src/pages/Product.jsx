/**
 * product.jsx — Full Product Details Page
 * ─────────────────────────────────────────
 * Route: /product/:productId
 *
 * • Reads productId from URL with useParams()
 * • Looks up the product from ShopContext (no extra fetch needed — data is local)
 * • Shows image gallery (left) + product info panel (right)
 * • Shows related products from the same category below
 * • Handles loading, invalid ID, and scroll-to-top on navigation
 */
import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductInfo'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'

// ─────────────────────────────────────────────────────────────────────────────
const Product = () => {
  const { productId } = useParams()
  const { products } = useShop()
  const navigate = useNavigate()

  // Scroll to top whenever the product ID changes (e.g. clicking related product)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  // Find the product — O(n) scan over local data, instant
  const product = useMemo(
    () => products.find(p => p._id === productId) || null,
    [products, productId]
  )

  // Related: same category, excluding current product, max 4
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter(p => p.category === product.category && p._id !== product._id)
      .slice(0, 4)
  }, [products, product])

  // ── Loading state (products array not yet populated) ──────────────────────
  if (!products.length) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  // ── Product not found ──────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center text-center py-16 px-4'>
        <span className='text-6xl mb-4'>🔍</span>
        <h1 className='text-xl font-semibold text-gray-800 mb-2'>Product Not Found</h1>
        <p className='text-gray-500 text-sm mb-6 max-w-xs'>
          We couldn't find a product with this ID. It may have been removed or the link is incorrect.
        </p>
        <Button id='back-to-collection-btn' onClick={() => navigate('/collection')}>
          Browse Collection
        </Button>
      </div>
    )
  }

  // ── Product page ───────────────────────────────────────────────────────────
  return (
    <div className='py-8'>

      {/* Breadcrumb */}
      <nav className='text-xs text-gray-400 mb-6 flex items-center gap-1'>
        <button onClick={() => navigate('/')} className='hover:text-black transition-colors'>
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('/collection')}
          className='hover:text-black transition-colors'
        >
          Collection
        </button>
        <span>/</span>
        <span className='text-gray-700 truncate max-w-[200px]'>{product.name}</span>
      </nav>

      {/* ── Main layout: Gallery | Info ─────────────────────────────── */}
      <div className='flex flex-col sm:flex-row gap-10 mb-16'>
        {/* Left — image gallery */}
        <div className='w-full sm:w-1/2'>
          <ProductImageGallery
            images={product.image}
            productName={product.name}
          />
        </div>

        {/* Right — product info + add to cart */}
        <div className='w-full sm:w-1/2'>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* ── Description & Reviews tabs ──────────────────────────────── */}
      <div className='mb-16'>
        <div className='flex gap-0'>
          <div className='border border-gray-300 px-5 py-3 text-sm font-medium bg-black text-white rounded-tl rounded-tr'>
            Description
          </div>
          <div className='border border-gray-300 px-5 py-3 text-sm font-medium text-gray-500 rounded-tl rounded-tr'>
            Reviews (122)
          </div>
        </div>
        <div className='border border-gray-200 rounded-b rounded-tr p-6 text-sm text-gray-600 leading-relaxed'>
          <p className='mb-3'>{product.description}</p>
          <p>
            Each piece is carefully crafted with attention to detail, ensuring premium quality and
            comfort for everyday wear. Our garments are made from sustainably sourced materials
            and are designed to last.
          </p>
        </div>
      </div>

      {/* ── Related Products ────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section>
          <SectionTitle text1='RELATED' text2='PRODUCTS' />
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {relatedProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Product