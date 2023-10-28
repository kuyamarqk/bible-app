import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

export const getBibleVerses = async (bibleId, chapterId) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/chapters/${chapterId}/verses`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
    });

    if (response.status === 200) {
      const responseData = response.data.data;
      if (responseData) {
        const verses = Object.values(responseData).map((verse) => ({
          id: verse.id,
          bookId: verse.bookId,
          chapterId: verse.chapterId,
          number: verse.number,
          reference: verse.reference,
          text: verse.content,
        }));
        return verses;
      } else {
        console.error('API response is empty or does not contain verses.');
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
