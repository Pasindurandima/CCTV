import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-brand">
          <h2>🛡️ Admin Dashboard</h2>
        </div>
        <ul className="admin-nav-menu">
          <li>
            <Link to="/admin/dashboard" className="admin-nav-link">
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="admin-nav-link">
              📦 Add Products
            </Link>
          </li>
          <li>
            <Link to="/admin/inventory" className="admin-nav-link">
              📋 Inventory
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="admin-nav-link">
              📈 Reports
            </Link>
          </li>
          {user && (
            <>
              <li className="admin-user-info">
                <span>👤 {user.fullName}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="admin-logout-btn">
                  🚪 Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
