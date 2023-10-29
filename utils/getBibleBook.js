import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

export const getBibleBook = async (bibleId, bookName) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/books`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
    });

    if (response.status === 200) {
      const responseData = response.data.data;

      if (Array.isArray(responseData)) {
        // Filter the list of books by the provided bookName
        const matchingBooks = responseData.filter((book) =>
          book.name.toLowerCase().includes(bookName.toLowerCase())
        );

        return matchingBooks.map((book) => ({
          abbreviation: book.abbreviation,
          bibleId: bibleId,
          id: book.id,
          name: book.name,
          nameLong: book.nameLong,
          // Add other additional fields as needed
        }));
      } else {
        console.error('API response is empty or does not contain a valid book list.');
        return null;
      }
    } else {
      console.error('API request failed with status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API request:', error);
    return null;
  }
};
