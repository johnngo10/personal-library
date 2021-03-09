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
          <h3 className='book-info-title'>{book.title}</h3>
          <p className='book-info-author'>{book.author}</p>
          <p className='book-info-genre'>{book.genre}</p>
          <p className='book-info-year'>{book.year}</p>
          <p className='book-info-comments'>{book.comment}</p>
          <div className='book-info-button-container'>
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
        </div>
      </div>
    </div>
  );
};

export default Book;
