import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(json => setBooks(json));
  }, []);

  const onSubmit = e => {};

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
                <tr key={index} className='books'>
                  <td className='book-title'>
                    <Link to={`/book/${value._id}`} className='book-link'>
                      {value.title}
                    </Link>
                  </td>
                  <td>{value.author}</td>
                  <td>{value.genre}</td>
                  <td>{value.year}</td>
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
