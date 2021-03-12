import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const [book, setBook] = useState('');
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onDelete = async e => {
    try {
      await axios.delete(`/api/books/${id}`);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

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
            <button type='button' className='delete' onClick={onDelete}>
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
