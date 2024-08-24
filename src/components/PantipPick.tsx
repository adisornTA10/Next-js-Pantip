'use client';

import React, { useEffect, useState } from 'react';

type PantipPick = {
  title: string;
  imageUrl: string;
  link: string;
  author: string;
  date: string;
  comments: number;
};

export default function PantipPickList() {
  const [pantippicks, setHighlights] = useState<PantipPick[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchHighlight = async () => {
      const response = await fetch('/api/highlight');
      const data = await response.json();
      setHighlights(data.result);
    };

    fetchHighlight();
  }, []);

  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // เพิ่มจำนวนรายการที่จะแสดงเมื่อคลิก "ดูเพิ่มเติม"
  };

  const showLess = () => {
    setVisibleCount(prevCount => (prevCount > 5 ? prevCount - 5 : 5)); // ลดจำนวนรายการที่จะแสดงเมื่อคลิก "แสดงน้อยลง"
  };

  return (
    <div className="rounded-lg p-6 shadow-lg">
      <ul>
        {pantippicks.slice(0, visibleCount).map((pantippick, index) => (
          <li key={index} className="flex items-start space-x-4 border-b border-[#4A417B] py-2">
            <img
              src={pantippick.imageUrl}
              alt={pantippick.title}
              className="size-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <a href={pantippick.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-lg font-semibold text-black transition duration-150 hover:text-yellow-400">
                  {pantippick.title}
                </h3>
              </a>
              <div className="mt-1 text-sm text-black">
                <p>
                  โดย
                  {' '}
                  {pantippick.author}
                  {' '}
                  &middot;
                  {' '}
                  {pantippick.date}
                </p>
                <p>
                  {pantippick.comments}
                  {' '}
                  ความคิดเห็น
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        {visibleCount > 5 && (
          <button
            onClick={showLess}
            className="mr-2 w-full rounded-lg bg-gray-500 p-2 text-white hover:bg-gray-600"
          >
            แสดงน้อยลง
          </button>
        )}
        {visibleCount < pantippicks.length && (
          <button
            onClick={showMore}
            className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            ดูเพิ่มเติม
          </button>
        )}
      </div>
    </div>
  );
}
