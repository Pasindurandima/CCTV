import React, { useState } from 'react';

function Store() {
  const [products] = useState([
    { id: 1, name: 'Wireless HD Camera', price: 149.99, category: 'Wireless Camera' },
    { id: 2, name: 'CCTV Complete Package', price: 599.99, category: 'CCTV Package' },
    { id: 3, name: '8 Channel DVR', price: 229.99, category: 'DVR' },
    { id: 4, name: '2TB Surveillance HDD', price: 89.99, category: 'Hard Drive Memory' },
    { id: 5, name: 'IP Network Camera', price: 179.99, category: 'IP Camera' },
    { id: 6, name: 'Phone Holder Mount', price: 19.99, category: 'Mobile Accessories' },
    { id: 7, name: '16 Channel NVR', price: 349.99, category: 'NVR' },
    { id: 8, name: 'Bluetooth Speaker', price: 49.99, category: 'Sound Devices' },
    { id: 9, name: '32" LED Monitor', price: 299.99, category: 'TV and Monitor' },
    { id: 10, name: '1500VA UPS Inverter', price: 199.99, category: 'UPS Inverters' },
    { id: 11, name: '20000mAh Power Bank', price: 39.99, category: 'Power Bank' },
    { id: 12, name: 'Dome Camera', price: 129.99, category: 'Cameras' },
    { id: 13, name: 'PTZ Wireless Camera', price: 199.99, category: 'Wireless Camera' },
    { id: 14, name: '4 Camera CCTV Kit', price: 449.99, category: 'CCTV Package' },
    { id: 15, name: '4 Channel DVR', price: 149.99, category: 'DVR' },
    { id: 16, name: '1TB HDD Storage', price: 59.99, category: 'Hard Drive Memory' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Cameras',
    'Wireless Camera',
    'CCTV Package',
    'DVR',
    'Hard Drive Memory',
    'IP Camera',
    'Mobile Accessories',
    'NVR',
    'Sound Devices',
    'TV and Monitor',
    'UPS Inverters',
    'Power Bank'
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-5">
      <h1 className="text-4xl text-slate-800 mb-8 text-center">Our Store</h1>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="py-3 px-5 border-2 border-gray-300 rounded-md text-base w-full max-w-[500px] transition-all focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 w-full">
          <div className="bg-white rounded-lg shadow-lg p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                  selectedCategory === ''
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-1">
          <div className="mb-5 text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory && <span className="font-semibold"> in {selectedCategory}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-5 shadow-lg transition-all text-center hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl mb-4">
                  {product.name}
                </div>
                <h3 className="text-xl mb-2 text-slate-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="text-3xl text-blue-500 font-bold mb-4">${product.price}</p>
                <button className="bg-blue-500 text-white border-none py-3 px-8 rounded-md cursor-pointer text-base w-full transition-all hover:bg-blue-600 hover:scale-105">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
