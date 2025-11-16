import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-gray-800">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero / Header */}
      <Header />

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Fast & Secure',
              desc: 'Your data is encrypted and safely stored.',
            },
            {
              title: 'User Friendly',
              desc: 'Simple and intuitive UI for all users.',
            },
            {
              title: '24/7 Support',
              desc: 'We’re here to help, any time you need.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white text-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            We are passionate about building fast, secure, and reliable web applications.
            Our team is committed to delivering the best user experience through innovative
            technology.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        &copy; 2025 DemoSite. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
