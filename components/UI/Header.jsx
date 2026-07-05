import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none flex items-center justify-between">
      <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" id="logo-container">
        <img src="/logo.png" alt="Pixelpeak Logo" className="w-12 h-12 object-contain" />
        <span className="font-bold text-xl tracking-[0.2em] uppercase text-white hidden sm:block">
          Pixelpeak
        </span>
      </div>
    </header>
  );
}
