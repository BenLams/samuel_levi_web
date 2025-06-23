'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  href?: string;
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Extracted WebSocket message handler to reduce nesting
  const handleWebSocketMessage = (event: MessageEvent) => {
    const { action, data } = JSON.parse(event.data);
    if (action === 'add') {
      setNews(prev => [...prev, data]);
    } else if (action === 'delete') {
      setNews(prev => prev.filter(item => item.id !== data.id));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetch('http://localhost:3000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));

    // WebSocket connection
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = handleWebSocketMessage;
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket disconnected');

    return () => ws.close();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">News & Events</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              href={item.href}
            />
          ))
        ) : (
          <p>No news items available.</p>
        )}
      </div>
    </div>
  );
}