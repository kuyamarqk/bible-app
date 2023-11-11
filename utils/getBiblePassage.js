import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

export const getBiblePassage = async (bibleId, passage) => {
  
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/search?query=${passage}&sort=relevance`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`, // Include the authorization header
      },
    });
    
    if (response.status === 200) {
      const responseData = response.data.data;
      console.log("verses:"+responseData.verses);
      if (responseData.verses) {
        const verses = responseData.verses.map((verse) => ({
          id: verse.id,
          reference: verse.reference,
          text: verse.text,
        }));
        console.log("verses: "+verses);
        return verses;
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
