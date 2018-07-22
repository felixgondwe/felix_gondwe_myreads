import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import BookList from './BookList';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

class SearchPage extends Component{
  state = {query:'', books: [], errorMsg:''}
  updateQuery = (query) => {
    let item = query.target.value;
    if(item){
      BooksAPI.search(item, 100).then( (results) => {
        if(results.hasOwnProperty('error')){
        	this.setState({query:item, books: [], errorMsg: 'Error occured, please try another author or title.'});
         }
         else{
            this.setState({query:item, books: results.filter( itx => itx.hasOwnProperty('imageLinks')), errorMsg: ''});  
         }
      }).catch( (err) => {
        this.setState({query:item, books: [], errorMsg: 'Error occured, contact adminstrator or try another search term.'})});
      
    }
    else{
      this.setState({query:'', books: [], errorMsg: ''});
    }
  };

handleTextChange = (event) => {
	this.updateQuery(event);   
};
  	
  render(){
    const {addBook, bookShelfList} = this.props;
    const {books} = this.state;
    let modifiedBooks = [];
    if(books.length > 0){
    	 modifiedBooks = books.map((book) => {
      					book.style = { width: 128, height: 188, backgroundImage:`url(${book.imageLinks.thumbnail})`};
						let num = _.findIndex(bookShelfList, (item) => item.id === book.id);
						if(num > 0){
							const foundBook = bookShelfList[num];
							book.shelf = foundBook.shelf;
						}
						else{
							book.shelf = "none";
						}
						
						return book;});
						
    }
  const results = this.state.errorMsg.length > 0 ? <label><mark>{this.state.errorMsg}</mark></label>: <BookList books={modifiedBooks} onBookShelfChange={addBook} />
    return(<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
				<form onSubmit={this.handleSubmit}>
                   <input type="text" placeholder="Search by title or authors" value={this.state.query} onChange={this.handleTextChange}/>
				</form>
              </div>
            </div>
            <div className="search-books-results">
               {results}
            </div>
          </div>);
  }
}

export default SearchPage;
