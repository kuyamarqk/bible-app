"use client";
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import DailyVerse from '@/components/DailyVerse'; // Import the DailyVerse component
import BookList from '@/components/BookList';
// import { getBiblePassage } from '@/utils/getBiblePassage'; // Import the getBiblePassage function
import SearchResult from '@/components/searchResult';

const Page = () => {
  const [searchResult, setSearchResult] = useState(null);

  // Define your functions for handling sign-in, registration, and sign-out here
  // ...

  // Define a function to handle the search result
  // const handleSearch = async (searchQuery: string) => {
  //   try {
  //     const bibleId = "de4e12af7f28f599-02"; // Replace with the Bible ID you want to search within
  //     const response = await getBiblePassage(bibleId, searchQuery);

  //     if (response) {
  //       // Update the search result state
  //       setSearchResult(response);
  //     } else {
  //       // Handle the case where the search did not return valid data
  //       setSearchResult(null);
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the API request
  //     console.error('Error searching for Bible passage:', error);
  //     setSearchResult(null);
  //   }
  // }

  return (
    <div>
      <section className="container mx-auto p-4">
        <SearchBar
          onSearch={handleSearch}
          
        />
</section>
        <section className="container mx-auto p-4">
          <div className='bg-white p-4 rounded shadow-md'>
            <DailyVerse />
          </div>
        </section>

        {/* Conditionally display the new section with search results */}
        {searchResult ? (
          <section className="container mx-auto p-4">
            <SearchResult searchResult={searchResult} />
          </section>
          
        ) : null}

        <section className="container mx-auto p-4">
          <div className='bg-white p-4 rounded shadow-md'>
            <BookList />
          </div>
        </section>

      
    </div>
  );
};

export default Page;
