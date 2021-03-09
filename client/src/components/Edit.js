import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    comment: '',
  });
  const { title, author, genre, year, comment } = formData;

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(response => response.json())
      .then(json =>
        setFormData({
          title: json.title,
          author: json.author,
          genre: json.genre,
          year: json.year,
          comment: json.comment,
        })
      );
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const book = {
      title,
      author,
      genre,
      year,
      comment,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(book);
      const res = await axios.post(`/api/books/${id}`, body, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)} id='add-book-form'>
      <h2>Edit Book</h2>
      <div className='input-container'>
        <div className='input-groups'>
          <label htmlFor='title'>Title</label>
          <br></br>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='input-groups'>
          <label htmlFor='author'>Author</label>
          <br></br>
          <input
            name='author'
            value={author}
            onChange={e => onChange(e)}
          ></input>
        </div>
        <div className='input-groups'>
          <label htmlFor='genre'>Genre</label>
          <br></br>
          <input name='genre' value={genre} onChange={e => onChange(e)}></input>
        </div>
        <div className='input-groups'>
          <label htmlFor='year'>Year</label>
          <br></br>
          <input name='year' value={year} onChange={e => onChange(e)}></input>
        </div>
        <div className='comment-container'>
          <label htmlFor='comment'>Comment</label>
          <br></br>
          <textarea
            name='comment'
            className='comment'
            value={comment}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
      </div>
      <Link to='/'>
        <button type='button' className='cancel-button'>
          Cancel
        </button>
      </Link>
      <input type='submit' value='Submit' className='submit' />
    </form>
  );
};

export default Edit;
