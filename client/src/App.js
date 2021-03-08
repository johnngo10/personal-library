import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(json => setBooks(json));
  }, []);

  const onSubmit = e => {};

  console.log(books);

  return (
    <div className='App'>
      <div id='book-container'>
        <Link to='/add'>
          <button type='button' class='add-book-button'>
            Add Book
          </button>
        </Link>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
          </tr>
          <tbody>
            {books.map((value, index) => {
              return (
                <tr key={index} class='books'>
                  <td>{value.title}</td>
                  <td>Example Author</td>
                  <td>Example Genre</td>
                  <td>Example Year</td>
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
