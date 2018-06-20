import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Book extends Component {
	static propTypes = {
		coverImage: PropTypes.string.isRequired,
		authors: PropTypes.array.isRequired,
		title: PropTypes.string.isRequired,
		shelfChange: PropTypes.func.isRequired
	}

	render(){
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{width:128,height:193,backgroundImage:`url(${this.props.coverImage})`}}></div>
					<div className="book-shelf-changer">
						<select onChange={this.props.shelfChange} defaultValue="move">
							<option value="move" disabled>Moveto...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">WantToRead</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.props.title}</div>
				<div className="book-authors">{this.props.authors.map((author) => (
					<div key={author}>{author}</div>
					))}</div>
			</div>
		);
	}
}

export default Book;