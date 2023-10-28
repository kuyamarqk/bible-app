import React, { useState, useEffect } from 'react';
import { getBibleVerse } from '@/utils/getBibleVerse';
import { getRandomPassage } from '@/utils/getRandomPassage';

const DailyVerse = () => {
  const [verse, setVerse] = useState('');
  const [showVerse, setShowVerse] = useState(false);
  const [loading, setLoading] = useState(true);

  const generateDailyVerse = async () => {
    try {
      const passage = await getRandomPassage('de4e12af7f28f599-02');
      const dailyPassage = await getBibleVerse('de4e12af7f28f599-02', passage);

      if (dailyPassage) {
        setVerse(dailyPassage.content);
        setShowVerse(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Bible verse:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateDailyVerse();
  }, []);

  const handleShare = () => {
    // Include your share logic here
  };

  const handleCopy = () => {
    // Include your copy logic here
  };

  return (
    <div className="daily-verse-container bg-black text-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Verse of the Day</h2>
      {loading ? (
        <p>Loading daily verse...</p>
      ) : showVerse ? (
        <>
          <p className="text-gray-300">{verse}</p>

          <div className="mt-4">
            <button
              className="share-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="copy-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </>
      ) : (
        <p>Unable to fetch daily verse.</p>
      )}

      <div className="daily-verse-actions mt-4">
        <button
          className="generate-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={generateDailyVerse}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default DailyVerse;
