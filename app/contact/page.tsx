'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const heroText = localStorage.getItem('contactText') ?? 'Get in Touch with Bugema Adventist Primary School';
  const heroImage = localStorage.getItem('contactHero') ?? '/images/hero-bg.jpg';
  const galleryImages = JSON.parse(localStorage.getItem('galleryImages') ?? '[]');
  const parentsWords = localStorage.getItem('parentsWords') ?? '';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 mb-12 overflow-hidden rounded-xl shadow-lg">
        <Image
          src={heroImage}
          alt="Contact Us at Bugema APS"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-6">
              {heroText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12 px-4 md:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6 text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Mail className="text-blue-600 mb-2" size={24} />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Email</h3>
            <p className="text-gray-700">
              <Link href="mailto:info@bugemaaps.org" className="hover:text-blue-700 underline">
                info@bugemaaps.org
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Phone className="text-blue-600 mb-2" size={24} />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Phone</h3>
            <p className="text-gray-700">
              <Link href="tel:+256123456789" className="hover:text-blue-700 underline">
                +256 123 456 789
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin className="text-blue-600 mb-2" size={24} />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Address</h3>
            <p className="text-gray-700">Bugema, Kampala, Uganda</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-12 px-4 md:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6 text-center">Send Us a Message</h2>
        <form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
          <p id="success" className="text-green-600 text-sm mt-2 hidden">
            Thank you! Your message has been sent.
          </p>
        </form>
      </motion.section>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-12 px-4 md:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6 text-center">Find Us</h2>
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.925174234567!2d32.641944!3d0.569722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dc8f123456789%3A0xabcdef123456789!2sBugema%20Adventist%20Primary%20School!5e0!3m2!1sen!2sug!4v1729433280000!5m2!1sen!2sug"
            width="100%"
            height="100%"
            title="Bugema Adventist Primary School Location Map"
            allowFullScreen
            className="rounded-lg border-0"
          />
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-12 px-4 md:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6 text-center">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((img: string) => (
            <Image key={img} src={img} alt={`Gallery ${img}`} width={300} height={200} className="rounded-lg object-cover" />
          ))}
        </div>
      </motion.section>

      {/* Parents' Words Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-12 px-4 md:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6 text-center">What Parents Say</h2>
        <p className="text-gray-700 text-center italic">{parentsWords || 'No parent testimonials yet.'}</p>
      </motion.section>
    </div>
  );
}