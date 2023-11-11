import { getBibleBooks } from "./getBibleBooks";
import { getBibleChapters } from "./getBibleChapters";
import { getBibleVerses } from "./getBibleVerses";

export async function getRandomPassage(bibleId) {
  try {
    const books = await getBibleBooks(bibleId);
    if (!books) {
      throw new Error("Failed to fetch Bible books.");
    }

    if (books.length === 0) {
      throw new Error("No Bible books available.");
    }

    

    const randomBook = books[Math.floor(Math.random() * books.length)];
    const randomBookId = randomBook.id
    
    const chapters = await getBibleChapters(bibleId, randomBookId);
    if (!chapters) {
      throw new Error("Failed to fetch Bible chapters.");
    }

    if (chapters.length === 0) {
      throw new Error("No Bible books chapters.");
    }

    const randomChapter = Math.floor(Math.random() * chapters.length);
    const randomChapterId = `${randomBookId}.${randomChapter}`;
    
    const verses = await getBibleVerses(bibleId, randomChapterId);
    
    if (!verses) {
      throw new Error("Failed to fetch Bible verses.");
    }

    if (verses.length === 0) {
      throw new Error("No Bible books verses.");
    }

    const randomVerse = Math.floor(Math.random() * verses.length);

    const verse = Math.floor(Math.random() * 20) + 1; // Random verse between 1 and 20
    console.log(`${randomBookId}.${randomChapter}.${randomVerse}`)
    const passage = `${randomBookId}.${randomChapter}.${randomVerse}`;
    
    return passage;
  } catch (error) {
    console.error("Error generating random passage:", error.message);
    return "Error";
  }
}
