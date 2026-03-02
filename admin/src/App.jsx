import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddProduct from './pages/AddProducts'
import { Toaster } from 'react-hot-toast';
import EditProductPage from './pages/Edit';
import OrdersPage from './pages/OrdersPage';

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard/add-product" element={<AddProduct/>} />
        <Route path="/dashboard/edit/:id" element={<EditProductPage/>} />
        <Route path="/dashboard/orders" element={<OrdersPage/>} />
      </Routes>
    </div>
  )
}

export default App