import axios from 'axios';

function removeBracketsAndNumbers(inputString) {
  return inputString.replace(/\[\d+\]/g, '');
}   

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;


export const getBibleVerse = async (bibleId, verse) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/verses/${verse}`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
      params: {
        'content-type': 'text', // Include the 'content' parameter
      },
    });

    if (response.status === 200) {
      const responseData = response.data.data;

   return {
        id: responseData.id,
        orgId: responseData.orgId,
        bibleId: responseData.bibleId,
        bookId: responseData.bookId,
        chapterId: responseData.chapterId,
        content: removeBracketsAndNumbers(responseData.content),
        reference: responseData.reference,
        verseCount: responseData.verseCount,
        copyright: responseData.copyright,
        next: {
          id: responseData.next.id,
          bookId: responseData.next.bookId,
        },
        previous: {
          id: responseData.previous.id,
          bookId: responseData.previous.bookId,
        },
      };
    } else {
      console.error('API request failed with status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API request:', error);
    return null;
  }
};
