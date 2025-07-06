'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white shadow-md fixed top-0 left-0 z-50 border-b border-gray-700">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2 font-heading">
          <Link href="/" className="font-bold text-white font-heading">Caprise Brock</Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="font-bold text-white hover:text-gray-400 transition font-heading">Home</Link>
          <Link href="/about" className="font-bold text-white hover:text-gray-400 transition font-heading">About</Link>
          <Link href="/projects" className="font-bold text-white hover:text-gray-400 transition font-heading">Projects</Link>
          <Link href="/contact" className="font-bold text-white hover:text-gray-400 transition font-heading">Contact</Link>
        </div>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-gray-700 hover:text-gray-400 hover:border-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-4 pb-4 pt-2 space-y-2">
          <Link href="/" className="block font-bold text-white hover:text-gray-400 font-heading" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" className="block font-bold text-white hover:text-gray-400 font-heading" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/projects" className="block font-bold text-white hover:text-gray-400 font-heading" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/contact" className="block font-bold text-white hover:text-gray-400 font-heading" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 