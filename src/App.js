import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList'
import SearchBooks from './SearchBooks'
import './App.css';

class BooksApp extends Component {
  state = {
    books: {
      wantToRead: [],
      read: [],
      currentlyReading: []
    },
    query: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.setState({ books : {
        wantToRead: books.filter( b => b.shelf === 'wantToRead'),
        read: books.filter( b => b.shelf === 'read'),
        currentlyReading: books.filter( b => b.shelf === 'currentlyReading')
      } })
    })   
  }

  changeShelf = (book, event) => {
    let books = { ...this.state.books };
    if('shelf' in book) {
      const index = books[book.shelf].indexOf(book);
      books[book.shelf].splice(index, 1);
    }
    if (event.target.value !== "none") {
      books[event.target.value].push(book);
      book.shelf = event.target.value;
    }

    BooksAPI.update(book, event.target.value);

    this.setState({ books });
  };


  render() {
    const { books } = this.state
    return(
      <div className='app'>
        <Route path="/" exact render={() => (
          <BooksList books={books} changeShelf={this.changeShelf} />
          )} />
        <Route path="/search" render={()=>(
            <SearchBooks changeShelf={this.changeShelf} />
          )} />
      </div>
      )
  }
}

export default BooksApp;