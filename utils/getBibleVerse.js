import axios from 'axios';

const API_URL = 'https://api.scripture.api.bible/';
const apiKey = process.env.API_KEY;

function removeHtmlTags(input) {
  return input.replace(/<[^>]*>/g, ''); // Removes all HTML tags
}

export const getBibleVerse = async (bibleId, verse) => {
  try {
    const response = await axios.get(`${API_URL}v1/bibles/${bibleId}/verses/${verse}`, {
      headers: {
        'api-key': apiKey,
        'Authorization': `Token ${apiKey}`,
      },
    });

    if (response.status === 200) {
      const responseData = response.data.data;
      const cleanedContent = removeHtmlTags(responseData.content); 
      return {
        id: responseData.id,
        content: cleanedContent,
      }
      // if (Array.isArray(responseData)) {
      //   const firstVerse = responseData[0]; // Select the first verse
      //   const cleanedContent = removeHtmlTags(firstVerse.content); // Remove HTML tags
      //   return {
      //     id: firstVerse.id,
      //     content: cleanedContent,
      //   };
      // } else {
      //   console.error('API response is empty or does not contain verses.');
      //   return null;
      // }
    } else {
      console.error('API request failed with status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API request:', error);
    return null;
  }
};
