import React, { useEffect, useState } from 'react';
import { getBibleBooks } from '@/utils/getBibleBooks';

interface Book {
  abbreviation: string;
  bibleId: string;
  id: string;
  name: string;
  nameLong: string;
  // Add other additional fields as needed
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bibleId = "de4e12af7f28f599-02";
    getBibleBooks(bibleId)
      .then((data) => {
        if (data) {
          setBooks(data);
          setLoading(false);
        } else {
          console.error("Data is empty");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-black">List of Books</h2>
      <ul className="mt-4">
        {loading ? (
          <li className="text-lg border-b py-2 text-black">Loading...</li>
        ) : (
          books.map((book: Book) => (
            <li key={book.id} className="text-lg border-b py-2 text-black">
              {book.name} ({book.abbreviation}) - {book.nameLong}
              {/* Display additional fields as needed */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BookList;
