import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ShopContextProvider from './context/ShopContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* ShopContextProvider wraps everything so all pages can access auth, cart, toasts */}
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
)