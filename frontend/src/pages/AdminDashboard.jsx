import { useState, useEffect } from 'react';

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
    <div className="w-full bg-white pt-0">
   

      {/* Main Content */}
      <section className="py-16 px-5 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Products Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border-t-4 border-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Products</p>
                  <h3 className="text-4xl font-bold text-gray-800">{stats.totalProducts}</h3>
                  <p className="text-xs text-gray-500 mt-2">📦 In inventory</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <img src="/assets/total products.png" alt="Total Products" className="h-12 w-12 object-contain" />
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border-t-4 border-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
                  <h3 className="text-4xl font-bold text-gray-800">${stats.totalRevenue}</h3>
                  <p className="text-xs text-gray-500 mt-2">💵 This month</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <img src="/assets/total revenue.png" alt="Total Revenue" className="h-12 w-12 object-contain" />
                </div>
              </div>
            </div>

            {/* Recent Sales Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border-t-4 border-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Recent Sales</p>
                  <h3 className="text-4xl font-bold text-gray-800">{stats.recentSales}</h3>
                  <p className="text-xs text-gray-500 mt-2">📈 Orders completed</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <img src="/assets/recent sales.png" alt="Recent Sales" className="h-12 w-12 object-contain" />
                </div>
              </div>
            </div>

            {/* Low Stock Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border-t-4 border-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Low Stock Items</p>
                  <h3 className="text-4xl font-bold text-gray-800">{stats.lowStockProducts}</h3>
                  <p className="text-xs text-gray-500 mt-2">⚠️ Need attention</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <img src="/assets/low stock.png" alt="Low Stock" className="h-12 w-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Category Distribution */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📊 Products by Category
              </h3>
              <div className="space-y-4">
                {Object.entries(categoryData).length > 0 ? (
                  Object.entries(categoryData).map(([category, count]) => {
                    const percentage = (count / stats.totalProducts) * 100;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-700">{category}</span>
                          <span className="bg-orange-100 text-blue-orange px-3 py-1 rounded-full text-sm font-bold">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-white-500 h-full transition-all duration-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No category data available</p>
                )}
              </div>
            </div>

            {/* Quick Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                💹 Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br orange-50 to-orange-200 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Categories</p>
                  <p className="text-3xl font-bold text-black">{stats.totalCategories}</p>
                </div>
                <div className="bg-gradient-to-br orange-50 to-orange-200 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Avg Price</p>
                  <p className="text-3xl font-bold text-black-600">${stats.avgPrice}</p>
                </div>
                <div className="bg-gradient-to-br orange-50 to-orange-200 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Conversion</p>
                  <p className="text-3xl font-bold text-black-600">12.5%</p>
                </div>
                <div className="bg-gradient-to-br orange-50 to-orange-200 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-black-600">2,547</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🕐 Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg hover:shadow-md transition-all">
                <span className="text-2xl">✅</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">New product "Smart Camera Pro" added</p>
                  <p className="text-sm text-gray-600">Product inventory updated</p>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg hover:shadow-md transition-all">
                <span className="text-2xl">💰</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Sale completed: $1,299.99</p>
                  <p className="text-sm text-gray-600">CCTV camera package order</p>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded">5 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg hover:shadow-md transition-all">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Low stock alert: Wireless Camera</p>
                  <p className="text-sm text-gray-600">Inventory below minimum threshold</p>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded">1 day ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg hover:shadow-md transition-all">
                <span className="text-2xl">📝</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Product updated: Night Vision NVR</p>
                  <p className="text-sm text-gray-600">Product specifications modified</p>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded">2 days ago</span>
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🏆 Top Selling Products
            </h3>
            <div className="space-y-3">
              {products.slice(0, 5).length > 0 ? (
                products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold rounded-full">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${product.price}</p>
                      <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50 + 10)} sales</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No products available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
