import React from 'react'
import Book from './Book'

import PropTypes from 'prop-types' 
import { BookType } from './common'

const BookShelf = (props) => {
    const { books, title } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                {books.length > 0 && 
                    (
                        <ol className="books-grid">
                        {books.map(book => (
                                <li key={book.id}>
                                    <Book book={book} showDetailsLink="true"/>
                                </li>
                            ))}
                        </ol>
                    )
                }
                {books.length === 0 && 
                    (
                        <p>Empty</p>
                    )
                }
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.arrayOf(BookType).isRequired,
    title: PropTypes.string.isRequired
}

export default BookShelf