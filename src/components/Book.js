/*
Represents a book
Properties: title, author, image
functionality: move book to category
*/
import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const Book = (props) => {

  const {book, onBookShelfChange, addBook} = props;
  let authors = '';
  if(book){
    if(book.authors){
    authors =book.authors.join(', ')
    }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={book.style}></div>
        <BookShelfChanger onBookShelfChange={onBookShelfChange ? onBookShelfChange: addBook } bookId={book.id} shelf={book.shelf} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors}</div>
  </div>);
  } 
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}

export default Book;
