import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register submitted:', formData);
    alert('Registration functionality will be implemented with backend!');
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-[450px]">
        <h1 className="text-3xl text-slate-800 mb-8 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="fullName" className="block mb-2 text-slate-800 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
              placeholder="Enter your email"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
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
              placeholder="Create a password"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block mb-2 text-slate-800 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white border-none py-4 rounded-md cursor-pointer text-lg mt-2 transition-all hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Register
          </button>
        </form>
        <div className="mt-5 text-center">
          <p className="text-gray-600 mb-2">
            Already have an account? <Link to="/login" className="text-blue-500 no-underline font-semibold hover:text-blue-700 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
