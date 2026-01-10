import React from 'react';

function AboutUs() {
  return (
    <div className="max-w-[1000px] mx-auto py-10 px-5">
      <h1 className="text-4xl text-slate-800 mb-10 text-center">About Us</h1>
      
      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl text-blue-500 mb-5">Our Story</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
          Welcome to our e-commerce store! Founded in 2026, we are dedicated to providing
          high-quality products and exceptional customer service. Our mission is to make
          online shopping easy, convenient, and enjoyable for everyone.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl text-blue-500 mb-5">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
          We strive to offer the best selection of products at competitive prices while
          maintaining the highest standards of quality and customer satisfaction. Your
          happiness is our priority.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl text-blue-500 mb-5">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center transition-all hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl mb-2">Quality Products</h3>
            <p className="text-gray-100 text-sm">We carefully select every product to ensure the highest quality.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center transition-all hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl mb-2">Fast Shipping</h3>
            <p className="text-gray-100 text-sm">Get your orders delivered quickly and reliably.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center transition-all hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl mb-2">Secure Payment</h3>
            <p className="text-gray-100 text-sm">Shop with confidence using our secure payment system.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center transition-all hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl mb-2">24/7 Support</h3>
            <p className="text-gray-100 text-sm">Our customer support team is always here to help you.</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl text-blue-500 mb-5">Our Values</h2>
        <ul className="list-none p-0">
          <li className="text-gray-600 leading-relaxed text-lg mb-4 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-500 before:font-bold before:text-xl">
            <strong className="text-slate-800">Integrity:</strong> We conduct business with honesty and transparency.
          </li>
          <li className="text-gray-600 leading-relaxed text-lg mb-4 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-500 before:font-bold before:text-xl">
            <strong className="text-slate-800">Customer Focus:</strong> Your satisfaction is at the heart of everything we do.
          </li>
          <li className="text-gray-600 leading-relaxed text-lg mb-4 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-500 before:font-bold before:text-xl">
            <strong className="text-slate-800">Innovation:</strong> We continuously improve to serve you better.
          </li>
          <li className="text-gray-600 leading-relaxed text-lg mb-4 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-500 before:font-bold before:text-xl">
            <strong className="text-slate-800">Quality:</strong> We never compromise on the quality of our products.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
