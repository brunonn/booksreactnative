import {BookItemReponse} from '../models/BooksApiResponse';
import axios from 'axios';

export const bookRequest = async (text: string): Promise<BookItemReponse[]> => {
  if (text.length === 0) {
    return;
  }
  //change spaces to +
  const changedSearch = text.replace(/\s/g, '+');
  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + changedSearch;
  try {
    const res = await axios.get(url);
    const result = res.data.items.map(function (current) {
      return current.volumeInfo;
    });

    return result.slice(0, 8);
  } catch {
    return [];
  }
};
