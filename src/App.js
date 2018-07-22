import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';
import * as _ from 'lodash';
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
  }
  
  componentDidMount(){
     BooksAPI.getAll().then( (books) => {
    	  this.setState({books:books})
   		})
 	}

  addBook = (book, str) => {
  	if(book){
    	let tempBook = Object.assign(book);
        BooksAPI.get(tempBook.target.id).then( (item) => {
            let tempItem = Object.assign({}, item);
            let books = Object.assign([], this.state.books);
            tempItem.shelf = str;
            books = books.map( tmp => {
            	if(tmp.id === tempItem.id){
                	tmp.shelf = str;
                }
              return tmp;
            });
        	books.push(tempItem);
        	BooksAPI.update(tempItem, tempItem.shelf)
            this.setState({books: _.uniqBy(books,'id')});
        }, str);
        
    }
    
  };
  onBookShelfChange= (book, str) => {
    let modifiedBooks = [];
    const value = book.target.value;
    const bkList = Object.assign([], this.state.books);
    let selBook = bkList.filter(item => item.id === book.target.id);
    const itm = selBook.length > 0 ? selBook[0]: book;
  
    if(itm){
     BooksAPI.update(itm, value);
     modifiedBooks = bkList.map(itx => { 
        if(itx.id === itm.id){
          itx.shelf = value;
        }
        return itx;

      });
      this.setState({
          books: _.uniqBy(modifiedBooks, 'id')
      });
    }
  };

  render() {
    const currRead = this.state.books.filter( (item) => item.shelf === "currentlyReading");
    const wantToRead = this.state.books.filter( (item) => item.shelf === "wantToRead");
    const toRead = this.state.books.filter( (item) => item.shelf === "read");
    return (
      <div className="app">
       <Route exact path="/" render={ () => (
    	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
          	  <BookShelf books={currRead} category="Currently Reading" onBookShelfChange={this.onBookShelfChange} />
          	  <BookShelf books={wantToRead} category="Want To Read" onBookShelfChange={this.onBookShelfChange} />
              <BookShelf books={toRead} category="Read" onBookShelfChange={this.onBookShelfChange} />
            </div>
            <div className="open-search">
              <Link to="/search">Add book</Link>
            </div>
          </div>
    		
    	)} />
		<Route path="/search" render={ () => (
        	<SearchPage onSearchChange={this.searchBooks} addBook={this.addBook} bookShelfList={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
