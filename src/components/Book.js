import React from 'react'
import { Link } from 'react-router-dom'

import { BookType } from './common'
import * as events from '../utils/events'

const Book = (props) => {
    const { book } = props
    const bookCoverStyle = {
        width: 128,
        height: 158,
        backgroundImage: `url('${book.imageLinks.smallThumbnail}')`
    }
    const detailLink = `/book/${book.id}`

    return (
        <div className="book">
            <div className="book-top">
                <Link className="book-details" to={detailLink}>
                    <div className="book-cover" style={bookCoverStyle}/>
                    {props.showDetailsLink && 
                        (
                            <div className="book-link">
                                Click for more details
                            </div>
                        )
                    }
                </Link> 
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => 
                        events.triggerEvent(events.moveToShelfEvent, book, e.target.value)
                        }>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(', ')}</div>
        </div>
    )
}

Book.propTypes = {
    book: BookType.isRequired
}

export default Book