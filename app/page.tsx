'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const headerImages = [
  { id: 1, src: '/images/classroom.jpg', alt: 'Classroom activities at Samuel Levi APS' },
  { id: 2, src: '/images/school-building.jpg', alt: 'Bugema APS school building' },
  { id: 3, src: '/images/playground.jpg', alt: 'Playground fun at Bugema APS' },
  { id: 4, src: '/images/event1.jpg', alt: 'Event at Bugema APS' },
];

export default function Home() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [headerIndex, setHeaderIndex] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [isFooterFixed, setIsFooterFixed] = useState(true);
  type Event = { id: string | number; title: string; date: string; image: string };
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % headerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const headerInterval = setInterval(() => {
      setHeaderIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);
    return () => clearInterval(headerInterval);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollThreshold = 200;

      const atBottom = documentHeight - (currentScrollY + windowHeight) < scrollThreshold;

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
        setIsFooterVisible(false);
      } else {
        setIsNavbarVisible(true);
        setIsFooterVisible(true);
      }

      setIsFooterFixed(!atBottom);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch upcoming events from the API
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setUpcomingEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900 font-sans antialiased relative">
      <Navbar isVisible={isNavbarVisible} />
      <header className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={headerImages[headerIndex].id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={headerImages[headerIndex].src}
              alt={headerImages[headerIndex].alt}
              fill
              className="object-cover brightness-75 transition-opacity duration-500"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{}}
              {...{ className: "text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg" }}
            >
              Bugema Adventist Primary School
            </motion.h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 text-white/90 drop-shadow-md">
              Where Every Child Grows with Faith, Knowledge & Love
            </p>
            <Link
              href="/about"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-md"
              aria-label="Learn more about Bugema APS"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </header>
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">About Our School</h2>
          <p className="text-gray-700 leading-relaxed">
            Bugema Adventist Primary School offers a Christ-centered education with a modern curriculum, nurturing values, and holistic growth.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Qualified and caring teachers</li>
            <li>Modern classrooms and labs</li>
            <li>Faith-based foundation</li>
          </ul>
        </div>
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/images/classroom.jpg"
            alt="Classroom at Bugema Adventist Primary School"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-4 bg-black bg-opacity-50 rounded">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm">{event.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No upcoming events available.</p>
          )}
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">Life at Bugema APS</h2>
          <div className="relative h-96 overflow-hidden rounded-xl shadow-xl" aria-label="Campus life slideshow">
            <AnimatePresence mode="wait">
              <motion.div
                key={headerImages[galleryIndex].id}
                {...{ className: "absolute inset-0" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={headerImages[galleryIndex].src}
                  alt={headerImages[galleryIndex].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {headerImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setGalleryIndex(idx)}
                  className={`w-3 h-3 rounded-full ${idx === galleryIndex ? 'bg-yellow-400' : 'bg-white/50'} hover:bg-yellow-300 transition-colors duration-200`}
                  aria-label={`Go to image ${idx + 1} of ${headerImages.length}`}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto perspective-1000 transform-style-3d">
          <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 transform hover:rotate-y-5 transition-transform duration-300">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700 text-center">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-gray-700 text-center">Stay updated with news, events, and stories from our school.</p>
            <form className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email address for newsletter subscription"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
                aria-label="Subscribe to newsletter"
              >
                <Mail size={18} /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="bg-blue-600 text-white py-24 px-4 md:px-6 lg:px-8 text-center relative z-10 pb-extra">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Admissions Now Open!</h2>
        <p className="mb-6 text-xl">Join our growing family — enroll your child for the new academic year.</p>
        <Link
          href="/register"
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-md"
          aria-label="Apply for admission"
        >
          Apply Now
        </Link>
      </section>
      <Footer isVisible={isFooterVisible} isFixed={isFooterFixed} />
    </div>
  );
}