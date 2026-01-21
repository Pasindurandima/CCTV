import { useState, useEffect } from 'react';
import '../styles/AdminReports.css';

const AdminReports = () => {
  const [reports, setReports] = useState({
    salesReport: [],
    inventoryReport: [],
    productReport: []
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/reports?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const SalesReportTab = () => (
    <div className="report-section">
      <div className="report-header">
        <h2>💰 Sales Report</h2>
        <button onClick={() => exportToCSV(reports.salesReport, 'sales_report')} className="btn-export">
          Export CSV
        </button>
      </div>
      <div className="report-stats">
        <div className="stat-box">
          <h4>Total Sales</h4>
          <p className="stat-value">
            ${reports.salesReport.reduce((sum, item) => sum + (item.totalAmount || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="stat-box">
          <h4>Total Orders</h4>
          <p className="stat-value">{reports.salesReport.length}</p>
        </div>
        <div className="stat-box">
          <h4>Average Order Value</h4>
          <p className="stat-value">
            ${reports.salesReport.length > 0 
              ? (reports.salesReport.reduce((sum, item) => sum + (item.totalAmount || 0), 0) / reports.salesReport.length).toFixed(2)
              : '0.00'}
          </p>
        </div>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.salesReport.map((sale, index) => (
            <tr key={index}>
              <td>#{sale.orderId}</td>
              <td>{new Date(sale.orderDate).toLocaleDateString()}</td>
              <td>{sale.customerName}</td>
              <td>{sale.productCount}</td>
              <td>${sale.totalAmount?.toFixed(2)}</td>
              <td><span className={`status-tag ${sale.status?.toLowerCase()}`}>{sale.status}</span></td>
            </tr>
          ))}
          {reports.salesReport.length === 0 && (
            <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No sales data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const InventoryReportTab = () => (
    <div className="report-section">
      <div className="report-header">
        <h2>📦 Inventory Report</h2>
        <button onClick={() => exportToCSV(reports.inventoryReport, 'inventory_report')} className="btn-export">
          Export CSV
        </button>
      </div>
      <div className="report-stats">
        <div className="stat-box">
          <h4>Total Stock Value</h4>
          <p className="stat-value">
            ${reports.inventoryReport.reduce((sum, item) => sum + (item.stockValue || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="stat-box">
          <h4>Low Stock Items</h4>
          <p className="stat-value">
            {reports.inventoryReport.filter(item => item.isLowStock).length}
          </p>
        </div>
        <div className="stat-box">
          <h4>Out of Stock</h4>
          <p className="stat-value">
            {reports.inventoryReport.filter(item => item.quantity === 0).length}
          </p>
        </div>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Stock Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.inventoryReport.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice?.toFixed(2)}</td>
              <td>${item.stockValue?.toFixed(2)}</td>
              <td>
                <span className={`status-tag ${item.isLowStock ? 'warning' : 'success'}`}>
                  {item.isLowStock ? 'Low Stock' : 'In Stock'}
                </span>
              </td>
            </tr>
          ))}
          {reports.inventoryReport.length === 0 && (
            <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No inventory data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const ProductReportTab = () => (
    <div className="report-section">
      <div className="report-header">
        <h2>📊 Product Performance Report</h2>
        <button onClick={() => exportToCSV(reports.productReport, 'product_report')} className="btn-export">
          Export CSV
        </button>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Units Sold</th>
            <th>Revenue</th>
            <th>Avg Rating</th>
            <th>Stock Left</th>
          </tr>
        </thead>
        <tbody>
          {reports.productReport.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.unitsSold}</td>
              <td>${product.revenue?.toFixed(2)}</td>
              <td>⭐ {product.avgRating?.toFixed(1)}</td>
              <td>{product.stockLeft}</td>
            </tr>
          ))}
          {reports.productReport.length === 0 && (
            <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No product data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-reports">
      <div className="reports-header">
        <h1>📈 Reports & Analytics</h1>
        <p>Comprehensive business insights and reports</p>
      </div>

      {/* Date Range Filter */}
      <div className="date-filter">
        <div className="date-input-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </div>
        <div className="date-input-group">
          <label>End Date:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
        <button onClick={fetchReports} className="btn-apply">Apply Filter</button>
      </div>

      {/* Tabs */}
      <div className="report-tabs">
        <button 
          className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Report
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Report
        </button>
        <button 
          className={`tab-btn ${activeTab === 'product' ? 'active' : ''}`}
          onClick={() => setActiveTab('product')}
        >
          Product Performance
        </button>
      </div>

      {/* Report Content */}
      <div className="report-content">
        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : (
          <>
            {activeTab === 'sales' && <SalesReportTab />}
            {activeTab === 'inventory' && <InventoryReportTab />}
            {activeTab === 'product' && <ProductReportTab />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
