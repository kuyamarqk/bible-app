import React, { useEffect, useState } from 'react';
import { getBibleBooks } from '@/utils/getBibleBooks';
import ChapterComponent from './ChapterComponent';

interface Book {
  abbreviation: string;
  bibleId: string;
  id: string;
  name: string;
  nameLong: string;
}

const BookComponent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // State for filtered books
  const [selectedBook, setSelectedBook] = useState<string | null>(null); // Track the selected book
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookList, setShowBookList] = useState(false);

  const handleShowBookList = () => {
    const delay = 2000;
  
    // Show loading while waiting for the delay
    setLoading(true);
  
    // Add a delay before showing or hiding the list
    setTimeout(() => {
      setShowBookList(!showBookList); // Toggle the state
      setLoading(false); // Hide loading after the delay
    }, delay);
  }

  const toggleBooks = (bookId: string) => {
    if (bookId === selectedBook) {
      setSelectedBook(null); // If the same book is clicked again, toggle it off
    } else {
      setSelectedBook(bookId); // Set the selected book when it's clicked
    }
  };

  useEffect(() => {
    getBibleBooks('de4e12af7f28f599-02')
      .then((data) => {
        if (data) {
          setBooks(data);
          setFilteredBooks(data); // Initialize filteredBooks with all books
          setLoading(false);
        } else {
          console.error('Data is empty: ');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching Data: ', error);
        setLoading(false);
      });
  }, []);

  // Update the filtered books when the search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, display all books
      setFilteredBooks(books);
      setShowBookList(false);
    } else {
      // If there is a search query, filter the books based on the query
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
      setShowBookList(true);
    }
  }, [searchQuery, books]);

  return (
    <div>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full text-black"
        />
      </div>
      <ul className="mt-4">
      <button
  onClick={handleShowBookList}
  className={`text-blue-500 underline cursor-pointer transition-opacity duration-500 hover:opacity-75 `}
>
           {showBookList ? 'Hide List' : 'View List'}
        </button>

        {showBookList && (
        <div
          className={`transition-opacity duration-500 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {loading ? (
            <p className="text-black font-xl font-black">Books are Loading...</p>
          ) : (
            filteredBooks.map((book: Book) => (
              <div key={book.id} className={`text-black border-b py-2 cursor-pointer ${selectedBook === book.id ? 'selected' : ''}`}>
                <p
                  onClick={() => toggleBooks(book.id)}
                  className='text-xl font-bold'
                >
                  {book.name} - <span className='text-lg font-normal'>{book.nameLong}</span>
                </p>
                {selectedBook === book.id && <ChapterComponent bookId={selectedBook} />}
              </div>
            ))
          )}
  </div>
)}
        
      </ul>
    </div>
  );
};

export default BookComponent;
