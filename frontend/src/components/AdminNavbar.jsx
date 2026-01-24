import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Dispatch custom event to notify App component of auth change
    window.dispatchEvent(new Event('authChange'));
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white h-[70px] flex justify-center items-center text-base fixed top-0 w-full z-[999] shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center w-full max-w-[1400px] px-12">
        
         {/* Logo */}
                <Link to="/admin/dashboard" className="text-black cursor-pointer no-underline text-xl font-bold flex items-center hover:opacity-75 transition-opacity">
                  <img src="/assets/logo.jpg" alt="SecU Engineering Logo" className="h-[60px] object-contain" />
                  <div className="ml-4 flex items-center">
                    <span className="text-orange-500 font-bold text-2xl">SecU</span>
                    <span className="text-gray-800 font-normal ml-1">Engineering</span>
                  </div>
                </Link>
        {/* Navigation Links */}
        <ul className="flex items-center list-none gap-4">
          <li className="h-[70px] flex items-center">
            <Link to="/admin/dashboard" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/dashboard') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Dashboard
            </Link>
          </li>
          <li className="h-[70px] flex items-center">            <Link to="/admin/products" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/products') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Add Products
            </Link>
          </li>
          <li className="h-[70px] flex items-center">            <Link to="/admin/inventory" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/inventory') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Inventory
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/admin/orders" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/orders') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Orders
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/admin/sales-history" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/sales-history') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
            Sales
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/admin/profit-analytics" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/profit-analytics') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Analytics
            </Link>
          </li>
          <li className="h-[70px] flex items-center">
            <Link to="/admin/reports" className={`text-gray-700 no-underline px-4 py-0 h-full flex items-center transition-all hover:text-orange-500 font-medium border-b-2 ${isActive('/admin/reports') ? 'text-orange-500 border-orange-500' : 'border-transparent'}`}>
              Reports
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white no-underline px-6 py-2 h-full flex items-center transition-all hover:bg-orange-600 font-bold rounded text-sm"
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;
