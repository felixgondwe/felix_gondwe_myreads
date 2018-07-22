/**
 * Functionality: render a list of books
 */
import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookList =  (props) => {
  const {books, onBookShelfChange, addBook} = props;
  return (
        <ol className="books-grid">
          {books.map((book) => (
        	<li key={book.id}><Book book={book} onBookShelfChange={onBookShelfChange? onBookShelfChange: addBook } /></li>
           ))}
		    </ol>
      );
};

BookList.PropTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
};

export default BookList;
