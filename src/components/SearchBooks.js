import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {debounce} from 'throttle-debounce'
import Book from './Book'
import Modal from 'react-modal'

import PropTypes from 'prop-types'
import { BookType } from './common'
import * as BooksAPI from '../BooksAPI'

import { ModalStyle } from './common'
import loading from '../icons/loading.svg'

class SearchBooks extends Component {
    state = {
        query: '',
        foundBooks: [],
        loading: false
    }

    static propTypes = {
        libraryBooks: PropTypes.arrayOf(BookType).isRequired
    }

    constructor(props) {
        super(props)
        this.performSearch = debounce(500, this.performSearch);
    }

    updateBookShelves = () => {
        const { libraryBooks } = this.props
        const { foundBooks } = this.state

        const mappedLibrary = new Map(libraryBooks.map(book => [book.id, book.shelf]))
        return foundBooks.map(book => {
            const libraryShelf = mappedLibrary.get(book.id)
            book.shelf = libraryShelf || 'none'
            return book
        })
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.performSearch()
    }

    performSearch() {
        const { query } = this.state
        if (query) {
            this.setState({ loading: true })
            BooksAPI.search(query).then(response => this.setState({ foundBooks : response.error ? [] : response, loading: false }))
        } else {
            this.setState({ foundBooks: [] })
        }
    }

    render() {
        const { query } = this.state
        const books = this.updateBookShelves();
        return (
            <div>
                <Modal
                    isOpen={this.state.loading}
                    style={ModalStyle}>
                    <img src={loading} width="50" alt="Loading"/>
                </Modal>
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
                                            <Book book={book} showDetailsLink="true"/>
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
            </div>
        )
    }
}

export default SearchBooks