// SearchResult.js (or .ts for TypeScript)

import React from 'react';
import { Verse, VerseIndex } from './interfaces';

interface SearchResultProps {
  searchResult: {
    data: {
      verses: Verse[];
    };
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResult }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold text-black">Search Results</h2>
      {searchResult.data.verses.map((verse: Verse, index: number) => (
        <div key={index}>
          <p className='text-black'>{verse.reference}</p>
          <p className='text-black'>{verse.text}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
