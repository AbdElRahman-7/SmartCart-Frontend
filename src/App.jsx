<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from './features/products/pages/ProductsListPage';
import ProductDetailPage from './features/products/pages/ProductDetailsPage.tsx';
import Header from './features/common/components/Header';
import Footer from './features/common/components/Footer';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen ">
                <Header />
                <Routes>
                    <Route path="/" element={<ProductListPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
=======
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './features/products/pages/ProductsListPage';
import ProductDetailPage from './features/products/pages/ProductDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> main
