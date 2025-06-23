'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function Academic() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 mb-12 overflow-hidden rounded-xl shadow-lg">
        <Image
          src="/images/classroom.jpg" // Replace with an academic-themed image
          alt="Academic Programs at Bugema APS"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Academic Programs</h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-6">
              Excellence in Education and Spiritual Growth
            </p>
            <Link
              href="#curriculum"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              Explore Curriculum
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div id="curriculum" className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">Curriculum Overview</h2>
          <p className="text-gray-700 mb-6">
            At Bugema Adventist Primary School, we offer a robust curriculum designed to foster academic excellence and spiritual growth. Our programs are tailored to meet the needs of every student, supported by dedicated educators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Mathematics and Science</h3>
                <p className="text-gray-700">Hands-on experiments and problem-solving sessions.</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Language Arts and Literature</h3>
                <p className="text-gray-700">Creative writing and reading comprehension.</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Social Studies and History</h3>
                <p className="text-gray-700">Exploring Uganda’s heritage and global perspectives.</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Physical Education and Arts</h3>
                <p className="text-gray-700">Sports, music, and drama to encourage creativity.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Academic Schedule */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">Academic Schedule</h2>
          <p className="text-gray-700 mb-4">2025-2026 School Year:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-4">Term</th>
                  <th className="p-4">Dates</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="p-4 font-semibold">Term 1</td>
                  <td className="p-4">August 15 - December 15, 2025</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="p-4 font-semibold">Term 2</td>
                  <td className="p-4">January 10 - April 10, 2026</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="p-4 font-semibold">Term 3</td>
                  <td className="p-4">April 20 - July 10, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Academic Plan 2025-2026</h3>
              <Link href="/forms/academic-plan.pdf" className="flex items-center text-blue-500 hover:text-blue-700">
                <Download size={18} className="mr-2" /> Download
              </Link>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Student Enrollment Form</h3>
              <Link href="/forms/enrollment-form.pdf" className="flex items-center text-blue-500 hover:text-blue-700">
                <Download size={18} className="mr-2" /> Download
              </Link>
            </div>
          </motion.div>
          <p className="text-gray-700 mt-6">
            For assistance, contact our academic office at <a href="mailto:academic@bugemaaps.org" className="text-blue-500 hover:underline">academic@bugemaaps.org</a>.
          </p>
        </div>
      </motion.section>
    </div>
  );
}