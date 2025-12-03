'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300"
          >
            Portfolio
          </Link>
          
          {/* Navigation links */}
          <div className="hidden md:flex gap-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-700 hover:text-blue-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-700 hover:text-blue-300'
              }`}
            >
              About
            </Link>
            <Link 
              href="/projects" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/projects') 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-700 hover:text-blue-300'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/contact') 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-700 hover:text-blue-300'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
