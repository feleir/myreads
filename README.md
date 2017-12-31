# MyReads Project

This is my implementation of the MyReads project for Udacity's React Developer Nanodegree.

Demo: https://myreads.netlify.com/

## Setup

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Components

* ListBooks: groups the books by shelves and uses the BookShelf component to render then.
* BookShelf: Displays a list of books using the Book component with the header set as property.
* Book: Displays details of a book and raises a udate shelf event when a new one is selected
* BookDetail: Displays details of a book, its description and links to get more information about the book
* SearchBooks: perform custom search of books.

## Extras

Added book details as an extra and implemented a custom event publish/subscribe mechanism so the communication between components is simpler.