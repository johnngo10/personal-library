import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');

  const onChange = e => {
    setTitle(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const book = {
      title,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(book);
      const res = await axios.post('/api/books', body, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <label>Book Title</label>
      <input type='text' id='title' name='title' onChange={e => onChange(e)} />
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Form;
