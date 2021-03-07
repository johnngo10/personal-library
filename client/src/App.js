import React, { useState, useEffect } from 'react';
import Header from './components/Header';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://personal-library-xuan.herokuapp.com/api/books')
      .then(response => response.json())
      .then(json => setBooks(json));
  }, []);

  const onSubmit = e => {};

  console.log(books);

  return (
    <div className='App'>
      <div>
        {books.map((value, index) => {
          return <div key={index}>{value.title}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
