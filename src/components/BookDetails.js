import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

import PropTypes from 'prop-types' 
import { BookType } from './common'
import * as BooksAPI from '../BooksAPI'

class BookDetails extends Component {
    static propTypes = {
        bookId: PropTypes.string,
        libraryBook: BookType
    }

    state = {
        book: null
    }

    componentDidMount() {
        const { bookId } = this.props
        BooksAPI.get(bookId).then(book => {
            this.setState({ book })
        })
    }

    render() {
        const { book } = this.state
        const { libraryBook } = this.props
        if (book && libraryBook) {
            book.shelf = libraryBook.shelf
        }

        return (
            <div className="books-details">
                {book && 
                    (
                        <div>
                            <div className="book-details-bar">
                                <Link className='close-book-details' to='/'>Close</Link>
                                <div className="book-details-title-wrapper">
                                    <h2>{book.title}</h2>
                                </div>
                            </div>
                            <div className="book-details-description">
                                <div className="book-links">
                                    <Book book={book} />
                                    <a href={book.previewLink} target="_blank">Preview</a>
                                    <a href={book.infoLink} target="_blank">More information</a>
                                    {book.categories && 
                                        (
                                            <div className="book-category-container">
                                                {book.categories.map((category, index) => <div className="book-category" key={index}>{category}</div>)}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="book-description">
                                    {book.description}
                                </div>
                            </div>
                        </div>
                    )
                }
                {!book && 
                    (
                        <div>
                            <div className="book-details-bar">
                                <Link className='close-book-details' to='/'>Close</Link>
                                <div className="book-details-title-wrapper">
                                    <h2>Retrieving data</h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default BookDetails