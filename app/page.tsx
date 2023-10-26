"use client";
import { useState } from 'react';
import { getBibleVerse } from '@/utils/api';
import { getRandomPassage } from '@/utils/getRandomPassage';
import { Reflections } from '@/components/Reflections';
import Search from '@/components/SearchBar';

export default function Home() {
  const [verse, setVerse] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verseNumber, setVerseNumber] = useState('');
  const [showDetails, setShowDetails] = useState(false); // Add a state for showing/hiding details
  const [searchResults, setSearchResults] = useState([]);

  const fetchRandomVerse = async () => {
    const randomPassage = getRandomPassage();
    const randomVerse = await getBibleVerse(randomPassage);
    if (randomVerse) {
      setVerse(randomVerse);
      // Parse the book, chapter, and verse from the passage
      const [parsedBook, parsedChapter, parsedVerse] = parsePassage(randomPassage);
      setBook(parsedBook);
      setChapter(parsedChapter);
      setVerseNumber(parsedVerse);
      setShowDetails(true); // Show details when verse is fetched
    }
  };

  const copyVerse = () => {
    if (verse) {
      navigator.clipboard.writeText(verse).then(() => {
        // Handle success, e.g., show a confirmation message
        alert('Verse copied to clipboard!');
      }).catch((error) => {
        // Handle error, e.g., display an error message
        console.error('Failed to copy verse: ', error);
      });
    }  
  }

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this Bible verse',
        text: verse,
        url: window.location.href,
      }).then(() => {
        // Handle successful sharing
        alert('Verse shared successfully!');
      }).catch((error) => {
        // Handle sharing error
        console.error('Failed to share verse: ', error);
      });
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };

  // Helper function to parse the book, chapter, and verse from a passage
  const parsePassage = (passage) => {
    const [parsedBook, rest] = passage.split('+', 2);
    const [parsedChapter, parsedVerse] = rest.split(':');
    return [parsedBook, parsedChapter, parsedVerse];
  };

  // Handler for updating the reflection state
  const handleSearch = async (query) => {
    if (query) {
      // Simulated search, replace with your actual API call
      const results = await searchBible(query);
      setSearchResults(results);
    }
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  const searchBible = async (query) => {
    // Simulated search, replace with your actual API or data source
    return [
      { verse: 'John 3:16', text: 'For God so loved the world...' },
      { verse: 'Psalm 23:1', text: 'The Lord is my shepherd...' },
      // Add more search results here
    ];
  };

  return (
    <div>
      <section className="container mx-auto p-4">
      <Search onSearch={handleSearch} />
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Verse of the Day</h2>
        <p className="text-gray-800">{verse}</p>
        {showDetails && (
          <div className="text-gray-800 mt-4">
            <p>
              <span className="font-semibold">Book:</span> {book}
            </p>
            <p>
              <span className="font-semibold">Chapter:</span> {chapter}
            </p>
            <p>
              <span className="font-semibold">Verse:</span> {verseNumber}
            </p>
          </div>
        )}
        <button
          className="m-2 mx-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={fetchRandomVerse}
        >
          Get Random Verse
        </button>
        <button
          className="m-2 mx-2 bg-green-500 text-white py-2 px-4 rounded hover-bg-green-600"
          onClick={copyVerse}
        >
          Copy Verse
        </button>
        <button
          className="m-2 mx-2 bg-yellow-500 text-white py-2 px-4 rounded hover-bg-yellow-600"
          onClick={shareVerse}
        >
          Share Verse
        </button>
      </div>
      {/* Add your devotion content here */}
    </section>
          <Reflections/>
    
    </div>
    
  );
}
