import React, { useState, useEffect } from 'react';
import '../styles/AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPayment, setFilterPayment] = useState('all'); // all, cash, online
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed, cancelled
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      // Sort by date, newest first
      const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        // Update the orders list immediately
        setOrders(orders.map(order => 
          order.id === orderId ? updatedOrder : order
        ));
        // Update selected order if it's the current one
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        // Show success message
        const statusEmoji = {
          'PENDING': '⏳',
          'PROCESSING': '🔄',
          'SHIPPED': '🚚',
          'COMPLETED': '✅',
          'CANCELLED': '❌'
        };
        alert(`${statusEmoji[newStatus] || '✓'} Order #${orderId} status updated to ${newStatus}`);
      } else {
        const errorText = await response.text();
        alert(`Failed to update order status: ${errorText || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error updating order:', err);
      alert(`Error updating order status: ${err.message}`);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm(`⚠️ Are you sure you want to delete Order #${orderId}?\n\nThis action cannot be undone.`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the order from the local state immediately
          setOrders(orders.filter(order => order.id !== orderId));
          setSelectedOrder(null);
          alert(`🗑️ Order #${orderId} has been deleted successfully`);
        } else {
          const errorText = await response.text();
          alert(`Failed to delete order: ${errorText || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Error deleting order:', err);
        alert(`Error deleting order: ${err.message}`);
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const paymentMatch = filterPayment === 'all' || order.paymentMethod === filterPayment;
    const statusMatch = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    return paymentMatch && statusMatch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="admin-orders-container">
        <h1 className="admin-orders-title">📦 Order Management</h1>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders-container">
        <h1 className="admin-orders-title">📦 Order Management</h1>
        <div className="error-container">
          <p>⚠️ Error: {error}</p>
          <button onClick={fetchOrders} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <h1 className="admin-orders-title">📦 Order Management</h1>
        <button onClick={fetchOrders} className="refresh-btn">🔄 Refresh</button>
      </div>

      {/* Statistics Cards */}
      <div className="order-stats">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-number">{orders.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-number">{orders.filter(o => o.status === 'PENDING').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <h3>Cash on Delivery</h3>
            <p className="stat-number">{orders.filter(o => o.paymentMethod === 'cash').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <div className="stat-info">
            <h3>Online Payment</h3>
            <p className="stat-number">{orders.filter(o => o.paymentMethod === 'online').length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Payment Method:</label>
          <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
            <option value="all">All Payments</option>
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found matching the filters</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} onClick={() => setSelectedOrder(order)} className="order-row">
                  <td className="order-id">#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>
                    <div className="contact-info">
                      <div>{order.customerEmail}</div>
                      <div className="phone">{order.customerPhone || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="items-count">
                      {order.productCount} {order.productCount === 1 ? 'item' : 'items'}
                    </span>
                  </td>
                  <td className="amount">${order.totalAmount?.toFixed(2)}</td>
                  <td>
                    <span className={`payment-badge ${order.paymentMethod}`}>
                      {order.paymentMethod === 'cash' ? '💵 COD' : '💳 Online'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="date">{formatDate(order.orderDate)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="view-btn"
                        title="View Details"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">✕</button>
            </div>
            
            <div className="modal-body">
              {/* Customer Information */}
              <div className="detail-section">
                <h3>👤 Customer Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedOrder.customerPhone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Address:</label>
                    <span>{selectedOrder.shippingAddress || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="detail-section">
                <h3>📦 Order Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Order ID:</label>
                    <span>#{selectedOrder.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Order Date:</label>
                    <span>{formatDate(selectedOrder.orderDate)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total Items:</label>
                    <span>{selectedOrder.productCount} {selectedOrder.productCount === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Products Ordered:</label>
                    <div className="products-table-container">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        <table className="products-ordered-table">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Product Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.productName}</td>
                                <td className="text-center">{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="no-items-message">No product details available</div>
                      )}
                    </div>
                  </div>
                  <div className="detail-item">
                    <label>Total Amount:</label>
                    <span className="amount">${selectedOrder.totalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Payment Method:</label>
                    <span className={`payment-badge ${selectedOrder.paymentMethod}`}>
                      {selectedOrder.paymentMethod === 'cash' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedOrder.status?.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Items */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="detail-section">
                  <h3>🛍️ Ordered Products</h3>
                  <div className="order-items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="order-item-card">
                        <div className="order-item-info">
                          <h4 className="product-name">{item.productName}</h4>
                          <div className="item-details">
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            <span className="item-price">@ ${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="item-subtotal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <div className="order-total-row">
                      <span className="total-label">Total:</span>
                      <span className="total-amount">${selectedOrder.totalAmount?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="detail-section">
                  <h3>📝 Order Notes</h3>
                  <p className="notes">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Update Status */}
              <div className="detail-section">
                <h3>🔄 Update Order Status</h3>
                <div className="status-actions">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'PENDING')}
                    className={`status-btn pending ${selectedOrder.status === 'PENDING' ? 'active' : ''}`}
                    disabled={selectedOrder.status === 'PENDING'}
                    title={selectedOrder.status === 'PENDING' ? 'Current status' : 'Set to Pending'}
                  >
                    ⏳ Pending
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'PROCESSING')}
                    className={`status-btn processing ${selectedOrder.status === 'PROCESSING' ? 'active' : ''}`}
                    disabled={selectedOrder.status === 'PROCESSING'}
                    title={selectedOrder.status === 'PROCESSING' ? 'Current status' : 'Set to Processing'}
                  >
                    🔄 Processing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'SHIPPED')}
                    className={`status-btn shipped ${selectedOrder.status === 'SHIPPED' ? 'active' : ''}`}
                    disabled={selectedOrder.status === 'SHIPPED'}
                    title={selectedOrder.status === 'SHIPPED' ? 'Current status' : 'Set to Shipped'}
                  >
                    🚚 Shipped
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'COMPLETED')}
                    className={`status-btn completed ${selectedOrder.status === 'COMPLETED' ? 'active' : ''}`}
                    disabled={selectedOrder.status === 'COMPLETED'}
                    title={selectedOrder.status === 'COMPLETED' ? 'Current status' : 'Set to Completed'}
                  >
                    ✅ Completed
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                    className={`status-btn cancelled ${selectedOrder.status === 'CANCELLED' ? 'active' : ''}`}
                    disabled={selectedOrder.status === 'CANCELLED'}
                    title={selectedOrder.status === 'CANCELLED' ? 'Current status' : 'Set to Cancelled'}
                  >
                    ❌ Cancelled
                  </button>
                </div>
              </div>

              {/* Delete Order */}
              <div className="detail-section">
                <button
                  onClick={() => deleteOrder(selectedOrder.id)}
                  className="delete-order-btn"
                >
                  🗑️ Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
