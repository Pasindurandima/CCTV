import { useState, useEffect } from 'react';

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
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-slate-800 m-0 text-2xl font-bold">💰 Sales Report</h2>
        <button onClick={() => exportToCSV(reports.salesReport, 'sales_report')} className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition">
          Export CSV
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-orange-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Total Sales</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">
            ${reports.salesReport.reduce((sum, item) => sum + (item.totalAmount || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-orange-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Total Orders</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">{reports.salesReport.length}</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-orange-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Average Order Value</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">
            ${reports.salesReport.length > 0 
              ? (reports.salesReport.reduce((sum, item) => sum + (item.totalAmount || 0), 0) / reports.salesReport.length).toFixed(2)
              : '0.00'}
          </p>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Order ID</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Date</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Customer</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Products</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Amount</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.salesReport.map((sale, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="p-4">#{sale.orderId}</td>
              <td className="p-4">{new Date(sale.orderDate).toLocaleDateString()}</td>
              <td className="p-4">{sale.customerName}</td>
              <td className="p-4">{sale.productCount}</td>
              <td className="p-4">${sale.totalAmount?.toFixed(2)}</td>
              <td className="p-4"><span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${sale.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-900' : sale.status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-amber-900' : 'bg-red-100 text-red-900'}`}>{sale.status}</span></td>
            </tr>
          ))}
          {reports.salesReport.length === 0 && (
            <tr><td colSpan="6" className="p-8 text-center text-slate-600">No sales data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const InventoryReportTab = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-slate-800 m-0 text-2xl font-bold">📦 Inventory Report</h2>
        <button onClick={() => exportToCSV(reports.inventoryReport, 'inventory_report')} className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition">
          Export CSV
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-blue-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Total Stock Value</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">
            ${reports.inventoryReport.reduce((sum, item) => sum + (item.stockValue || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-orange-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Low Stock Items</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">
            {reports.inventoryReport.filter(item => item.isLowStock).length}
          </p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-blue-500">
          <h4 className="m-0 text-slate-600 text-sm font-semibold uppercase">Out of Stock</h4>
          <p className="text-3xl font-bold text-slate-800 m-0 mt-2">
            {reports.inventoryReport.filter(item => item.quantity === 0).length}
          </p>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Product</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Category</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Quantity</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Unit Price</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Stock Value</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.inventoryReport.map((item, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="p-4">{item.productName}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">${item.unitPrice?.toFixed(2)}</td>
              <td className="p-4">${item.stockValue?.toFixed(2)}</td>
              <td className="p-4">
                <span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${item.isLowStock ? 'bg-yellow-100 text-amber-900' : 'bg-green-100 text-green-900'}`}>
                  {item.isLowStock ? 'Low Stock' : 'In Stock'}
                </span>
              </td>
            </tr>
          ))}
          {reports.inventoryReport.length === 0 && (
            <tr><td colSpan="6" className="p-8 text-center text-slate-600">No inventory data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const ProductReportTab = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-slate-800 m-0 text-2xl font-bold">📊 Product Performance Report</h2>
        <button onClick={() => exportToCSV(reports.productReport, 'product_report')} className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition">
          Export CSV
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Product</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Category</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Units Sold</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Revenue</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Avg Rating</th>
            <th className="p-4 text-left font-semibold text-slate-600 border-b-2 border-slate-200">Stock Left</th>
          </tr>
        </thead>
        <tbody>
          {reports.productReport.map((product, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="p-4">{product.productName}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.unitsSold}</td>
              <td className="p-4">${product.revenue?.toFixed(2)}</td>
              <td className="p-4">⭐ {product.avgRating?.toFixed(1)}</td>
              <td className="p-4">{product.stockLeft}</td>
            </tr>
          ))}
          {reports.productReport.length === 0 && (
            <tr><td colSpan="6" className="p-8 text-center text-slate-600">No product data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-8 px-5 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">📈 Reports & Analytics</h1>
        <p className="text-slate-600">Comprehensive business insights and reports</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 flex gap-4 items-flex-end flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600 text-sm">Start Date:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="py-2 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600 text-sm">End Date:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="py-2 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button onClick={fetchReports} className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold h-fit hover:bg-blue-600 transition">Apply Filter</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b-2 border-slate-200">
        <button 
          className={`py-4 px-6 text-lg font-semibold border-b-3 transition ${activeTab === 'sales' ? 'text-blue-500 border-b-blue-500' : 'text-slate-600 border-b-transparent hover:text-blue-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Report
        </button>
        <button 
          className={`py-4 px-6 text-lg font-semibold border-b-3 transition ${activeTab === 'inventory' ? 'text-blue-500 border-b-blue-500' : 'text-slate-600 border-b-transparent hover:text-blue-500'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Report
        </button>
        <button 
          className={`py-4 px-6 text-lg font-semibold border-b-3 transition ${activeTab === 'product' ? 'text-blue-500 border-b-blue-500' : 'text-slate-600 border-b-transparent hover:text-blue-500'}`}
          onClick={() => setActiveTab('product')}
        >
          Product Performance
        </button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-8">
        {loading ? (
          <div className="text-center py-12 text-slate-600 text-lg">Loading reports...</div>
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
