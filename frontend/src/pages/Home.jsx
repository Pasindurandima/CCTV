import React from 'react';

function Home() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-24 px-5 text-center">
        <div className="animate-fade-in-down">
          <h1 className="text-5xl mb-5">Welcome to Our E-Commerce Store</h1>
          <p className="text-2xl mb-8">Discover amazing products at great prices</p>
          <button className="bg-white text-indigo-500 border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all font-bold hover:-translate-y-1 hover:shadow-xl">
            Shop Now
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] my-20 mx-auto px-5">
        <h2 className="text-center text-4xl mb-12 text-slate-800">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl mb-4">
              Product 1
            </div>
            <h3 className="text-xl mb-2 text-slate-800">Product Name</h3>
            <p className="text-3xl text-blue-500 font-bold mb-4">$99.99</p>
            <button className="bg-blue-500 text-white border-none py-3 px-8 rounded-md cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
              Add to Cart
            </button>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl mb-4">
              Product 2
            </div>
            <h3 className="text-xl mb-2 text-slate-800">Product Name</h3>
            <p className="text-3xl text-blue-500 font-bold mb-4">$79.99</p>
            <button className="bg-blue-500 text-white border-none py-3 px-8 rounded-md cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
              Add to Cart
            </button>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl mb-4">
              Product 3
            </div>
            <h3 className="text-xl mb-2 text-slate-800">Product Name</h3>
            <p className="text-3xl text-blue-500 font-bold mb-4">$129.99</p>
            <button className="bg-blue-500 text-white border-none py-3 px-8 rounded-md cursor-pointer text-base transition-all hover:bg-blue-600 hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
