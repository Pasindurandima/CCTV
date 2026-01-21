import { useState, useEffect } from 'react';
import '../styles/AdminInventory.css';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    quantity: 0,
    reorderLevel: 0,
    location: ''
  });

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/inventory');
      const data = await response.json();
      setInventory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${selectedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      
      if (response.ok) {
        alert('Inventory updated successfully!');
        setShowUpdateModal(false);
        fetchInventory();
      } else {
        alert('Failed to update inventory');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Error updating inventory');
    }
  };

  const openUpdateModal = (item) => {
    setSelectedProduct(item);
    setUpdateData({
      quantity: item.quantity,
      reorderLevel: item.reorderLevel,
      location: item.location || ''
    });
    setShowUpdateModal(true);
  };

  const filteredInventory = inventory.filter(item =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <h1>📋 Inventory Management</h1>
        <p>Manage your product stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className="inventory-summary">
        <div className="summary-card">
          <h3>Total Items</h3>
          <p className="summary-number">{inventory.length}</p>
        </div>
        <div className="summary-card warning">
          <h3>Low Stock Items</h3>
          <p className="summary-number">{lowStockItems.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Stock Value</h3>
          <p className="summary-number">
            ${inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="inventory-controls">
        <input
          type="text"
          placeholder="Search by product name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <h3>⚠️ Low Stock Alert</h3>
          <p>{lowStockItems.length} items need reordering</p>
        </div>
      )}

      {/* Inventory Table */}
      <div className="inventory-table-container">
        {loading ? (
          <div className="loading">Loading inventory...</div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Unit Price</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className={item.quantity <= item.reorderLevel ? 'low-stock-row' : ''}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td className="quantity-cell">{item.quantity}</td>
                  <td>{item.reorderLevel}</td>
                  <td>${item.unitPrice?.toFixed(2)}</td>
                  <td>{item.location || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${item.quantity <= item.reorderLevel ? 'low' : 'good'}`}>
                      {item.quantity <= item.reorderLevel ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => openUpdateModal(item)} className="btn-update">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                    No inventory items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Update Inventory - {selectedProduct?.productName}</h2>
            <form onSubmit={handleUpdateStock}>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={updateData.quantity}
                  onChange={(e) => setUpdateData({ ...updateData, quantity: parseInt(e.target.value) })}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Reorder Level:</label>
                <input
                  type="number"
                  value={updateData.reorderLevel}
                  onChange={(e) => setUpdateData({ ...updateData, reorderLevel: parseInt(e.target.value) })}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={updateData.location}
                  onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                  placeholder="e.g., Warehouse A, Shelf 3"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">Save Changes</button>
                <button type="button" onClick={() => setShowUpdateModal(false)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
