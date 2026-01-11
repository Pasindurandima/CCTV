import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for contacting us! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative max-w-7xl mx-auto px-5 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to our team anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-5">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-20 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="text-5xl mb-3 text-center">📞</div>
            <h3 className="font-bold text-slate-800 text-center mb-2">Call Us</h3>
            <div className="text-center space-y-1">
              <a href="tel:0777602018" className="block text-blue-600 hover:text-blue-700 font-semibold">
                077 760 2018
              </a>
              <a href="tel:0770279136" className="block text-blue-600 hover:text-blue-700 font-semibold">
                077 027 9136
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-green-500">
            <div className="text-5xl mb-3 text-center">✉️</div>
            <h3 className="font-bold text-slate-800 text-center mb-2">Email Us</h3>
            <p className="text-gray-600 text-center text-sm">
              <a href="mailto:info@cctvsecurity.lk" className="hover:text-blue-600">
                info@cctvsecurity.lk
              </a>
            </p>
            <p className="text-gray-600 text-center text-sm">
              <a href="mailto:support@cctvsecurity.lk" className="hover:text-blue-600">
                support@cctvsecurity.lk
              </a>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-purple-500">
            <div className="text-5xl mb-3 text-center">📍</div>
            <h3 className="font-bold text-slate-800 text-center mb-2">Visit Us</h3>
            <p className="text-gray-600 text-center text-sm">
              123 Security Solutions Street<br />
              Colombo, Sri Lanka
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-orange-500">
            <div className="text-5xl mb-3 text-center">🕐</div>
            <h3 className="font-bold text-slate-800 text-center mb-2">Working Hours</h3>
            <p className="text-gray-600 text-center text-sm">
              Mon - Sat: 9AM - 6PM<br />
              Sunday: 10AM - 4PM
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Side - Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Let's Talk</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you need advice on choosing the right CCTV system, have questions about our products, 
                or need technical support – we're here to help!
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Phone Numbers</h3>
                    <a href="tel:0777602018" className="block text-blue-600 hover:text-blue-700 font-semibold">
                      077 760 2018
                    </a>
                    <a href="tel:0770279136" className="block text-blue-600 hover:text-blue-700 font-semibold">
                      077 027 9136
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Email Address</h3>
                    <a href="mailto:info@cctvsecurity.lk" className="block text-green-600 hover:text-green-700">
                      info@cctvsecurity.lk
                    </a>
                    <a href="mailto:support@cctvsecurity.lk" className="block text-green-600 hover:text-green-700">
                      support@cctvsecurity.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Office Location</h3>
                    <p className="text-gray-600">
                      123 Security Solutions Street<br />
                      Colombo 00700<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center relative group">
                <div className="text-center">
                  <div className="text-6xl mb-3">🗺️</div>
                  <p className="text-slate-700 font-semibold">Google Maps Location</p>
                  <p className="text-sm text-gray-600 mt-2">Interactive map will be added here</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all"></div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <p className="text-gray-100 mb-6">Stay connected with us on social media for updates, offers, and tips!</p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110">
                  <div className="text-2xl">📘</div>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110">
                  <div className="text-2xl">📷</div>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110">
                  <div className="text-2xl">💬</div>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110">
                  <div className="text-2xl">▶️</div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-slate-800 font-semibold">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-slate-800 font-semibold">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-slate-800 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="077 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-slate-800 font-semibold">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="installation">Installation Service</option>
                      <option value="bulk-order">Bulk Order / Wholesale</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-slate-800 font-semibold">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base resize-y transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none py-4 px-10 rounded-lg cursor-pointer text-lg w-full font-bold transition-all hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 24 hours during business days
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Why Contact Us Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Consultation</h3>
            <p className="text-gray-700">
              Our security experts will help you choose the perfect CCTV system for your specific needs and budget.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Custom Solutions</h3>
            <p className="text-gray-700">
              Need a tailored security setup? We design custom solutions for homes, offices, and commercial properties.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Quick Response</h3>
            <p className="text-gray-700">
              We value your time! Our team responds quickly to all inquiries and provides immediate assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
