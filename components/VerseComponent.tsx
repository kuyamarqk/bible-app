import React, { useEffect, useState } from 'react';
import { getBibleVerses } from '@/utils/getBibleVerses'; // Import your function for fetching verses
import SpecificVerseComponent from './SpecificVerseComponent'; // Import your SpecificVerseComponent

interface VerseComponentProps {
  chapterId: string;
}

interface Verse {
  id: string;
  chapterId: string;
  reference: string;
  text: string;
}

const VerseComponent: React.FC<VerseComponentProps> = ({ chapterId }) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null); // Track the selected verse
  const [loading, setLoading] = useState(true);

  const toggleVerse = (verseId: string) => {
    if (verseId === selectedVerse) {
      setSelectedVerse(null); // If the same verse is clicked again, toggle it off
    } else {
      setSelectedVerse(verseId); // Set the selected verse when it's clicked
    }
  };

  useEffect(() => {
    // Fetch verses based on the provided chapterId
    getBibleVerses('de4e12af7f28f599-02', chapterId)
      .then((data) => {
        if (data) {
          setVerses(data);
          setLoading(false);
          console.log(data);
        } else {
          console.error('Data is empty');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching Data: ', error);
        setLoading(false);
      });
  }, [chapterId]);

  return (
    <div>
      <ul className="mt-4">
        {loading ? (
          <p className="text-black font-xl font-black">Verses are Loading...</p>
        ) : (
          verses.map((verse: Verse) => (
            <div
              key={verse.id}
              className={`text-black cursor-pointer ${selectedVerse === verse.id ? 'selected' : ''}`}
              onClick={() => toggleVerse(verse.id)}
            >
              <p className="text-lg font-normal">{verse.reference}</p>
              {selectedVerse === verse.id && <SpecificVerseComponent verseId={selectedVerse} />}
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default VerseComponent;
