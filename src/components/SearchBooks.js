import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        searchBooks: []
    }

    searchBooks = () => {
        const { query } = this.state
        if (query) {
            BooksAPI.search(query).then(response => this.setState({ searchBooks : response.error ? [] : response}))
        } else {
            this.setState({ books: [] })
        }
    }

    updateBookShelves = () => {
        const { libraryBooks } = this.props
        const { searchBooks } = this.state

        const mappedLibrary = new Map(libraryBooks.map(book => [book.id, book.shelf]))
        return searchBooks.map(book => {
            const libraryShelf = mappedLibrary.get(book.id)
            book.shelf = libraryShelf || 'none'
            return book
        })
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.searchBooks()
    }

    render() {
        const { query } = this.state
        const books = this.updateBookShelves();
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
            </div>
            <div className="search-books-results">
                {books.length > 0 && 
                    (
                        <ol className="books-grid">
                        {books.map(book => (
                                <li key={book.id}>
                                    <Book book={book} />
                                </li>
                            ))}
                        </ol>
                    )
                }
                {books.length === 0 && 
                    (
                        <p className="align-center">No books found.</p>
                    )
                }
            </div>
          </div>
        )
    }
}

export default SearchBooks