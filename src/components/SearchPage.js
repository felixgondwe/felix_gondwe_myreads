import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import BookList from './BookList';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

class SearchPage extends Component{
 
  state = {query:'', books: [], errorMsg:''};

  updateQuery = ()=>{
    if(this.state.query){
      BooksAPI.search(this.state.query, 100).then((results) => {
        if(results.hasOwnProperty('error')){
        	this.setState({ books: [], errorMsg: 'Error occured, please try another author or title.'});
         }
         else{
            this.setState({books: results.filter( itx => itx.hasOwnProperty('imageLinks')), errorMsg: ''});  
         }
      }).catch( (err) => {
        this.setState({books: [], errorMsg: 'Error occured, contact adminstrator or try another search term.'})});
      
    }
    else{
      this.setState({query: '', books: [], errorMsg: ''});
    }
  };

runSearch = _.debounce(() => this.updateQuery(this.state.query), 300);
handleTextChange = (event) =>{
  this.setState({query: event.target.value}, ()=> {this.runSearch()});    
}
  	
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
                   <input type="text" placeholder="Search by title or authors" value={this.state.query} onChange={this.handleTextChange}/>
              </div>
            </div>
            <div className="search-books-results">
               {results}
            </div>
          </div>);
  }
}

export default SearchPage;
