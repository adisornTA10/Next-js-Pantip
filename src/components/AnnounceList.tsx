'use client';

import React, { useEffect, useState } from 'react';

type Announce = {
  title: string;
  subtitle: string;
  date: string;
  link: string;
  imageUrl: string;
};

export default function AnnounceList() {
  const [announces, setAnnounces] = useState<Announce[]>([]);

  useEffect(() => {
    const fetchAnnounces = async () => {
      const response = await fetch('/api/pantip');
      const data = await response.json();
      setAnnounces(data.result.slice(0, 2));
    };

    fetchAnnounces();
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <ul className="space-y-4">
        {announces.map((announce, index) => (
          <li key={index} className="flex items-center space-x-4">
            {index === 0 && (
              <div className="rounded-lg bg-yellow-400 px-2 py-1 text-white">
                Highlight
              </div>
            )}
            {index === 1 && (
              <div className="rounded-lg bg-blue-500 px-2 py-1 text-white">
                Activity
              </div>
            )}
            <div className="grow">
              <a
                href={announce.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold text-gray-900 hover:underline"
              >
                {announce.title}
              </a>
              <p className="text-gray-500">{announce.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
