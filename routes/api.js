'use strict';

const Book = require('../models/Book');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(function (req, res) {
      Book.find(function (err, data) {
        if (err) {
          res.status(404).json({ message: err.message });
        } else {
          res.status(200).json(data);
        }
      });
    })

    .post(function (req, res) {
      let { title, author, genre, year, comment, read } = req.body;
      if (!title) {
        res.send('missing required field title');
      } else {
        const record = new Book({
          title,
          author,
          genre,
          year,
          comment,
          read,
        });

        record.save().then(result => {
          res.json({
            _id: result._id,
            title,
            author,
            genre,
            year,
            comment,
            read,
          });
        });
      }
    })

    .delete(function (req, res) {
      Book.remove(function (err, data) {
        if (err) {
          res.status(404).json({ message: err.message });
        } else {
          res.status(400).send('complete delete successful');
        }
      });
    });

  app
    .route('/api/books/:id')
    .get(function (req, res) {
      let bookId = req.params.id;
      Book.findOne({ _id: bookId }, function (err, data) {
        if (!data) {
          res.status(404).send('No book with that id exists');
        } else {
          res.status(200).json(data);
        }
      });
    })

    .patch(function (req, res) {
      let bookid = req.params.id;
      let { title, author, genre, year, comment, read } = req.body;
      if (!title) {
        res.status(400).send('missing required field title');
      } else {
        Book.findOne({ _id: bookid }, function (err, data) {
          if (!data) {
            res.status(404).send('No book with that id exists');
          } else {
            Book.findOneAndUpdate(
              { _id: bookid },
              {
                $set: {
                  title: title,
                  author: author,
                  genre: genre,
                  year: year,
                  comment: comment,
                  read: read,
                },
              },
              { new: true },
              function (err, data) {
                if (err) {
                  res.status(404).json({ message: err.message });
                } else {
                  res.status(200).json(data);
                }
              }
            );
          }
        });
      }
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      Book.findOne({ _id: bookid }, function (err, data) {
        if (!data) {
          res.status(404).send('no book exists');
        } else {
          Book.findByIdAndRemove(bookid, function (err, data) {
            if (err) {
              res.status(404).send(err);
            } else {
              res.status(200).send('delete successful');
            }
          });
        }
      });
    });
};
