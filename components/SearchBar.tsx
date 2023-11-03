import React, { useState } from 'react';
import { getBiblePassage } from '@/utils/getBiblePassage'; // Import the getBiblePassage function
import Link from 'next/link';

interface BiblePassage {
  id: string;
  reference: string;
  text: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BiblePassage[]>([]);
  let searchTimeout: NodeJS.Timeout | null = null;

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
    const inputText = e.target.value;
    setSearchQuery(inputText);

    // Clear any previous timeout and start a new one
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the search after 500 milliseconds (adjust as needed)
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 500); // Adjust the delay as needed
  };

  

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <div className="flex items-center space-x-4 w-full">
        <div >
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-black">Search Results</h2>
          <ul>
            {searchResults.map((passage: BiblePassage) => (
              <li className="border-b-2"
                  key={passage.id}>
                
                <p className='text-black font-xl font-bold'>{passage.reference}</p>
                <p className='text-black'>{passage.text}</p>
                {/* Add more details if needed */}
              </li>
            ))}
          </ul>
          <div className='flex justify-center mt-4'>
            <Link
              href="/advanced-search"
              className="relative bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              See More
            </Link>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default SearchBar;
