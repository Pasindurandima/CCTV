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
          <div className="modal-content-new" onClick={(e) => e.stopPropagation()}>
            {/* Header with Status Badge */}
            <div className="modal-header-new">
              <div className="header-left">
                <h2>Order #{selectedOrder.id}</h2>
                <span className={`status-badge-large ${selectedOrder.status?.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="close-btn-new">✕</button>
            </div>
            
            <div className="modal-body-new">
              {/* Two Column Layout */}
              <div className="order-details-grid">
                
                {/* LEFT COLUMN - Customer & Order Info */}
                <div className="left-column">
                  
                  {/* Customer Information Card */}
                  <div className="info-card">
                    <div className="card-header">
                      <h3>👤 Customer Details</h3>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span className="info-label">Name</span>
                        <span className="info-value">{selectedOrder.customerName}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Phone</span>
                        <span className="info-value">{selectedOrder.customerPhone || 'N/A'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Address</span>
                        <span className="info-value">{selectedOrder.shippingAddress || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Information Card */}
                  <div className="info-card">
                    <div className="card-header">
                      <h3>📋 Order Details</h3>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span className="info-label">Order ID</span>
                        <span className="info-value">#{selectedOrder.id}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Date</span>
                        <span className="info-value">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Time</span>
                        <span className="info-value">{new Date(selectedOrder.orderDate).toLocaleTimeString()}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Total Items</span>
                        <span className="info-value">{selectedOrder.productCount} {selectedOrder.productCount === 1 ? 'item' : 'items'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Payment</span>
                        <span className={`payment-badge-small ${selectedOrder.paymentMethod}`}>
                          {selectedOrder.paymentMethod === 'cash' ? '💵 COD' : '💳 Online'}
                        </span>
                      </div>
                      <div className="info-row highlight">
                        <span className="info-label">Total Amount</span>
                        <span className="info-value amount-large">${selectedOrder.totalAmount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Notes if exists */}
                  {selectedOrder.notes && (
                    <div className="info-card">
                      <div className="card-header">
                        <h3>📝 Notes</h3>
                      </div>
                      <div className="card-body">
                        <p className="notes-text">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN - Products & Actions */}
                <div className="right-column">
                  
                  {/* Products Ordered Card */}
                  <div className="info-card">
                    <div className="card-header">
                      <h3>🛍️ Products Ordered</h3>
                    </div>
                    <div className="card-body">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        <div className="products-list-new">
                          <table className="products-table-new">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="product-name-cell">{item.productName}</td>
                                  <td className="qty-cell">{item.quantity}</td>
                                  <td className="price-cell">${item.price.toFixed(2)}</td>
                                  <td className="subtotal-cell">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="total-row">
                                <td colSpan="3">Total</td>
                                <td className="total-cell">${selectedOrder.totalAmount?.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      ) : (
                        <div className="no-products-message">No product details available</div>
                      )}
                    </div>
                  </div>

                  {/* Status Update Card */}
                  <div className="info-card">
                    <div className="card-header">
                      <h3>🔄 Update Status</h3>
                    </div>
                    <div className="card-body">
                      <div className="status-grid">
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'PENDING')}
                          className={`status-btn-new pending ${selectedOrder.status === 'PENDING' ? 'active' : ''}`}
                          disabled={selectedOrder.status === 'PENDING'}
                        >
                          <span className="status-icon">⏳</span>
                          <span className="status-text">Pending</span>
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'PROCESSING')}
                          className={`status-btn-new processing ${selectedOrder.status === 'PROCESSING' ? 'active' : ''}`}
                          disabled={selectedOrder.status === 'PROCESSING'}
                        >
                          <span className="status-icon">🔄</span>
                          <span className="status-text">Processing</span>
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'SHIPPED')}
                          className={`status-btn-new shipped ${selectedOrder.status === 'SHIPPED' ? 'active' : ''}`}
                          disabled={selectedOrder.status === 'SHIPPED'}
                        >
                          <span className="status-icon">🚚</span>
                          <span className="status-text">Shipped</span>
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'COMPLETED')}
                          className={`status-btn-new completed ${selectedOrder.status === 'COMPLETED' ? 'active' : ''}`}
                          disabled={selectedOrder.status === 'COMPLETED'}
                        >
                          <span className="status-icon">✅</span>
                          <span className="status-text">Completed</span>
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                          className={`status-btn-new cancelled ${selectedOrder.status === 'CANCELLED' ? 'active' : ''}`}
                          disabled={selectedOrder.status === 'CANCELLED'}
                        >
                          <span className="status-icon">❌</span>
                          <span className="status-text">Cancelled</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons-container">
                    <button
                      onClick={() => window.print()}
                      className="action-btn print-btn"
                    >
                      🖨️ Print Order
                    </button>
                    <button
                      onClick={() => deleteOrder(selectedOrder.id)}
                      className="action-btn delete-btn"
                    >
                      🗑️ Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
