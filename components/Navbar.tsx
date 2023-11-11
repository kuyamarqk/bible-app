"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
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
          <li>
            <Link href="/user/login" className="text-white">Account</Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <ul className={`md:hidden space-y-4 absolute top-16 right-4 bg-blue-500 text-white p-4 ${toggle ? 'max-h-[300px]' : 'max-h-0'} transition-max-h duration-300 ease-in-out overflow-hidden`}>
            <li>
              <Link
                href="/"
                passHref
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/advanced-search"
                passHref
              >
                Advance Search
              </Link>

            </li>
            <li>
              <Link href="/user/login" >Account</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
