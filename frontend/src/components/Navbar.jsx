import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-800 h-[70px] flex justify-center items-center text-base fixed top-0 w-full z-[999] shadow-lg">
      <div className="flex justify-between items-center w-full max-w-[1300px] px-12">
        <Link to="/" className="text-white cursor-pointer no-underline text-2xl font-bold flex items-center hover:text-blue-400 transition-colors">
          E-Commerce
        </Link>
        <ul className="flex items-center list-none gap-4">
          <li className="h-[70px] flex items-center">
            <Link to="/" className="text-white no-underline px-4 py-2 h-full flex items-center transition-all hover:text-blue-400 hover:-translate-y-0.5">
              Home
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/store" className="text-white no-underline px-4 py-2 h-full flex items-center transition-all hover:text-blue-400 hover:-translate-y-0.5">
              Store
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/about" className="text-white no-underline px-4 py-2 h-full flex items-center transition-all hover:text-blue-400 hover:-translate-y-0.5">
              About Us
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/contact" className="text-white no-underline px-4 py-2 h-full flex items-center transition-all hover:text-blue-400 hover:-translate-y-0.5">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
