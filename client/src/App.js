import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books')
      .then(response => setBooks(response.data))
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <div id='book-container'>
        <Link to='/add'>
          <button type='button' className='add-book-button'>
            <i className='fas fa-plus'></i> Add Book
          </button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={`books ${value.read ? 'check' : ''}`}
                >
                  <td className='book-title'>
                    <Link to={`/book/${value._id}`} className='book-link'>
                      {value.title}
                    </Link>
                  </td>
                  <td className='book-author'>{value.author}</td>
                  <td className='book-genre'>{value.genre}</td>
                  <td className='book-year'>{value.year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
