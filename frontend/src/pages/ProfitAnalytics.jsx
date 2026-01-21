import React, { useState, useEffect } from 'react';
import '../styles/ProfitAnalytics.css';

function ProfitAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('overview'); // overview, daily, monthly, category

  useEffect(() => {
    fetchProfitAnalytics();
  }, []);

  const fetchProfitAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/profit-analytics');
      if (!response.ok) {
        throw new Error('Failed to fetch profit analytics');
      }
      const data = await response.json();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profit analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `Rs ${(amount || 0).toFixed(2)}`;
  };

  const formatPercent = (value) => {
    return `${(value || 0).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="profit-analytics-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profit analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profit-analytics-container">
        <div className="error-container">
          <h2>❌ Error Loading Analytics</h2>
          <p>{error}</p>
          <button onClick={fetchProfitAnalytics} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profit-analytics-container">
      <div className="profit-header">
        <h1 className="profit-title">📊 Profit Analytics</h1>
        <button onClick={fetchProfitAnalytics} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* Overview Cards */}
      <div className="profit-overview-cards">
        <div className="profit-card total-profit">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Total Profit</h3>
            <p className="card-value">{formatCurrency(analytics.totalProfit)}</p>
            <span className="card-subtitle">All Time</span>
          </div>
        </div>

        <div className="profit-card today-profit">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <h3>Today's Profit</h3>
            <p className="card-value">{formatCurrency(analytics.todayProfit)}</p>
            <span className="card-subtitle">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="profit-card month-profit">
          <div className="card-icon">📆</div>
          <div className="card-content">
            <h3>This Month</h3>
            <p className="card-value">{formatCurrency(analytics.monthProfit)}</p>
            <span className="card-subtitle">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="profit-card profit-margin">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Profit Margin</h3>
            <p className="card-value">{formatPercent(analytics.profitMargin)}</p>
            <span className="card-subtitle">Overall</span>
          </div>
        </div>

        <div className="profit-card total-revenue">
          <div className="card-icon">💵</div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="card-value">{formatCurrency(analytics.totalRevenue)}</p>
            <span className="card-subtitle">{analytics.totalSales} Sales</span>
          </div>
        </div>

        <div className="profit-card total-cost">
          <div className="card-icon">🏷️</div>
          <div className="card-content">
            <h3>Total Cost</h3>
            <p className="card-value">{formatCurrency(analytics.totalCost)}</p>
            <span className="card-subtitle">Product Costs</span>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="view-selector">
        <button 
          className={`view-btn ${selectedView === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedView('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`view-btn ${selectedView === 'daily' ? 'active' : ''}`}
          onClick={() => setSelectedView('daily')}
        >
          📅 Daily Profit
        </button>
        <button 
          className={`view-btn ${selectedView === 'monthly' ? 'active' : ''}`}
          onClick={() => setSelectedView('monthly')}
        >
          📆 Monthly Profit
        </button>
        <button 
          className={`view-btn ${selectedView === 'category' ? 'active' : ''}`}
          onClick={() => setSelectedView('category')}
        >
          🏷️ By Product
        </button>
      </div>

      {/* Daily Profit View */}
      {selectedView === 'daily' && analytics.dailyProfit && (
        <div className="profit-section">
          <h2>📅 Daily Profit (Last 30 Days)</h2>
          <div className="profit-table-container">
            <table className="profit-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analytics.dailyProfit)
                  .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                  .map(([date, profit]) => (
                    <tr key={date}>
                      <td>{new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</td>
                      <td className={profit > 0 ? 'positive' : 'zero'}>
                        {formatCurrency(profit)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total (30 Days)</strong></td>
                  <td className="total-cell">
                    <strong>{formatCurrency(
                      Object.values(analytics.dailyProfit).reduce((sum, val) => sum + val, 0)
                    )}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Monthly Profit View */}
      {selectedView === 'monthly' && analytics.monthlyProfit && (
        <div className="profit-section">
          <h2>📆 Monthly Profit (Last 12 Months)</h2>
          <div className="profit-table-container">
            <table className="profit-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analytics.monthlyProfit)
                  .sort(([monthA], [monthB]) => monthB.localeCompare(monthA))
                  .map(([month, profit]) => {
                    const [year, monthNum] = month.split('-');
                    const monthName = new Date(year, monthNum - 1).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    });
                    return (
                      <tr key={month}>
                        <td>{monthName}</td>
                        <td className={profit > 0 ? 'positive' : 'zero'}>
                          {formatCurrency(profit)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total (12 Months)</strong></td>
                  <td className="total-cell">
                    <strong>{formatCurrency(
                      Object.values(analytics.monthlyProfit).reduce((sum, val) => sum + val, 0)
                    )}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Category-wise Profit View */}
      {selectedView === 'category' && analytics.categoryProfit && (
        <div className="profit-section">
          <h2>🏷️ Profit by Product</h2>
          <div className="profit-table-container">
            <table className="profit-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analytics.categoryProfit)
                  .sort(([, profitA], [, profitB]) => profitB - profitA)
                  .map(([product, profit]) => (
                    <tr key={product}>
                      <td>{product}</td>
                      <td className={profit > 0 ? 'positive' : 'zero'}>
                        {formatCurrency(profit)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total Profit</strong></td>
                  <td className="total-cell">
                    <strong>{formatCurrency(
                      Object.values(analytics.categoryProfit).reduce((sum, val) => sum + val, 0)
                    )}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Overview - Summary */}
      {selectedView === 'overview' && (
        <div className="profit-section">
          <h2>📊 Profit Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h3>Revenue vs Cost</h3>
              <div className="bar-chart">
                <div className="bar revenue-bar" style={{width: '100%'}}>
                  <span>Revenue: {formatCurrency(analytics.totalRevenue)}</span>
                </div>
                <div className="bar cost-bar" style={{width: '100%'}}>
                  <span>Cost: {formatCurrency(analytics.totalCost)}</span>
                </div>
                <div className="bar profit-bar" style={{width: '100%'}}>
                  <span>Profit: {formatCurrency(analytics.totalProfit)}</span>
                </div>
              </div>
            </div>

            <div className="summary-item">
              <h3>Key Metrics</h3>
              <ul className="metrics-list">
                <li>
                  <span className="metric-label">Total Sales:</span>
                  <span className="metric-value">{analytics.totalSales}</span>
                </li>
                <li>
                  <span className="metric-label">Average Profit per Sale:</span>
                  <span className="metric-value">
                    {formatCurrency(analytics.totalProfit / analytics.totalSales)}
                  </span>
                </li>
                <li>
                  <span className="metric-label">Profit Margin:</span>
                  <span className="metric-value">{formatPercent(analytics.profitMargin)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfitAnalytics;
