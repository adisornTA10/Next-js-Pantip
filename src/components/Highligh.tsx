'use client';

import React, { useEffect, useState } from 'react';

type Highlight = {
  title: string;
  imageUrl: string;
  link: string;
};

export default function HighlightList() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchHighlight = async () => {
      const response = await fetch('/api/highlight');
      const data = await response.json();
      setHighlights(data.result);
    };

    fetchHighlight();
  }, []);

  const cardWidth = 256;
  const gap = 16;
  const visibleCards = 2;
  const containerWidth = visibleCards * (cardWidth + gap) - gap;
  const totalWidth = highlights.length * (cardWidth + gap) - gap;

  const handleScrollLeft = () => {
    setScrollPosition(prev => Math.min(prev + cardWidth + gap, 0));
  };

  const handleScrollRight = () => {
    setScrollPosition(prev =>
      Math.max(prev - (cardWidth + gap), -(totalWidth - containerWidth)),
    );
  };

  return (
    <div className="relative p-4">
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white shadow-md hover:bg-gradient-to-l focus:outline-none disabled:opacity-50"
          disabled={scrollPosition === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          className="mx-auto flex overflow-hidden"
          style={{ maxWidth: `${containerWidth}px`, width: '100%' }}
        >
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(${scrollPosition}px)`,
              gap: `${gap}px`,
              width: `${totalWidth}px`,
            }}
          >
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="block overflow-hidden rounded-lg shadow-lg"
                style={{ minWidth: `${cardWidth}px`, flex: 'none' }}
              >
                <a
                  href={highlight.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={highlight.imageUrl}
                    alt={highlight.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className="rounded-b-lg bg-white p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {highlight.title}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-white shadow-md hover:bg-gradient-to-l focus:outline-none disabled:opacity-50"
          disabled={scrollPosition <= -(totalWidth - containerWidth)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
