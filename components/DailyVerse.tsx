import React, { useState, useEffect } from 'react';
import { getBibleVerse } from '@/utils/getBibleVerse';
import { getRandomPassage } from '@/utils/getRandomPassage';
import Modal from 'react-modal';

const DailyVerse = () => {
  const [verse, setVerse] = useState('');
  const [showVerse, setShowVerse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reference, setReference] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [ copySuccess, setCopySuccess] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
}

const closeModal = () => {
  setModalIsOpen(false);
}

  const generateDailyVerse = async () => {
    try {
      const passage = await getRandomPassage('de4e12af7f28f599-02');
      const dailyPassage = await getBibleVerse('de4e12af7f28f599-02', passage);

      if (dailyPassage) {
        setVerse(dailyPassage.content);
        setReference(dailyPassage.reference);
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
    if (navigator.share) {
      navigator.share({
        title: 'Daily Bible Verse',
        text: verse,
      })
        .then(() => console.log('Verse shared successfully'))
        .catch((error) => console.error('Error sharing verse:', error));
    } else {
      // Handle browsers that do not support the Web Share API
      console.error('Web Share API is not supported in this browser.');
    }
  };

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = verse;

    // Append the text area to the document
    document.body.appendChild(textArea);

    // Select and copy the text
    textArea.select();
    document.execCommand('copy');

    // Remove the temporary text area
    document.body.removeChild(textArea);

    console.log('Verse copied to clipboard');
    setCopySuccess(true);
  };

  return (
    <div className="daily-verse-container bg-blue-100 text-blue-900 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Verse of the Day</h2>
      {loading ? (
        <p>Loading daily verse...</p>
      ) : showVerse ? (
        <>
          <p className="text-gray-600 text-lg"><span>{reference}</span> {verse}</p>

          <div className="mt-4 flex space-x-2">
            <button
              className="share-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="copy-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Copy Success Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold">Copy Successful</h2>
          <p>The verse has been copied to your clipboard.</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DailyVerse;
