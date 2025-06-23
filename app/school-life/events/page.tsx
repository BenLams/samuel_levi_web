'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Event = {
  id: string | number;
  title?: string;
  date?: string;
  image?: string;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/school-events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">School Events</h1>
        <p className="text-gray-700 mb-4">Join us for these upcoming events at Bugema APS in 2025:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={event.image ?? '/images/school1.jpg'}
                  alt={event.title ?? 'School event image'}
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
            <p className="text-gray-500 text-center col-span-full">No events available.</p>
          )}
        </div>
        <p className="mt-4 text-gray-600">Check the News section for updates or contact events@bugemaaps.org.</p>
      </div>
    </div>
  );
}