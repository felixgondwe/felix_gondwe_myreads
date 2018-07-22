/**
 * Functionality: move book from one shelf to another
 */
import React from 'react';

const BookShelfChanger = (props) => {
    const {bookId, onBookShelfChange, addBook, shelf} = props;
    const tempMethod = onBookShelfChange? onBookShelfChange:addBook;

    return(
          <div className="book-shelf-changer">
            <select onChange={ (e) => {tempMethod(e, e.target.value) } } id={bookId} value={shelf}  >
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
          </div>
        );
};

export default BookShelfChanger;
