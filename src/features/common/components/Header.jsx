import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

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
          <Link to="/cart" className="text-gray-600 hover:text-purple-600 font-medium transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
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
            <Link
              to="/cart"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors block px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>
            <span className="text-gray-400 px-2 py-1">About</span>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
