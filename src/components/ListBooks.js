import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

import PropTypes from 'prop-types' 
import { BookType } from './common'
import { groupBy } from '../utils/utils'

const bookShelves = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read"
}

const ListBooks = (props) => {
    const { books } = props
    const groupedByShelfBooks = groupBy(books, 'shelf')
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>
                    MyReads by <a href="https://www.linkedin.com/in/ivan-diaz-fernandez-34008022" target="_blank">Ivan Diaz</a>
                </h1>
            </div>
            <div className="list-books-content">
                { 
                    Object.keys(bookShelves)
                        .map(key => (
                            <BookShelf 
                                key={key}
                                books={groupedByShelfBooks[key] || []} 
                                title={bookShelves[key]} 
                            /> 
                        )) 
                }
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

ListBooks.propTypes = {
    books: PropTypes.arrayOf(BookType).isRequired
}

export default ListBooks