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
    read: false,
  });
  const { title, author, genre, year, comment, read } = formData;

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
          read: json.read,
        })
      );
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = e => {
    setFormData({ ...formData, read: e.target.checked });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const book = {
      title,
      author,
      genre,
      year,
      comment,
      read,
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
            className='form-input'
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
            className='form-input'
            value={author}
            onChange={e => onChange(e)}
          ></input>
        </div>
        <div className='input-groups'>
          <label htmlFor='genre'>Genre</label>
          <br></br>
          <input
            name='genre'
            className='form-input'
            value={genre}
            onChange={e => onChange(e)}
          ></input>
        </div>
        <div className='input-groups'>
          <label htmlFor='year'>Year</label>
          <br></br>
          <input
            name='year'
            pattern='[0-9]*'
            className='form-input'
            value={year}
            onChange={e => onChange(e)}
          ></input>
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
        <div className='read-container'>
          <label className='read' htmlFor='read'>
            Read?
          </label>
          <input
            name='read'
            type='checkbox'
            className='form-checkbox'
            checked={read}
            onChange={e => onCheckboxChange(e)}
          ></input>
        </div>
        <div className='form-button-container'>
          <div>
            <Link to='/'>
              <button type='button' className='cancel-button'>
                Cancel
              </button>
            </Link>
            <input type='submit' value='Save' className='submit' />
          </div>
          <div>
            <button type='button' className='delete'>
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Edit;
