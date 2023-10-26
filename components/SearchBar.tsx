import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center mt-4 mb-4">
      <h1 className="text-2xl font-bold m-4 ">Daily Bible Devotion</h1>
      <input
        type="text"
        placeholder="Search for a verse or passage..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2 lg:w-1/3 p-2 border rounded text-black font-bold"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
