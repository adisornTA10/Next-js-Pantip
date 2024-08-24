'use client';

import React, { useEffect, useState } from 'react';

type Room = {
  title: string;
  imageUrl: string;
  link: string;
};

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data = await response.json();
        setRooms(data.result);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="relative p-2 shadow-lg">
      <ul className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {rooms.map((room, index) => (
          <li key={index} className="flex flex-col items-center space-y-1">
            <a href={room.link} target="_blank" rel="noopener noreferrer" className="text-center">
              <div className="flex size-24 flex-col items-center justify-center rounded-lg bg-white p-2 shadow-md">
                <img src={room.imageUrl} alt={room.title} className="mt-4 size-10 object-cover" />
                <p className="text-sm text-black">{room.title}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
