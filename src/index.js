import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Modal from 'react-modal'

import './index.css'

const appElement = document.getElementById('root');
Modal.setAppElement(appElement)

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    appElement)
