import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;


export const getBibleBooks = async (bibleId) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/books`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
    });

    if (response.status === 200) {
      const responseData = response.data.data;
      
      if (responseData ) {
        
        const books = responseData.map((book) => ({
          abbreviation: book.abbreviation,
          bibleId: bibleId,
          id: book.id,
          name: book.name,
          nameLong: book.nameLong,
          // Add other additional fields as needed
        }));
        return books;
      } else {
        console.error('API response is empty or does not contain "books" property.');
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
