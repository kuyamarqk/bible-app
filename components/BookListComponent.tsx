import {useState, useEffect} from 'react';
import BookComponent from './BookComponent';
import { getBibleBook } from '@/utils/getBibleBook';


const BookListComponent = () => {
    const [loading, setLoading] = useState(false);
    

    

  return (
    <div>
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Book List</h2>
        
      </div>
        <div>
            <BookComponent/>
        </div>
    </div>
  )
}

export default BookListComponent