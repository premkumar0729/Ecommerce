import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout
import Navbar from './components/Navbar'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages — public
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/product'
import Cart from './pages/cart'
import Order from './pages/Order'
import Placeorder from './pages/Placeorder'
import NotFound from './pages/NotFound'

// Pages — protected
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />

      <Routes>
        {/* ── Public routes ─────────────────────────────────────────── */}
        <Route path='/'            element={<Home />} />
        <Route path='/login'       element={<Login />} />
        <Route path='/register'    element={<Register />} />
        <Route path='/account'     element={<Account />} />
        <Route path='/collection'  element={<Collection />} />
        <Route path='/about'       element={<About />} />
        <Route path='/contact'     element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart'        element={<Cart />} />
        <Route path='/order'       element={<Order />} />
        <Route path='/placeorder'  element={<Placeorder />} />

        {/* ── Protected routes ──────────────────────────────────────── */}
        <Route path='/dashboard'   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/profile'     element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* ── 404 ───────────────────────────────────────────────────── */}
        <Route path='*'            element={<NotFound />} />
      </Routes>

      {/* Global toast notification system */}
      <ToastContainer />
    </div>
  )
}

export default App