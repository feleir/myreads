import PropTypes from 'prop-types'

export const BookType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    shelf: PropTypes.string,
    imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
    previewLink: PropTypes.string,
    infoLink: PropTypes.string
})

export const ModalStyle = {
    overlay: {
      backgroundColor: 'gray',
      opacity: '0.5'
    },
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: '0px',
      backgroundColor: 'gray',
      opacity: '0.5'
    }
  }