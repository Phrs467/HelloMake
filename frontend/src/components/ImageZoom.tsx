"use client";

import React, { useState, MouseEvent } from 'react';

export function ImageZoom({ src, alt }: { src: string, alt: string }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden cursor-zoom-in rounded-[3rem]"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-200 ease-out ${isZoomed ? 'scale-[2.5]' : 'scale-100'}`}
        style={{ transformOrigin: `${position.x}% ${position.y}%` }}
      />
    </div>
  );
}
