"use client";
import { useState } from 'react';
import { getBibleVerse  } from '@/utils/api';
import { getRandomPassage } from '@/utils/getRandomPassage'
export default function Home() {
  const [verse, setVerse] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verseNumber, setVerseNumber] = useState('');

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
    }
  };
  // Helper function to parse the book, chapter, and verse from a passage
  const parsePassage = (passage: string) => {
    const [parsedBook, rest] = passage.split('+', 2);
    const [parsedChapter, parsedVerse] = rest.split(':');
    return [parsedBook, parsedChapter, parsedVerse];
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-2xl font-bold mb-4">Daily Bible Devotion</header>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Verse of the Day</h2>
        <p className="text-gray-800">{verse}</p>
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
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={fetchRandomVerse}
        >
          Get Random Verse
        </button>
      </div>
      {/* Add your devotion content here */}
    </div>
  );
}
