// utils/api.js
import axios from 'axios';

const apiKey = process.env.ESV_API_KEY;
const ESV_API_URL = 'https://api.esv.org/v3/passage/text/';

export const getBibleVerse = async (passage) => {
    try {
      const response = await axios.get(ESV_API_URL, {
        params: {
          q: passage,
          'include-footnotes': false,
          'include-verse-numbers': false,
          'include-headings': true,
          'include-subheadings': false,
          'include-surrounding-chapters': false,
          'include-verse-permalink': false,
          'include-passage-references': true,
          'content-type': 'json',
          'version': 'KJV',
        },
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      });
  
      if (response.status === 200) {
        return response.data.passages[0];
      }
    } catch (error) {
      console.error('Error fetching Bible verse:', error);
    }
  
    return null;
  };


