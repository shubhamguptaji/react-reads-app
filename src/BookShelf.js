import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'


class BookShelf extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		action: PropTypes.string.isRequired,
		changeShelf: PropTypes.func.isRequired
	}

	render() {
		const changeShelf = this.props.changeShelf
		return(
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.action}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{this.props.books.map((book) => (
						<li key={book.id}>
							<Book authors={book.authors} 
							title={book.title} 
							coverImage={book.imageLinks.thumbnail} 
							shelfChange={(e) => (changeShelf(book, e))} />
						</li>
						))}
					</ol>
				</div>
			</div>	
		)
	}
}

export default BookShelf;