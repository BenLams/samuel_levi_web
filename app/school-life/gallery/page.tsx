'use client';

import { useState } from 'react';

export default function Gallery() {
  const classes = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'] as const;
  type ClassName = typeof classes[number];
  const imagesPerClass: Record<ClassName, string[]> = {
    P1: [
      'p1-happy.jpg',
      'p1-learning.jpg',
      'p1-playing.jpg',
      'p1-group.jpg',
      'p1-art.jpg',
      'p1-sports.jpg',
      'p1-prayer.jpg',
      'p1-celebration.jpg',
    ],
    P2: [
      'p2-happy.jpg',
      'p2-learning.jpg',
      'p2-playing.jpg',
      'p2-group.jpg',
      'p2-art.jpg',
      'p2-sports.jpg',
      'p2-prayer.jpg',
      'p2-celebration.jpg',
    ],
    P3: [
      'p3-happy.jpg',
      'p3-learning.jpg',
      'p3-playing.jpg',
      'p3-group.jpg',
      'p3-art.jpg',
      'p3-sports.jpg',
      'p3-prayer.jpg',
      'p3-celebration.jpg',
    ],
    P4: [
      'p4-happy.jpg',
      'p4-learning.jpg',
      'p4-playing.jpg',
      'p4-group.jpg',
      'p4-art.jpg',
      'p4-sports.jpg',
      'p4-prayer.jpg',
      'p4-celebration.jpg',
    ],
    P5: [
      'p5-happy.jpg',
      'p5-learning.jpg',
      'p5-playing.jpg',
      'p5-group.jpg',
      'p5-art.jpg',
      'p5-sports.jpg',
      'p5-prayer.jpg',
      'p5-celebration.jpg',
    ],
    P6: [
      'p6-happy.jpg',
      'p6-learning.jpg',
      'p6-playing.jpg',
      'p6-group.jpg',
      'p6-art.jpg',
      'p6-sports.jpg',
      'p6-prayer.jpg',
      'p6-celebration.jpg',
    ],
    P7: [
      'p7-happy.jpg',
      'p7-learning.jpg',
      'p7-playing.jpg',
      'p7-group.jpg',
      'p7-art.jpg',
      'p7-sports.jpg',
      'p7-prayer.jpg',
      'p7-celebration.jpg',
    ],
  };

// TypeScript interfaces for type safety

interface CurrentImageIndex {
    [key: string]: number;
}

// Initialize state for current image index per class
const [currentImageIndex, setCurrentImageIndex] = useState<CurrentImageIndex>(
  () =>
    Object.fromEntries(
      classes.map((className) => [className, 0])
    )
);
const nextImage = (className: ClassName) => {
    setCurrentImageIndex((prev: CurrentImageIndex) => ({
        ...prev,
        [className]: (prev[className] + 1) % imagesPerClass[className].length,
    }));
};

const prevImage = (className: ClassName) => {
    setCurrentImageIndex((prev: CurrentImageIndex) => ({
        ...prev,
        [className]: (prev[className] - 1 + imagesPerClass[className].length) % imagesPerClass[className].length,
    }));
};

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Gallery</h1>
        <p className="text-gray-700 mb-4">Explore photos capturing life across all classes at Bugema Adventist Primary School:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((className) => (
            <div key={className} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{className}</h2>
              <div className="relative w-full h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                    Placeholder: {imagesPerClass[className][currentImageIndex[className]]}
                  </div>
                </div>
                <button
                  onClick={() => prevImage(className)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  &lt;
                </button>
                <button
                  onClick={() => nextImage(className)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  &gt;
                </button>
              </div>
              <p className="mt-2 text-gray-600 text-center">
                Showing {currentImageIndex[className] + 1} of {imagesPerClass[className].length}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-gray-600">Add your own photos by contacting media@bugemaaps.org.</p>
      </div>
    </div>
  );
}