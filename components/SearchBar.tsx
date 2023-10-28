import React, { useState } from 'react';
import { getBiblePassage } from '@/utils/getBiblePassage'; // Import the getBiblePassage function

const Search = ({
  onSearch,
  user,
  handleSignIn,
  handleRegister,
  handleSignOut,
}: {
  onSearch: Function;
  user: any;
  handleSignIn: Function;
  handleRegister: Function;
  handleSignOut: Function;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // Handle empty search query if needed
      return;
    }

    try {
      const bibleId = "de4e12af7f28f599-02"; // Replace with the Bible ID you want to search within
      const response = await getBiblePassage(bibleId, searchQuery);

      if (response) {
        // Process the response data here (e.g., display it in your component)
        //console.log(response);

        // You can call the `onSearch` callback if needed
        onSearch(response);
      } else {
        // Handle the case where the search did not return valid data
        console.error("Bible passage not found.");
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error searching for Bible passage:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center justify-between">
          <header className="text-2xl font-bold text-black ">Daily Bible Devotion</header>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Search for a verse or passage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default Search;
