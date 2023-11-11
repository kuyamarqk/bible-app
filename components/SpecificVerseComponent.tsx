import React, { useEffect, useState } from 'react';
import { getBibleVerse } from '@/utils/getBibleVerse'; // Import your function for fetching a specific verse

interface SpecificVerseComponentProps {
  verseId: string;
}

interface SpecificVerse {
    id: string;
    orgId: string;
    bibleId: string;
    bookId: string;
    chapterId: string;
    content: string;
    reference: string;
    verseCount: number;
    copyright: string;
    next: {
      id: string;
      bookId: string;
    };
    previous: {
      id: string;
      bookId: string;
    };
  }

const SpecificVerseComponent: React.FC<SpecificVerseComponentProps> = ({ verseId }) => {
  const [verse, setVerse] = useState<SpecificVerse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific verse based on the provided verseId
    getBibleVerse('de4e12af7f28f599-02',verseId)
      .then((data) => {
        if (data) {
          setVerse(data);
          setLoading(false);
        } else {
          console.error('Data is empty');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching Data: ', error);
        setLoading(false);
      });
  }, [verseId]);

  return (
    <div>
      {loading ? (
        <p className="text-black font-xl font-black">Verse is Loading...</p>
      ) : verse ? (
        <p className="text-black">
          {verse.content}
        </p>
      ) : (
        <p className="text-black font-xl font-black">Verse not found</p>
      )}
    </div>
  );
};

export default SpecificVerseComponent;
