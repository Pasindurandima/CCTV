import { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentSales: 156,
    avgPrice: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      // Ensure data is an array
      const productList = Array.isArray(data) ? data : [];
      setProducts(productList);
      calculateDashboardStats(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      calculateDashboardStats([]);
    }
  };

  const calculateDashboardStats = (productList) => {
    // Ensure productList is an array
    const validList = Array.isArray(productList) ? productList : [];
    const total = validList.length;
    const categories = new Set(validList.map(p => p.category));
    const totalRev = validList.reduce((sum, p) => sum + (p.price * 10), 0); // Simulated sales
    const avgPrice = total > 0 ? (validList.reduce((sum, p) => sum + p.price, 0) / total).toFixed(2) : 0;

    setStats({
      totalProducts: total,
      totalCategories: categories.size,
      totalRevenue: totalRev.toFixed(2),
      lowStockProducts: Math.floor(total * 0.15), // Simulated
      recentSales: 156,
      avgPrice: avgPrice
    });
  };

  const categoryData = Array.isArray(products) ? products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {}) : {};

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard Overview</h1>
        <p>Welcome to your admin control panel</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card primary">
          <div className="stat-icon">📦</div>
          <div className="stat-details">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">💵</div>
          <div className="stat-details">
            <h3>${stats.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📈</div>
          <div className="stat-details">
            <h3>{stats.recentSales}</h3>
            <p>Recent Sales</p>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">⚠️</div>
          <div className="stat-details">
            <h3>{stats.lowStockProducts}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-grid">
        {/* Category Distribution */}
        <div className="dashboard-card">
          <h3>📊 Products by Category</h3>
          <div className="chart-container">
            {Object.entries(categoryData).map(([category, count]) => (
              <div key={category} className="bar-item">
                <div className="bar-label">{category}</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(count / stats.totalProducts) * 100}%` }}
                  >
                    <span className="bar-value">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card">
          <h3>💹 Quick Statistics</h3>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="stat-label">Categories</span>
              <span className="stat-value">{stats.totalCategories}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Average Price</span>
              <span className="stat-value">${stats.avgPrice}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Conversion Rate</span>
              <span className="stat-value">12.5%</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Total Views</span>
              <span className="stat-value">2,547</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card full-width">
          <h3>🕐 Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <span className="activity-text">New product "Smart Camera Pro" added</span>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💰</span>
              <span className="activity-text">Sale completed: $1,299.99</span>
              <span className="activity-time">5 hours ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">⚠️</span>
              <span className="activity-text">Low stock alert: Wireless Camera</span>
              <span className="activity-time">1 day ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <span className="activity-text">Product updated: Night Vision NVR</span>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-card full-width">
          <h3>🏆 Top Selling Products</h3>
          <div className="top-products">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="top-product-item">
                <span className="product-rank">#{index + 1}</span>
                <div className="product-info-dash">
                  <p className="product-name">{product.name}</p>
                  <p className="product-category">{product.category}</p>
                </div>
                <span className="product-price">${product.price}</span>
                <span className="product-sales">{Math.floor(Math.random() * 50 + 10)} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
