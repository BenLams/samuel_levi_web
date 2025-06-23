'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Navbar({ isVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isSchoolLifeOpen, setIsSchoolLifeOpen] = useState(false);

  return (
    <nav className={`bg-blue-700/80 text-white shadow-lg fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Image src="/images/school-logo.png" alt="Bugema APS Logo" width={40} height={40} className="rounded-full" />
            <Link href="/" className="text-xl md:text-2xl font-bold">
              Bugema APS
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">
              Home
            </Link>
            <Link href="/academic" className="hover:text-yellow-400 transition-colors duration-200">
              Academic
            </Link>
            <Link href="/news" className="hover:text-yellow-400 transition-colors duration-200">
              News
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition-colors duration-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors duration-200">
              Contact
            </Link>
            <div className="relative group">
              <button className="flex items-center hover:text-yellow-400 transition-colors duration-200">
                Admissions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300 z-50">
                <Link href="/admissions/process" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Admission Process
                </Link>
                <Link href="/admissions/documents" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Required Documents
                </Link>
                <Link href="/admissions/fees" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Fees & Payments
                </Link>
                <Link href="/admissions/schedule" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Schedule
                </Link>
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Register
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center hover:text-yellow-400 transition-colors duration-200">
                School Life
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300 z-50">
                <Link href="/school-life/daily-life" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Daily Life
                </Link>
                <Link href="/school-life/extracurricular" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Extracurricular Activities
                </Link>
                <Link href="/school-life/events" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Events
                </Link>
                <Link href="/school-life/clubs" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Clubs & Societies
                </Link>
                <Link href="/school-life/gallery" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {}}>
                  Gallery
                </Link>
              </div>
            </div>
            <Link href="/admin/login" className="px-4 py-2 bg-blue-800 text-white rounded-md border border-blue-900 hover:bg-blue-900 transition-colors duration-200">
              Admin Login
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700/80 p-4 space-y-2">
          <Link href="/" className="block hover:text-yellow-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/academic" className="block hover:text-yellow-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            Academic
          </Link>
          <Link href="/news" className="block hover:text-yellow-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            News
          </Link>
          <Link href="/about" className="block hover:text-yellow-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/contact" className="block hover:text-yellow-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <div>
            <button
              onClick={() => setIsAdmissionOpen(!isAdmissionOpen)}
              className="flex items-center w-full text-left hover:text-yellow-400 transition-colors duration-200"
            >
              Admissions
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isAdmissionOpen && (
              <div className="mt-2 space-y-2 pl-4">
                <Link href="/admissions/process" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsAdmissionOpen(false); }}>
                  Admission Process
                </Link>
                <Link href="/admissions/documents" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsAdmissionOpen(false); }}>
                  Required Documents
                </Link>
                <Link href="/admissions/fees" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsAdmissionOpen(false); }}>
                  Fees & Payments
                </Link>
                <Link href="/admissions/schedule" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsAdmissionOpen(false); }}>
                  Schedule
                </Link>
                <Link href="/register" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsAdmissionOpen(false); }}>
                  Register
                </Link>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => setIsSchoolLifeOpen(!isSchoolLifeOpen)}
              className="flex items-center w-full text-left hover:text-yellow-400 transition-colors duration-200"
            >
              School Life
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isSchoolLifeOpen && (
              <div className="mt-2 space-y-2 pl-4">
                <Link href="/school-life/daily-life" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsSchoolLifeOpen(false); }}>
                  Daily Life
                </Link>
                <Link href="/school-life/extracurricular" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsSchoolLifeOpen(false); }}>
                  Extracurricular Activities
                </Link>
                <Link href="/school-life/events" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsSchoolLifeOpen(false); }}>
                  Events
                </Link>
                <Link href="/school-life/clubs" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsSchoolLifeOpen(false); }}>
                  Clubs & Societies
                </Link>
                <Link href="/school-life/gallery" className="block hover:text-yellow-400" onClick={() => { setIsOpen(false); setIsSchoolLifeOpen(false); }}>
                  Gallery
                </Link>
              </div>
            )}
          </div>
          <Link href="/admin/login" className="block px-4 py-2 bg-blue-800 text-white rounded-md border border-blue-900 hover:bg-blue-900 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};