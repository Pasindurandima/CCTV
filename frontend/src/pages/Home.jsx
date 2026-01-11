import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    { name: 'CCTV Cameras', icon: '📹', description: 'High-quality surveillance cameras' },
    { name: 'DVR & NVR', icon: '💾', description: 'Recording & storage solutions' },
    { name: 'Wireless Systems', icon: '📡', description: 'Flexible wireless security' },
    { name: 'IP Cameras', icon: '🌐', description: 'Network-based monitoring' },
    { name: 'Accessories', icon: '🔌', description: 'Complete your setup' },
    { name: 'Power Solutions', icon: '⚡', description: 'UPS & power backup' }
  ];

  const features = [
    {
      icon: '🛡️',
      title: '24/7 Security',
      description: 'Round-the-clock protection for your property with reliable surveillance systems'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with quality assurance on all products'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and secure delivery to your doorstep'
    },
    {
      icon: '🔧',
      title: 'Expert Support',
      description: 'Professional installation and technical support available'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-32 px-5 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-down">
            Your Security, Our Priority
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-200">
            Complete CCTV & Surveillance Solutions
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            Protect what matters most with our advanced security cameras, DVRs, NVRs, and complete surveillance packages. Professional quality at affordable prices.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/store">
              <button className="bg-blue-500 text-white border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all font-bold hover:bg-blue-600 hover:-translate-y-1 hover:shadow-2xl">
                Shop Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-transparent text-white border-2 border-white py-4 px-10 text-xl rounded-full cursor-pointer transition-all font-bold hover:bg-white hover:text-indigo-900 hover:-translate-y-1 hover:shadow-2xl">
                Get Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Browse by Category
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Find the perfect security solution for your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/store">
                <div className="bg-white rounded-xl p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer group">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 group-hover:text-blue-500">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-6xl my-20 mx-auto px-5">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 text-slate-800">
          Featured Products
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12">
          Best sellers and customer favorites
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-56 rounded-xl flex items-center justify-center text-white text-7xl mb-5 group-hover:scale-105 transition-transform overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-2">📹</div>
                <p className="text-lg font-semibold">Image Placeholder</p>
              </div>
            </div>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Best Seller
            </span>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">CCTV Complete Package</h3>
            <p className="text-gray-600 mb-4">4 cameras, DVR, cables & accessories included</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-blue-500 font-bold">$599.99</p>
              <button className="bg-blue-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-56 rounded-xl flex items-center justify-center text-white text-7xl mb-5 group-hover:scale-105 transition-transform overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-2">📡</div>
                <p className="text-lg font-semibold">Image Placeholder</p>
              </div>
            </div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              New Arrival
            </span>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Wireless HD Camera</h3>
            <p className="text-gray-600 mb-4">1080p resolution with night vision & WiFi</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-blue-500 font-bold">$149.99</p>
              <button className="bg-blue-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-56 rounded-xl flex items-center justify-center text-white text-7xl mb-5 group-hover:scale-105 transition-transform overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-2">💾</div>
                <p className="text-lg font-semibold">Image Placeholder</p>
              </div>
            </div>
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Top Rated
            </span>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">16 Channel NVR</h3>
            <p className="text-gray-600 mb-4">Network video recorder with 4TB storage</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-blue-500 font-bold">$349.99</p>
              <button className="bg-blue-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Why Choose Us?
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Your trusted partner in security solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md text-center hover:shadow-xl transition-all">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands/Trust Section */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            Trusted by Thousands of Customers
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Leading brands and professional quality products
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500 font-bold text-lg">
              Brand Logo
            </div>
            <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500 font-bold text-lg">
              Brand Logo
            </div>
            <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500 font-bold text-lg">
              Brand Logo
            </div>
            <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500 font-bold text-lg">
              Brand Logo
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Banner */}
      <section className="py-8 px-5 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help? Contact Us Today!</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <a href="tel:0777602018" className="flex items-center gap-2 text-xl hover:text-blue-400 transition-colors">
              <span className="text-2xl">📞</span>
              <span>077 760 2018</span>
            </a>
            <a href="tel:0770279136" className="flex items-center gap-2 text-xl hover:text-blue-400 transition-colors">
              <span className="text-2xl">📞</span>
              <span>077 027 9136</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Secure Your Property?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Get started with our complete CCTV solutions today. Free consultation available!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/store">
              <button className="bg-white text-indigo-600 border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all font-bold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl">
                Browse Products
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-transparent text-white border-2 border-white py-4 px-10 text-xl rounded-full cursor-pointer transition-all font-bold hover:bg-white hover:text-indigo-600 hover:-translate-y-1 hover:shadow-2xl">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
