'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type Club = { name: string; id: number; image?: string };
type ClubImage = { id: number; src: string; alt: string };

const defaultClubImages: Record<string, ClubImage[]> = {
  'Christian Youth Fellowship': [
    { id: 1, src: '/images/club-christian-prayer.jpg', alt: 'Christian Youth Fellowship prayer at Bugema APS' },
    { id: 2, src: '/images/club-christian-singing.jpg', alt: 'Christian Youth Fellowship singing at Bugema APS' },
    { id: 3, src: '/images/club-christian-group.jpg', alt: 'Christian Youth Fellowship group at Bugema APS' },
    { id: 4, src: '/images/club-christian-event.jpg', alt: 'Christian Youth Fellowship event at Bugema APS' },
  ],
  'Science Club': [
    { id: 1, src: '/images/club-science-experiment.jpg', alt: 'Science Club experiment at Bugema APS' },
    { id: 2, src: '/images/club-science-demo.jpg', alt: 'Science Club demo at Bugema APS' },
    { id: 3, src: '/images/club-science-team.jpg', alt: 'Science Club team at Bugema APS' },
    { id: 4, src: '/images/club-science-fair.jpg', alt: 'Science Club fair at Bugema APS' },
  ],
  'Debate Club': [
    { id: 1, src: '/images/club-debate-discussion.jpg', alt: 'Debate Club discussion at Bugema APS' },
    { id: 2, src: '/images/club-debate-competition.jpg', alt: 'Debate Club competition at Bugema APS' },
    { id: 3, src: '/images/club-debate-team.jpg', alt: 'Debate Club team at Bugema APS' },
    { id: 4, src: '/images/club-debate-event.jpg', alt: 'Debate Club event at Bugema APS' },
  ],
  'Art & Craft Society': [
    { id: 1, src: '/images/club-art-craft.jpg', alt: 'Art & Craft Society creation at Bugema APS' },
    { id: 2, src: '/images/club-art-painting.jpg', alt: 'Art & Craft Society painting at Bugema APS' },
    { id: 3, src: '/images/club-art-group.jpg', alt: 'Art & Craft Society group at Bugema APS' },
    { id: 4, src: '/images/club-art-exhibit.jpg', alt: 'Art & Craft Society exhibit at Bugema APS' },
  ],
};

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([
    { name: 'Christian Youth Fellowship', id: 1 },
    { name: 'Science Club', id: 2 },
    { name: 'Debate Club', id: 3 },
    { name: 'Art & Craft Society', id: 4 },
  ]);
  const [index, setIndex] = useState(0);

  // Extract mapping logic to a separate function to reduce nesting
  function enrichClubs(data: string[], clubs: Club[]): Club[] {
    return data.map((name: string, idx: number) => {
      const existingClub = clubs.find(c => c.name === name);
      return { name, id: existingClub?.id ?? Date.now() + idx, image: existingClub?.image };
    });
  }

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/clubs');
        if (!response.ok) throw new Error('Failed to fetch clubs');
        const data = await response.json();
        const enrichedClubs = enrichClubs(data, clubs);
        setClubs(enrichedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, [clubs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Clubs at Bugema Primary School</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clubs.map((club) => (
            <section key={club.id} className="relative">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">{club.name}</h2>
              <div className="relative h-96 overflow-hidden rounded-xl shadow-xl" aria-label={`${club.name} slideshow`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={defaultClubImages[club.name]?.[index]?.id || club.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src={club.image ?? defaultClubImages[club.name]?.[index]?.src ?? '/images/club1.jpg'}
                      alt={defaultClubImages[club.name]?.[index]?.alt || `${club.name} image`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {defaultClubImages[club.name]?.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setIndex((img.id - 1) % 4)}
                      className={`w-3 h-3 rounded-full ${img.id - 1 === index ? 'bg-yellow-400' : 'bg-white/50'} hover:bg-yellow-300 transition-colors duration-200`}
                      aria-label={`Go to ${club.name} image ${img.id}`}
                    />
                  )) || (
                    <button
                      onClick={() => setIndex(0)}
                      className={`w-3 h-3 rounded-full bg-white/50 hover:bg-yellow-300 transition-colors duration-200`}
                      aria-label={`Go to ${club.name} image`}
                    />
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
        <p className="mt-4 text-gray-600">Clubs meet weekly to develop skills and leadership in a faith-based setting.</p>
      </div>
    </div>
  );
}