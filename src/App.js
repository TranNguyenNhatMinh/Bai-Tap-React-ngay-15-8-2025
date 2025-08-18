import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './page/ProductList';
import ProductDetail from './page/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
