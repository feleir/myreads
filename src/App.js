import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import BookDetails from './components/BookDetails'
import Modal from 'react-modal'

import loading from './icons/loading.svg'
import './App.css'

import { ModalStyle } from './components/common'
import * as BooksAPI from './BooksAPI'
import * as events from './utils/events'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  getAllBooks() {
    this.setState({ loading: true })
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .then(() => this.setState({ loading: false }))
  }

  onMoveToShelfEvent(book, shelf) {
    if (book.shelf !== shelf) {
      this.setState({ loading: true })
      BooksAPI.update(book, shelf)
        .then(() => this.getAllBooks())
        .then(() => this.setState({ loading: false }))
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
        <Modal
          isOpen={this.state.loading}
          style={ModalStyle}>
          <img src={loading} width="50" alt="Loading"/>
        </Modal>
        <Switch>
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
          <Route
            render={() => 
              (
                <ListBooks books={this.state.books} />
              )
            }
          />        
        </Switch>
      </div>
    )
  }
}

export default BooksApp
