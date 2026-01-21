import React, { useState, useEffect } from 'react';
import '../styles/SalesHistory.css';

function SalesHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch completed orders from backend
  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/sales-history');
      if (!response.ok) {
        throw new Error('Failed to fetch sales history');
      }
      const data = await response.json();
      
      // Parse product details from JSON string and transform data
      const salesHistory = data.map(sale => ({
        id: sale.orderId,
        customerName: sale.customerName,
        customerEmail: sale.customerEmail,
        customerPhone: sale.customerPhone,
        shippingAddress: sale.shippingAddress,
        productCount: sale.productCount,
        totalAmount: sale.totalAmount,
        status: 'COMPLETED',
        paymentMethod: sale.paymentMethod,
        orderDate: sale.orderDate,
        completedDate: sale.completedDate,
        items: sale.productDetails ? JSON.parse(sale.productDetails) : []
      })).sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
      
      setOrders(salesHistory);
      setFilteredOrders(salesHistory);
      setError(null);
    } catch (err) {
      console.error('Error fetching sales history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + order.productCount, 0);

  // Group orders by customer
  const customerOrders = filteredOrders.reduce((acc, order) => {
    const key = order.customerEmail;
    if (!acc[key]) {
      acc[key] = {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        orders: [],
        totalSpent: 0,
        totalOrders: 0
      };
    }
    acc[key].orders.push(order);
    acc[key].totalSpent += order.totalAmount;
    acc[key].totalOrders += 1;
    return acc;
  }, {});

  const customerList = Object.values(customerOrders);

  if (loading) {
    return (
      <div className="sales-history-container">
        <h1 className="sales-history-title">💰 Sales History</h1>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading sales history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sales-history-container">
        <h1 className="sales-history-title">💰 Sales History</h1>
        <div className="error-container">
          <p>⚠️ Error: {error}</p>
          <button onClick={fetchCompletedOrders} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sales-history-container">
      <div className="sales-history-header">
        <h1 className="sales-history-title">💰 Sales History</h1>
        <button onClick={fetchCompletedOrders} className="refresh-btn">🔄 Refresh</button>
      </div>

      {/* Statistics Cards */}
      <div className="sales-stats">
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-number">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Completed Orders</h3>
            <p className="stat-number">{totalOrders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-info">
            <h3>Items Sold</h3>
            <p className="stat-number">{totalItems}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Unique Customers</h3>
            <p className="stat-number">{customerList.length}</p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by customer name, email, phone, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search-btn">✕</button>
          )}
        </div>
      </div>

      {/* Customer Sales History */}
      {filteredOrders.length === 0 ? (
        <div className="no-results">
          <p>No completed sales found {searchTerm && 'for your search'}</p>
        </div>
      ) : (
        <div className="customers-list">
          {customerList.map((customer, index) => (
            <div key={index} className="customer-card">
              <div 
                className="customer-header" 
                onClick={() => setSelectedCustomer(selectedCustomer === index ? null : index)}
              >
                <div className="customer-info-summary">
                  <h3>👤 {customer.customerName}</h3>
                  <p className="customer-email">{customer.customerEmail}</p>
                  {customer.customerPhone && (
                    <p className="customer-phone">📱 {customer.customerPhone}</p>
                  )}
                </div>
                <div className="customer-stats">
                  <div className="customer-stat-item">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-value">{customer.totalOrders}</span>
                  </div>
                  <div className="customer-stat-item">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value amount">${customer.totalSpent.toFixed(2)}</span>
                  </div>
                  <button className="expand-btn">
                    {selectedCustomer === index ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {selectedCustomer === index && (
                <div className="customer-orders-list">
                  <h4>📋 Order History</h4>
                  <table className="orders-history-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Products</th>
                        <th>Amount</th>
                        <th>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-id-cell">#{order.id}</td>
                          <td>{formatDate(order.orderDate)}</td>
                          <td className="text-center">{order.productCount} items</td>
                          <td>
                            {order.items && order.items.length > 0 ? (
                              <div className="products-mini-list">
                                {order.items.map((item, idx) => (
                                  <span key={idx} className="product-mini-tag">
                                    {item.productName} x{item.quantity}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="no-products">N/A</span>
                            )}
                          </td>
                          <td className="amount-cell">${order.totalAmount.toFixed(2)}</td>
                          <td>
                            <span className={`payment-badge-small ${order.paymentMethod}`}>
                              {order.paymentMethod === 'cash' ? '💵 COD' : '💳 Online'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="total-label">Customer Total</td>
                        <td className="total-amount">${customer.totalSpent.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
