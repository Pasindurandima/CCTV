import React, { useState } from 'react';

function Store() {
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 99.99, category: 'Electronics' },
    { id: 2, name: 'Product 2', price: 79.99, category: 'Clothing' },
    { id: 3, name: 'Product 3', price: 129.99, category: 'Electronics' },
    { id: 4, name: 'Product 4', price: 49.99, category: 'Accessories' },
    { id: 5, name: 'Product 5', price: 159.99, category: 'Electronics' },
    { id: 6, name: 'Product 6', price: 89.99, category: 'Clothing' },
  ]);

  return (
    <div className="max-w-[1400px] mx-auto py-10 px-5">
      <h1 className="text-4xl text-slate-800 mb-8 text-center">Our Store</h1>
      <div className="flex gap-5 mb-10 justify-center flex-wrap">
        <select className="py-3 px-5 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>
        <input
          type="text"
          placeholder="Search products..."
          className="py-3 px-5 border-2 border-gray-300 rounded-md text-base min-w-[300px] transition-all focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
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
  );
}

export default Store;
