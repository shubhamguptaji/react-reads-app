import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
	state = {
		books: [],
		query: ""
	}

	static propTypes = {
		changeShelf: PropTypes.func.isRequired
	}

	SearchQuery(query){
		this.setState({ query });
		if(query.length === 0) this.setState({ books: [] });
		if(query) {
			BooksAPI.search(query)
			.then( books => {
				if ("error" in books) return [];
				return books.map((book) => {
					if(!("authors" in book)) {
						book["authors"] = ["unknown"];
					}
					return book;
				})}).then(books => {this.setState({books})})
		}
	}
	render() {
		const { books,query } = this.state;
		const { changeShelf } = this.props;
		return (
			<div className="search-books">
            	<div className="search-books-bar">
              		<Link to='/' className="close-search">Close</Link>
              		<div className="search-books-input-wrapper">
                		<input type="text" placeholder="dsms" value={this.state.query} onChange={(event) => this.SearchQuery(event.target.value)}/>
              		</div>
            	</div>
            	<div className="search-books-results">
            	{books.length === 0 && query.length === 0 && (
            		<h1 style={{textAlign:"center"}}>Search Books :)</h1>
            		)}
            	{books.length === 0 && query.length !==0 && (
            		<h1 style={{textAlign:"center"}}>No Books Found :(</h1>
            		)}

              		<ol className="books-grid">
              			{books.map((book) => (
              			    <li key={book.id}>
              			    	<Book shelfChange={(e) => (changeShelf(book, e))} title={book.title} authors={book.authors}
              			    	coverImage={book.imageLinks.thumbnail} />
              			    </li>
              			))}
              		</ol>
            	</div>
          	</div>
		)
	}
}

export default SearchBooks