import React from 'react'
import ThemeLayout from './components/ThemeLayout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ShopPage from './pages/Shop'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import ScrollToTop from './components/ScrollToTop'
import CartPage from './pages/CartsPage'
import AboutPage from './pages/About'
import ContactPage from './pages/Contect'
import DeliveryPage from './pages/Delievery'
import { Toaster } from 'react-hot-toast';


const App = () => {

  return (
    // <ThemeLayout>
    <div>
      <Toaster/>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/carts" element={<CartPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
      </Routes>
      <Footer />

    </div>
    // </ThemeLayout>
  )
}

export default App