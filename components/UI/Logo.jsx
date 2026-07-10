import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "w-12 h-12" }) {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Pixelpeak Logo" 
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
