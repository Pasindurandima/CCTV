import { useState, useEffect } from 'react';
import '../styles/AdminCategories.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: '',
    description: ''
  });

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage({ text: 'Failed to fetch categories', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Show message with auto-hide
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Open modal for adding new category
  const handleAddNew = () => {
    setEditMode(false);
    setCurrentCategory({
      id: null,
      name: '',
      description: ''
    });
    setShowModal(true);
  };

  // Open modal for editing category
  const handleEdit = (category) => {
    setEditMode(true);
    setCurrentCategory(category);
    setShowModal(true);
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editMode
        ? `http://localhost:8080/api/categories/${currentCategory.id}`
        : 'http://localhost:8080/api/categories';
      
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentCategory),
      });

      if (response.ok) {
        showMessage(
          editMode ? 'Category updated successfully!' : 'Category added successfully!',
          'success'
        );
        setShowModal(false);
        fetchCategories();
      } else {
        const errorText = await response.text();
        showMessage(errorText || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      showMessage('Error saving category', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showMessage('Category deleted successfully!', 'success');
        fetchCategories();
      } else {
        const errorText = await response.text();
        showMessage(errorText || 'Failed to delete category', 'error');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      showMessage('Error deleting category', 'error');
    }
  };

  // Toggle category active status
  const handleToggleStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}/toggle`, {
        method: 'PATCH',
      });

      if (response.ok) {
        showMessage('Category status updated!', 'success');
        fetchCategories();
      } else {
        showMessage('Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      showMessage('Error toggling status', 'error');
    }
  };

  return (
    <div className="admin-categories">
      <div className="categories-container">
        <div className="categories-header">
          <h1>📂 Category Management</h1>
          <button onClick={handleAddNew} className="add-category-btn">
            ➕ Add New Category
          </button>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Categories Table */}
        <div className="categories-table-wrapper">
          <table className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    No categories found. Click "Add New Category" to create one.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="category-name">{category.name}</td>
                    <td className="category-desc">{category.description || '-'}</td>
                    <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(category)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="action-btn delete-btn"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editMode ? 'Edit Category' : 'Add New Category'}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={currentCategory.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Wireless Camera"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={currentCategory.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description of the category..."
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Saving...' : editMode ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
