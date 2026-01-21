import { useState, useEffect } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    category: '',
    shortDesc: '',
    features: [''],
    imageFile: null,
    imagePreview: ''
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ text: 'Failed to fetch products', type: 'error' });
      setProducts([]);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories/active');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ text: 'Please select a valid image file', type: 'error' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: 'Image size must be less than 5MB', type: 'error' });
        return;
      }

      setFormData({ ...formData, imageFile: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData({ ...formData, imageFile: null, imagePreview: '' });
  };

  // Handle feature input changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  // Add new feature input
  const addFeatureInput = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  // Remove feature input
  const removeFeatureInput = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Filter out empty features
    const filteredFeatures = formData.features.filter(f => f.trim() !== '');

    try {
      // Try multipart form data first (with file)
      if (formData.imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('price', parseFloat(formData.price));
        formDataToSend.append('originalPrice', formData.originalPrice ? parseFloat(formData.originalPrice) : null);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('shortDesc', formData.shortDesc);
        formDataToSend.append('features', JSON.stringify(filteredFeatures));
        formDataToSend.append('image', formData.imageFile);

        const url = editMode 
          ? `http://localhost:8080/api/products/${editId}`
          : 'http://localhost:8080/api/products';
        
        const method = editMode ? 'PUT' : 'POST';

        console.log('Sending FormData with image:', {
          name: formData.name,
          brand: formData.brand,
          price: formData.price,
          imageFile: formData.imageFile.name,
        });

        const response = await fetch(url, {
          method: method,
          body: formDataToSend,
        });

        if (response.ok) {
          setMessage({ 
            text: editMode ? 'Product updated successfully!' : 'Product added successfully!', 
            type: 'success' 
          });
          resetForm();
          fetchProducts();
        } else {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || errorData?.message || 'Failed to save product. Please check all fields.';
          setMessage({ text: errorMessage, type: 'error' });
          console.error('Server error:', errorData);
        }
      } else {
        // Fall back to JSON if no image
        const productData = {
          name: formData.name,
          brand: formData.brand,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          category: formData.category,
          shortDesc: formData.shortDesc,
          features: filteredFeatures,
          imageUrl: formData.imagePreview
        };

        const url = editMode 
          ? `http://localhost:8080/api/products/${editId}`
          : 'http://localhost:8080/api/products';
        
        const method = editMode ? 'PUT' : 'POST';

        console.log('Sending JSON (no image):', productData);

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          setMessage({ 
            text: editMode ? 'Product updated successfully!' : 'Product added successfully!', 
            type: 'success' 
          });
          resetForm();
          fetchProducts();
        } else {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || errorData?.message || 'Failed to save product. Please check all fields.';
          setMessage({ text: errorMessage, type: 'error' });
          console.error('Server error:', errorData);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Network error: Unable to connect to server. Please make sure the backend is running.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      category: '',
      shortDesc: '',
      features: [''],
      imageFile: null,
      imagePreview: ''
    });
    setEditMode(false);
    setEditId(null);
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      category: product.category,
      shortDesc: product.shortDesc,
      features: product.features && product.features.length > 0 ? product.features : [''],
      imageFile: null,
      imagePreview: product.imageUrl || ''
    });
    setEditMode(true);
    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage({ text: 'Product deleted successfully!', type: 'success' });
          fetchProducts();
        } else {
          setMessage({ text: 'Failed to delete product', type: 'error' });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ text: 'An error occurred', type: 'error' });
      }
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">📦 Product Management</h1>
          <p>Add, edit, and manage your product catalog</p>
        </div>

        <div className="management-section">
          <h2 className="section-title">{editMode ? '✏️ Edit Product' : '➕ Add New Product'}</h2>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <label>Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label>Category *</label>
                <button
                  type="button"
                  onClick={() => window.location.href = '/admin/categories'}
                  className="add-feature-btn"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', margin: 0 }}
                >
                  📂 Manage Categories
                </button>
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <small style={{ color: '#e53e3e', marginTop: '0.25rem', display: 'block' }}>
                  ⚠️ No categories found. Click "Manage Categories" to add categories.
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Short Description *</label>
              <textarea
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Brief description of the product"
              />
            </div>

            {/* Image Upload Section */}
            <div className="form-group">
              <label>Product Image (optional)</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('image-input').click()}
                  className="image-upload-btn"
                >
                  📸 Browse Image from Your Laptop
                </button>
                
                {formData.imagePreview && (
                  <div className="image-preview-container">
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="image-preview"
                    />
                    <p className="preview-label">
                      {formData.imageFile ? formData.imageFile.name : 'Current Image'}
                    </p>
                    {formData.imageFile && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-image-btn"
                      >
                        ✕ Remove Image
                      </button>
                    )}
                  </div>
                )}
              </div>
              <small style={{ color: '#666', marginTop: '0.5rem', display: 'block' }}>
                ℹ️ Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </small>
            </div>

            <div className="form-group">
              <label>Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="feature-input-group">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureInput(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureInput}
                className="add-feature-btn"
              >
                + Add Feature
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Saving...' : editMode ? 'Update Product' : 'Add Product'}
              </button>
              {editMode && (
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="products-list">
            <div className="list-header">
              <h2>📋 All Products ({products.length})</h2>
              <button onClick={fetchProducts} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>

            {products.length === 0 ? (
              <p className="no-products">No products available. Add your first product above!</p>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card-admin">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="product-image-admin" />
                    )}
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="brand">🏢 {product.brand}</p>
                      <p className="category">🏷️ {product.category}</p>
                      <p className="price">💵 Rs {product.price}</p>
                      {product.features && product.features.length > 0 && (
                        <p className="features-count">✨ {product.features.length} features</p>
                      )}
                    </div>
                    <div className="product-actions">
                      <button onClick={() => handleEdit(product)} className="edit-btn">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="delete-btn">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
