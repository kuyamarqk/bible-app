"use client";
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import DailyVerse from '@/components/DailyVerse';
import BookListComponent from '@/components/BookListComponent';
import { getBiblePassage } from '@/utils/getBiblePassage';

const Page = () => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (searchQuery: string) => {
    try {
      const bibleId = "de4e12af7f28f599-02";
      const response = await getBiblePassage(bibleId, searchQuery);

      if (response) {
        setSearchResult(response);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching for Bible passage:', error);
      setSearchResult(null);
    }
  };

  return (
    <div className="flex flex-wrap">
      {/* On large screens, left column for SearchBar */}
      <div className="w-full lg:w-1/4 p-4">
        <SearchBar />
      </div>

      {/* On large screens, middle column for DailyVerse */}
      <div className="w-full lg:w-1/2 p-4">
        <DailyVerse />
      </div>

      {/* On large screens, right column for BookListComponent */}
      <div className="w-full lg:w-1/4 p-4">
        <section className="bg-white p-4 rounded shadow-md">
          <BookListComponent />
        </section>
      </div>
    </div>
  );
};

export default Page;
