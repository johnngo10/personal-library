const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  year: {
    type: Number,
  },
  comment: {
    type: String,
  },
  read: {
    type: Boolean,
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
