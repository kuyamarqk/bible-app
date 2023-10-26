"use client";

import { useState } from "react";
import React from 'react'


export const Reflections = () => {
    const [reflection, setReflection] = useState('');

    const handleReflectionChange = (event) => {
        setReflection(event.target.value);
    };
  return (
    <section className='container mx-auto p-4'>
    <header className="text-2xl font-bold mb-4">Reflections</header>
          <div className='bg-white p-4 rounded shadow-md'>
          <textarea
          className="mt-4 p-2 w-full border rounded text-black"
          placeholder="Enter your reflections or takeaways here..."
          value={reflection}
          onChange={handleReflectionChange}
        />
          </div>
    </section>
  )
}
