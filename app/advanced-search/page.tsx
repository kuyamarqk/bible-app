"use client";

import React, { useState } from 'react';

const AdvancedSearch = () => {
  const [limit, setLimit] = useState('');
  const [sort, setSort] = useState('');
  const [offset, setOffset] = useState('');

  const handleAdvancedSearch = () => {
    // Perform advanced search with specified filters
    // You can call your API with the specified filters here
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Advanced Search</h2>

      <div className="text-black text-l font-bold grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
        <label htmlFor="query">Search for Passage</label>
        <input 
            type="text" 
            name="query" 
            id="query" 
            className="w-full p-2 border rounded"
        />
        </div>
        
        <div>
          <label htmlFor="limit" className="text-black">Limit:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        

        <div>
          <label htmlFor="sort" className="text-black">Sort By:</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Order</option>
            <option value="relevant">Relevant</option>
            <option value="canonical">Canonical</option>
            <option value="reverse-canonical">Reverse-Canonical</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="offset" className="text-black">Offset:</label>
          <input
            type="number"
            id="offset"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button onClick={handleAdvancedSearch} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
        Apply Filters
      </button>
    </div>
  );
};

export default AdvancedSearch;
