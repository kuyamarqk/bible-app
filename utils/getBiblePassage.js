import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

export const getBiblePassage = async (bibleId, passage) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/search?query=${passage}`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`, // Include the authorization header
      },
    });

    if (response.status === 200) {
      // Check the structure of the response data and adjust this line accordingly
      // console.log(response.data);
      return response.data; // Or whatever structure your API response has
    }
  } catch (error) {
    console.error('Error fetching Bible passage:', error);
  }

  return null;
};
