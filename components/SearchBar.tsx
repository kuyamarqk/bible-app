import React, { useState } from 'react';
import { getBiblePassage } from '@/utils/getBiblePassage'; // Import the getBiblePassage function

interface BiblePassage {
  id: string;
  bibleId: string;
  orgId: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BiblePassage[]>([]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // Handle empty search query if needed
      return;
    }

    try {
      const bibleId = "de4e12af7f28f599-02"; // Replace with the Bible ID you want to search within
      const response = await getBiblePassage(bibleId, searchQuery);

      if (response) {
        // Update the search results
        setSearchResults(response);
      } else {
        // Handle the case where the search did not return valid data
        console.error("No matching passage found.");
        setSearchResults([]);
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error searching for passage:', error);
      setSearchResults([]);
    }
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search for a passage"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input changes
            onKeyUp={handleSearch} // Trigger search on key up
            className="p-2 border rounded w-full text-black"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600"
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-black">Search Results</h2>
          <ul>
            {searchResults.map((passage: BiblePassage) => (
              <li key={passage.id}>
                <p>{passage.content}</p>
                <p>{passage.reference}</p>
                {/* Add more details if needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
