import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './page/ProductList';
import ProductDetail from './page/ProductDetail';
import Login from './page/Login'
;

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}
