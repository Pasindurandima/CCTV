import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Only allow admin login
        if (data.role === 'ADMIN') {
          localStorage.setItem('user', JSON.stringify(data));
          // Dispatch custom event to notify App component of auth change
          window.dispatchEvent(new Event('authChange'));
          navigate('/admin/dashboard');
        } else {
          setError('Access denied. Admin credentials required.');
        }
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-[450px]">
        <h1 className="text-3xl text-slate-800 mb-8 text-center">Admin Login</h1>
        
        {error && (
          <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-slate-800 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-slate-800 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white border-none py-4 rounded-md cursor-pointer text-lg mt-2 transition-all hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
        <div className="mt-5 text-center">
          <Link to="/" className="text-blue-500 no-underline font-semibold hover:text-blue-700 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
