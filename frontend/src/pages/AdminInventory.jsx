import { useState, useEffect } from 'react';
import '../styles/AdminInventory.css';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    quantity: 0,
    reorderLevel: 0
  });
  const [adjustData, setAdjustData] = useState({
    type: 'add',
    amount: 0,
    reason: ''
  });
  const [newInventory, setNewInventory] = useState({
    productId: '',
    productName: '',
    quantity: 0,
    reorderLevel: 10,
    unitPrice: 0
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

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInventory)
      });
      
      if (response.ok) {
        alert('Inventory added successfully!');
        setShowAddModal(false);
        setNewInventory({
          productId: '',
          productName: '',
          quantity: 0,
          reorderLevel: 10,
          unitPrice: 0
        });
        fetchInventory();
      } else {
        const error = await response.text();
        alert('Failed to add inventory: ' + error);
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('Error adding inventory');
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

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${selectedProduct.id}/adjust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adjustData)
      });
      
      if (response.ok) {
        alert('Stock adjusted successfully!');
        setShowAdjustModal(false);
        setAdjustData({ type: 'add', amount: 0, reason: '' });
        fetchInventory();
      } else {
        const error = await response.text();
        alert('Failed to adjust stock: ' + error);
      }
    } catch (error) {
      console.error('Error adjusting stock:', error);
      alert('Error adjusting stock');
    }
  };

  const handleDeleteInventory = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/inventory/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Inventory deleted successfully!');
          fetchInventory();
        } else {
          alert('Failed to delete inventory');
        }
      } catch (error) {
        console.error('Error deleting inventory:', error);
        alert('Error deleting inventory');
      }
    }
  };

  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    const product = products.find(p => p.id === productId);
    if (product) {
      setNewInventory({
        ...newInventory,
        productId: product.id,
        productName: product.name,
        unitPrice: product.price
      });
    }
  };

  const openUpdateModal = (item) => {
    setSelectedProduct(item);
    setUpdateData({
      quantity: item.quantity,
      reorderLevel: item.reorderLevel
    });
    setShowUpdateModal(true);
  };

  const openAdjustModal = (item) => {
    setSelectedProduct(item);
    setAdjustData({ type: 'add', amount: 0, reason: '' });
    setShowAdjustModal(true);
  };

  const filteredInventory = inventory.filter(item =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <div>
          <h1>📋 Inventory Management</h1>
          <p>Manage your product stock levels and locations</p>
        </div>
        <button className="btn-add-inventory" onClick={() => setShowAddModal(true)}>
          ➕ Add Inventory
        </button>
      </div>

      {/* Summary Cards */}
      <div className="inventory-summary">
        <div className="summary-card total">
          <div className="card-icon">📦</div>
          <div className="card-info">
            <h3>Total Items</h3>
            <p className="summary-number">{inventory.length}</p>
            <span className="summary-subtitle">Unique Products</span>
          </div>
        </div>
        <div className="summary-card quantity">
          <div className="card-icon">🔢</div>
          <div className="card-info">
            <h3>Total Quantity</h3>
            <p className="summary-number">{totalQuantity}</p>
            <span className="summary-subtitle">Units in Stock</span>
          </div>
        </div>
        <div className="summary-card warning">
          <div className="card-icon">⚠️</div>
          <div className="card-info">
            <h3>Low Stock Items</h3>
            <p className="summary-number">{lowStockItems.length}</p>
            <span className="summary-subtitle">Need Reordering</span>
          </div>
        </div>
        <div className="summary-card value">
          <div className="card-icon">💰</div>
          <div className="card-info">
            <h3>Total Stock Value</h3>
            <p className="summary-number">Rs {totalValue.toFixed(2)}</p>
            <span className="summary-subtitle">Current Worth</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="inventory-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>✖</button>
          )}
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h3>Low Stock Alert</h3>
            <p>{lowStockItems.length} items are at or below reorder level and need attention</p>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="inventory-table-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading inventory...</p>
          </div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Unit Price</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className={item.quantity <= item.reorderLevel ? 'low-stock-row' : ''}>
                  <td className="id-cell">{item.productId}</td>
                  <td className="product-cell"><strong>{item.productName}</strong></td>
                  <td className="quantity-cell">
                    <span className={`quantity-badge ${item.quantity <= item.reorderLevel ? 'low' : ''}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="reorder-cell">{item.reorderLevel}</td>
                  <td className="price-cell">Rs {item.unitPrice?.toFixed(2)}</td>
                  <td className="value-cell">Rs {(item.quantity * item.unitPrice).toFixed(2)}</td>
                  <td className="status-cell">
                    <span className={`status-badge ${item.quantity <= item.reorderLevel ? 'low' : item.quantity > item.reorderLevel * 2 ? 'high' : 'good'}`}>
                      {item.quantity <= item.reorderLevel ? '🔴 Low Stock' : 
                       item.quantity > item.reorderLevel * 2 ? '🟢 Overstocked' : '🟡 In Stock'}
                    </span>
                  </td>
                  <td className="date-cell">{new Date(item.lastUpdated).toLocaleString()}</td>
                  <td className="actions-cell">
                    <button onClick={() => openAdjustModal(item)} className="btn-adjust" title="Adjust Stock">
                      📊
                    </button>
                    <button onClick={() => openUpdateModal(item)} className="btn-edit" title="Edit">
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteInventory(item.id)} className="btn-delete" title="Delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-state">
                    <div className="empty-icon">📦</div>
                    <p>No inventory items found</p>
                    <button className="btn-add-first" onClick={() => setShowAddModal(true)}>
                      Add Your First Item
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Inventory Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ Add New Inventory</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✖</button>
            </div>
            <form onSubmit={handleAddInventory}>
              <div className="form-group">
                <label>Select Product: *</label>
                <select
                  value={newInventory.productId}
                  onChange={handleProductSelect}
                  required
                >
                  <option value="">Choose a product...</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - Rs {product.price}
                    </option>
                  ))}
                </select>
              </div>
              
              {newInventory.productId && (
                <>
                  <div className="form-group">
                    <label>Product Name:</label>
                    <input
                      type="text"
                      value={newInventory.productName}
                      readOnly
                      className="readonly-input"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Initial Quantity: *</label>
                      <input
                        type="number"
                        value={newInventory.quantity}
                        onChange={(e) => setNewInventory({ ...newInventory, quantity: parseInt(e.target.value) || 0 })}
                        required
                        min="0"
                        placeholder="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Reorder Level: *</label>
                      <input
                        type="number"
                        value={newInventory.reorderLevel}
                        onChange={(e) => setNewInventory({ ...newInventory, reorderLevel: parseInt(e.target.value) || 0 })}
                        required
                        min="0"
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Unit Price:</label>
                    <input
                      type="number"
                      value={newInventory.unitPrice}
                      readOnly
                      className="readonly-input"
                      step="0.01"
                    />
                  </div>
                </>
              )}
              
              <div className="modal-actions">
                <button type="submit" className="btn-save" disabled={!newInventory.productId}>
                  ✅ Add Inventory
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel">
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Update Inventory - {selectedProduct?.productName}</h2>
              <button className="modal-close" onClick={() => setShowUpdateModal(false)}>✖</button>
            </div>
            <form onSubmit={handleUpdateStock}>
              <div className="form-group">
                <label>Quantity: *</label>
                <input
                  type="number"
                  value={updateData.quantity}
                  onChange={(e) => setUpdateData({ ...updateData, quantity: parseInt(e.target.value) || 0 })}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Reorder Level: *</label>
                <input
                  type="number"
                  value={updateData.reorderLevel}
                  onChange={(e) => setUpdateData({ ...updateData, reorderLevel: parseInt(e.target.value) || 0 })}
                  required
                  min="0"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">💾 Save Changes</button>
                <button type="button" onClick={() => setShowUpdateModal(false)} className="btn-cancel">
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustModal && (
        <div className="modal-overlay" onClick={() => setShowAdjustModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📊 Adjust Stock - {selectedProduct?.productName}</h2>
              <button className="modal-close" onClick={() => setShowAdjustModal(false)}>✖</button>
            </div>
            <div className="current-stock-info">
              <p>Current Stock: <strong>{selectedProduct?.quantity}</strong> units</p>
            </div>
            <form onSubmit={handleAdjustStock}>
              <div className="form-group">
                <label>Adjustment Type: *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="add"
                      checked={adjustData.type === 'add'}
                      onChange={(e) => setAdjustData({ ...adjustData, type: e.target.value })}
                    />
                    <span className="radio-text">➕ Add Stock (Received)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="remove"
                      checked={adjustData.type === 'remove'}
                      onChange={(e) => setAdjustData({ ...adjustData, type: e.target.value })}
                    />
                    <span className="radio-text">➖ Remove Stock (Sold/Damaged)</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Amount: *</label>
                <input
                  type="number"
                  value={adjustData.amount}
                  onChange={(e) => setAdjustData({ ...adjustData, amount: parseInt(e.target.value) || 0 })}
                  required
                  min="1"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="form-group">
                <label>Reason: *</label>
                <textarea
                  value={adjustData.reason}
                  onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                  required
                  placeholder="e.g., Received new shipment, Sold to customer, Damaged goods"
                  rows="3"
                />
              </div>
              <div className="adjustment-preview">
                <p>New Stock Level: <strong>
                  {adjustData.type === 'add' 
                    ? selectedProduct?.quantity + (adjustData.amount || 0)
                    : selectedProduct?.quantity - (adjustData.amount || 0)}
                </strong> units</p>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">✅ Apply Adjustment</button>
                <button type="button" onClick={() => setShowAdjustModal(false)} className="btn-cancel">
                  ❌ Cancel
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
