import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-5">
      <h1 className="text-4xl text-slate-800 mb-10 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl text-slate-800 mb-8">Get in Touch</h2>
          <div className="mb-6">
            <h3 className="text-blue-500 text-xl mb-2">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              123 E-Commerce Street<br />City, State 12345
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-blue-500 text-xl mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="mb-6">
            <h3 className="text-blue-500 text-xl mb-2">Email</h3>
            <p className="text-gray-600">support@ecommerce.com</p>
          </div>
          <div className="mb-6">
            <h3 className="text-blue-500 text-xl mb-2">Hours</h3>
            <p className="text-gray-600 leading-relaxed">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
        <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-slate-800 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="block mb-2 text-slate-800 font-semibold">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base transition-all focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 text-slate-800 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base resize-y transition-all focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white border-none py-4 px-10 rounded-md cursor-pointer text-lg w-full transition-all hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
