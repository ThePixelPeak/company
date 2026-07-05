import React from 'react';

export default function Logo({ className = "w-12 h-12" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="logo-grad" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#84cc16" />
        </linearGradient>
      </defs>
      
      {/* Edges */}
      <path d="M50 15 L15 85" stroke="url(#logo-grad)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 15 L85 85" stroke="url(#logo-grad)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 85 L85 85" stroke="#84cc16" strokeWidth="4" strokeLinejoin="round" />
      
      <path d="M50 15 L55 55" stroke="url(#logo-grad)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 85 L55 55" stroke="url(#logo-grad)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M85 85 L55 55" stroke="#84cc16" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Nodes */}
      {/* Bottom Left */}
      <circle cx="15" cy="85" r="7" fill="#84cc16" />
      {/* Bottom Right */}
      <circle cx="85" cy="85" r="7" fill="#84cc16" />
      {/* Center */}
      <circle cx="55" cy="55" r="7" fill="#58d06b" />
      {/* Top */}
      <circle cx="50" cy="15" r="7" fill="#2dd4bf" />
    </svg>
  );
}
