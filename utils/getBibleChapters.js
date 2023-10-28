import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

export const getBibleChapters = async (bibleId, bookId) => {
    
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/books/${bookId}/chapters`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
    });
    
    if (response.status === 200) {
      const responseData = response.data.data;
      if (responseData) {
        const chapters = responseData.map((chapter) => ({
          id: chapter.id,
          bookId: bookId,
          number: chapter.number,
          reference: chapter.reference,
        }));
        return chapters;
      } else {
        console.error('API response is empty or does not contain chapters.');
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
