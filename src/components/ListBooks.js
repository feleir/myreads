import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
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
                <h1>MyReads</h1>
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

export default ListBooks