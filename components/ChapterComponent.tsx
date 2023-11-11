import React, { useEffect, useState } from 'react';
import { getBibleChapters } from '@/utils/getBibleChapters';
import VerseComponent from './VerseComponent'; // Import your VerseComponent

interface ChapterComponentProps {
  bookId: string;
}

interface Chapter {
  id: string;
  bookId: string;
  number: string;
  reference: string;
}

const ChapterComponent: React.FC<ChapterComponentProps> = ({ bookId }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null); // Track the selected chapter
  const [loading, setLoading] = useState(true);

  const toggleChapters = (chapterId: string) => {
    if (chapterId === selectedChapter) {
      setSelectedChapter(null); // If the same chapter is clicked again, toggle it off
    } else {
      setSelectedChapter(chapterId); // Set the selected chapter when it's clicked
    }
  };

  useEffect(() => {
    // Fetch chapters based on the provided bookId
    getBibleChapters('de4e12af7f28f599-02',bookId)
      .then((data) => {
        if (data) {
          setChapters(data);
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
  }, [bookId]);

  return (
    <div>
      <ul className="mt-4">
        {loading ? (
          <p className="text-black font-xl font-black">Chapters are Loading...</p>
        ) : (
          chapters.map((chapter: Chapter) => (
            <div key={chapter.id} className={`text-black border-b py-2 cursor-pointer ${selectedChapter === chapter.id ? 'selected' : ''}`}>
              <p
                onClick={() => toggleChapters(chapter.id)}
                className="text-xl font-bold"
              >
                {chapter.number} - <span className="text-lg font-normal">{chapter.reference}</span>
              </p>
              {selectedChapter === chapter.id && <VerseComponent chapterId={chapter.id} />} {/* Render VerseComponent when a chapter is selected */}
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChapterComponent;
