import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Book = () => {
  const [book, setBook] = useState('');
  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(response => response.json())
      .then(json => setBook(json));
  }, []);

  return (
    <div className='book-info'>
      <div className='book-info-container'>
        <div className='info-group'>
          <div className='infos book-info-title'>
            <h3>{book.title}</h3>
          </div>
          <div className='infos book-info-author'>
            <p>by {book.author}</p>
          </div>
          <div className='infos book-info-genre'>
            <p>Genre: {book.genre}</p>
          </div>
          <div className='infos book-info-year'>
            <p>Published: {book.year}</p>
          </div>
          <div className='infos book-info-comments'>
            <p>{book.comment}</p>
          </div>
          <div className='book-info-button-container'>
            <div>
              <Link to='/'>
                <button type='button' className='cancel-button'>
                  Cancel
                </button>
              </Link>
              <Link to={`/book/edit/${id}`}>
                <button type='button' className='edit-button'>
                  Edit
                </button>
              </Link>
            </div>
            <button type='button' className='delete'>
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
