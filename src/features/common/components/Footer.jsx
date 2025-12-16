<<<<<<< HEAD
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SmartCarts
            </h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for everything you need. Premium quality, best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Products</Link></li>
              <li><span className="cursor-not-allowed opacity-50">About Us</span></li>
              <li><span className="cursor-not-allowed opacity-50">Contact</span></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-white transition-colors">Shipping Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Returns & Exchanges</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">FAQ</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SmartCarts. All rights reserved.</p>
        </div>
      </div>
=======
// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="p-4 bg-gray-100 text-center">
      <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
>>>>>>> main
    </footer>
  );
};

export default Footer;