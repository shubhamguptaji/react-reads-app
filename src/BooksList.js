import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

class BooksList extends Component {
	static propTypes = {
		books: PropTypes.object.isRequired,
		changeShelf: PropTypes.func.isRequired
	}

	render() {
		return(
			<div className="list-books">
				<div className="list-books-title">
 					<h1>MyReads</h1>
 				</div>
 				<div className="list-books-content">
 					<BookShelf books={this.props.books.currentlyReading}
 						action={"Currently Reading"} changeShelf={this.props.changeShelf} />
 					<BookShelf books={this.props.books.wantToRead}
 						action={"Want to Read"}
 						changeShelf={this.props.changeShelf} />
 					<BookShelf books={this.props.books.read}
 						action={"Read"} changeShelf={this.props.changeShelf} />
 				</div>
 				<div className="open-search">
 					<Link to='/search'>Add a book</Link>
 				</div>
 			</div>

		)
	}
}

export default BooksList;