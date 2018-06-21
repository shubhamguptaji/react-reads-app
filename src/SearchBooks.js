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
					if(!("thumbnails) in book)) {
					     book.imageLinks.thumbnail = "https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fi.gadgets360cdn.com%2Flarge%2Fpdf_pixabay_1493877090501.jpg%3Foutput-quality%3D80&imgrefurl=https%3A%2F%2Fgadgets.ndtv.com%2Fapps%2Ffeatures%2Fcompress-pdf-free-reduce-size-how-to-1689372&docid=YmOUXE6P4BpZqM&tbnid=bJw8CGeWJ00RTM%3A&vet=10ahUKEwjxy6Xp1OTbAhVJipQKHTsAAY8QMwhUKAAwAA..i&w=800&h=450&bih=759&biw=1536&q=pdf&ved=0ahUKEwjxy6Xp1OTbAhVJipQKHTsAAY8QMwhUKAAwAA&iact=mrc&uact=8"
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
