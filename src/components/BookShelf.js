/**
 * Functionality: Main book shelf to show all the books in their respective shelves
 */
import React from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

const BookShelf = (props) => {
      const{books, category, onBookShelfChange, addBook} = props;
  	  let modifiedBooks = books.map( (book) => {book.style = { width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})`}; return book});
      return(
      	<div className="bookshelf">
          <h2 className="bookshelf-title">{category}</h2>
          <BookList books={modifiedBooks} onBookShelfChange={onBookShelfChange? onBookShelfChange: addBook }/>
        </div>
      );
};

BookShelf.PropTypes = {
    books: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
 };

export default BookShelf;
