import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white h-[70px] flex justify-center items-center text-base fixed top-0 w-full z-[999] shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center w-full max-w-[1400px] px-12">
        {/* Logo */}
        <Link to="/" className="text-black cursor-pointer no-underline text-xl font-bold flex items-center hover:opacity-75 transition-opacity">
          <img src="/assets/logo.jpg" alt="SecU Engineering Logo" className="h-[60px] object-contain" />
          <div className="ml-4 flex items-center">
            <span className="text-orange-500 font-bold text-2xl">SecU</span>
            <span className="text-gray-800 font-normal ml-1">Engineering</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center list-none gap-4">
          <li className="h-[70px] flex items-center">
            <Link to="/" className="text-gray-700 no-underline px-4 py-2 h-full flex items-center transition-all hover:text-orange-500 font-medium">
              Home
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/store" className="text-gray-700 no-underline px-4 py-2 h-full flex items-center transition-all hover:text-orange-500 font-medium">
              Store
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/about" className="text-gray-700 no-underline px-4 py-2 h-full flex items-center transition-all hover:text-orange-500 font-medium">
              About us
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/contact" className="text-gray-700 no-underline px-4 py-2 h-full flex items-center transition-all hover:text-orange-500 font-medium">
              Contact us
            </Link>
          </li>
        </ul>

        {/* Cart Button */}
        <Link to="/cart" className="relative">
          <button className="bg-orange-500 text-white no-underline px-6 py-2 h-full flex items-center transition-all hover:bg-orange-600 font-bold rounded text-sm">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
