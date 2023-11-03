"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const closeMobileMenu = () => {
        setToggle(false);
      };
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-white text-2xl font-bold">Our Bible App</a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li className=''>
            <Link href="/" className="text-white">Home</Link>
            </li>
            <li>
            <Link href="/advanced-search" className="text-white">Advance Search</Link>
            </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white p-2 focus:outline-none"
            onClick={() => setToggle(!toggle)}
          >
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <ul className="md:hidden space-y-4 absolute top-16 right-4 bg-blue-700 text-white p-4 ">
            <li>
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                passHref 
                
                >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/advanced-search" 
                passHref
                onClick={closeMobileMenu}
                >
                Advance Search
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
