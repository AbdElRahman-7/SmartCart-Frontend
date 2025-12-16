<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          SmartCarts
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
            Products
          </Link>
          {/* Placeholder for future routes */}
          <span className="text-gray-400 cursor-not-allowed">About</span>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-purple-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg animate-fade-in">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors block px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors block px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <span className="text-gray-400 px-2 py-1">About</span>
          </nav>
        </div>
      )}
=======
// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-200 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
>>>>>>> main
    </header>
  );
};

export default Header;