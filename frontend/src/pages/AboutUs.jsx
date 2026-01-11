import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Image Placeholder */}
      <div className="relative h-[500px] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-5 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            About Our Company
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mb-8 animate-fade-in-delay">
            Your Trusted Partner in CCTV & Security Solutions Since 2020
          </p>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-7xl animate-bounce-slow backdrop-blur-sm">
            🔒
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="max-w-7xl mx-auto py-20 px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Placeholder */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 h-96 rounded-2xl flex items-center justify-center text-6xl transform group-hover:scale-105 transition-transform duration-300 shadow-2xl">
              🏢
              <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-700">
                Company Photo Here
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Established in <strong className="text-blue-600">2020</strong>, we have become Sri Lanka's leading provider of 
              cutting-edge CCTV cameras, security systems, and surveillance equipment. Our journey began with a simple 
              mission: to make advanced security technology accessible and affordable for everyone.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we proudly serve <strong className="text-blue-600">thousands of satisfied customers</strong> across 
              the island, from residential homes to large commercial enterprises. Our commitment to quality, innovation, 
              and customer satisfaction has made us the go-to destination for all security needs.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-blue-100 px-6 py-3 rounded-full">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-purple-100 px-6 py-3 rounded-full">
                <p className="text-3xl font-bold text-purple-600">1000+</p>
                <p className="text-sm text-gray-600">Projects Done</p>
              </div>
              <div className="bg-green-100 px-6 py-3 rounded-full">
                <p className="text-3xl font-bold text-green-600">5+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-blue-100 leading-relaxed">
              To provide state-of-the-art security solutions that protect what matters most to our customers. 
              We strive to deliver exceptional quality products, professional installation services, and 
              unmatched customer support at competitive prices.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-10 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-6xl mb-6">👁️</div>
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg text-purple-100 leading-relaxed">
              To become Sri Lanka's most trusted and innovative security solutions provider, setting new 
              standards in the industry through cutting-edge technology, reliability, and customer-centric 
              approach. We envision a safer tomorrow for all.
            </p>
          </div>
        </div>

        {/* Why Choose Us Cards */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            We're not just selling products – we're providing complete security solutions backed by expertise and care
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                We stock only genuine products from world-renowned brands like Hikvision, EZVIZ, and VStarcam.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-green-500">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Island-wide delivery within 3-5 days. Same-day delivery available in Colombo and suburbs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-purple-500">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Installation</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional installation by certified technicians with years of experience in security systems.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support and technical assistance whenever you need us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive pricing with flexible payment options and special discounts for bulk orders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-indigo-500">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Warranty Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                All products come with manufacturer warranty and our own quality guarantee.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-pink-500">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Complete Packages</h3>
              <p className="text-gray-600 leading-relaxed">
                Ready-to-install CCTV packages with cameras, DVR/NVR, cables, and all accessories included.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-yellow-500">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Free Training</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive training on system operation and mobile app usage after installation.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-3xl p-12 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start group">
              <div className="text-4xl group-hover:scale-110 transition-transform">🤝</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Integrity</h3>
                <p className="text-gray-300 leading-relaxed">
                  We conduct business with complete honesty and transparency. No hidden costs, no false promises 
                  – just genuine products and honest service.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="text-4xl group-hover:scale-110 transition-transform">❤️</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Customer First</h3>
                <p className="text-gray-300 leading-relaxed">
                  Your satisfaction is our top priority. We go above and beyond to ensure you get the perfect 
                  security solution for your needs and budget.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="text-4xl group-hover:scale-110 transition-transform">💡</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-300 leading-relaxed">
                  We continuously update our product range with the latest technology to provide you with 
                  cutting-edge security solutions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="text-4xl group-hover:scale-110 transition-transform">⭐</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-300 leading-relaxed">
                  From product quality to customer service, we maintain the highest standards in everything 
                  we do. Your security deserves nothing less.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Experienced professionals dedicated to your security and satisfaction
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-8xl relative group">
                👨‍💼
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Technical Manager</h3>
                <p className="text-blue-600 mb-3">Installation Expert</p>
                <p className="text-gray-600 text-sm">
                  15+ years experience in security systems installation and maintenance
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-8xl relative group">
                👩‍💼
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Customer Relations</h3>
                <p className="text-purple-600 mb-3">Support Specialist</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to ensuring your complete satisfaction with our products and services
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-8xl relative group">
                👨‍🔧
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Field Technician</h3>
                <p className="text-green-600 mb-3">Installation & Support</p>
                <p className="text-gray-600 text-sm">
                  Certified technician providing professional installation and maintenance services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Secure Your Property?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Get in touch with us today for a free consultation and quote. Our experts are ready to help!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                to="/store" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
              >
                Browse Products
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-8 flex gap-6 justify-center items-center">
              <a href="tel:0777602018" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
                <span className="text-2xl">📞</span>
                <span className="font-semibold">077 760 2018</span>
              </a>
              <span className="text-gray-300">|</span>
              <a href="tel:0770279136" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
                <span className="text-2xl">📞</span>
                <span className="font-semibold">077 027 9136</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
