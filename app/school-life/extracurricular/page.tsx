'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type Category = 'Sports' | 'Arts' | 'Scouting' | 'Community';

const extracurricularImages: Record<Category, { id: number; src: string; alt: string }[]> = {
  Sports: [
    { id: 1, src: '/images/sports-football.jpg', alt: 'Football at Bugema APS' },
    { id: 2, src: '/images/sports-netball.jpg', alt: 'Netball at Bugema APS' },
    { id: 3, src: '/images/sports-athletics.jpg', alt: 'Athletics at Bugema APS' },
    { id: 4, src: '/images/sports-team.jpg', alt: 'Sports team at Bugema APS' },
  ],
  Arts: [
    { id: 1, src: '/images/arts-music.jpg', alt: 'Music at Bugema APS' },
    { id: 2, src: '/images/arts-dance.jpg', alt: 'Dance at Bugema APS' },
    { id: 3, src: '/images/arts-drama.jpg', alt: 'Drama at Bugema APS' },
    { id: 4, src: '/images/arts-performance.jpg', alt: 'Performance at Bugema APS' },
  ],
  Scouting: [
    { id: 1, src: '/images/scouting-camp.jpg', alt: 'Scouting camp at Bugema APS' },
    { id: 2, src: '/images/scouting-skills.jpg', alt: 'Scouting skills at Bugema APS' },
    { id: 3, src: '/images/scouting-group.jpg', alt: 'Scouting group at Bugema APS' },
    { id: 4, src: '/images/scouting-event.jpg', alt: 'Scouting event at Bugema APS' },
  ],
  Community: [
    { id: 1, src: '/images/community-service.jpg', alt: 'Community service at Bugema APS' },
    { id: 2, src: '/images/community-project.jpg', alt: 'Community project at Bugema APS' },
    { id: 3, src: '/images/community-team.jpg', alt: 'Community team at Bugema APS' },
    { id: 4, src: '/images/community-event.jpg', alt: 'Community event at Bugema APS' },
  ],
};

export default function Extracurricular() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4); // Cycle through 4 images per category
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Extracurricular Activities</h1>
        {(Object.keys(extracurricularImages) as Category[]).map((category) => (
          <section key={category} className="relative">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{category}</h2>
            <div className="relative h-96 overflow-hidden rounded-xl shadow-xl" aria-label={`${category} slideshow`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={extracurricularImages[category][index].id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={extracurricularImages[category][index].src}
                    alt={extracurricularImages[category][index].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {extracurricularImages[category].map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setIndex((img.id - 1) % 4)}
                    className={`w-3 h-3 rounded-full ${img.id - 1 === index ? 'bg-yellow-400' : 'bg-white/50'} hover:bg-yellow-300 transition-colors duration-200`}
                    aria-label={`Go to ${category} image ${img.id}`}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
        <p className="mt-4 text-gray-600">These activities foster teamwork, creativity, and Christian values outside the classroom.</p>
      </div>
    </div>
  );
}