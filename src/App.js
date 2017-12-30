import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import BookDetails from './components/BookDetails'

import './App.css'

import * as BooksAPI from './BooksAPI'
import * as events from './utils/events'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
  }

  onMoveToShelfEvent(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then(() => this.getAllBooks())
    }
  }

  componentWillUnmount() {
    events.unSubscribe(events.moveToShelfEvent, this.onMoveToShelfEvent.bind(this))
  }
  
  componentDidMount() {
    this.getAllBooks()
    events.onEvent(events.moveToShelfEvent, this.onMoveToShelfEvent.bind(this))
  }

  render() {
    return (
      <div className="app">
        <Route exact 
          path="/" 
          render={() => 
            (
              <ListBooks books={this.state.books} />
            )
          }
        />
        <Route 
          path="/search" 
          render={() => 
            (
              <SearchBooks libraryBooks={this.state.books} />
            )
          }
        />
        <Route
          path="/book/:id" 
          render={(props) => {
              const { match: { params } } = props;
              const libraryBook = this.state.books.find(book => book.id === params.id)
              return <BookDetails libraryBook={libraryBook} bookId={params.id} />
            }
          }
        />
      </div>
    )
  }
}

export default BooksApp
