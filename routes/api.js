'use strict';

const Book = require('../models/Book');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
    })

    .post(function (req, res) {
      let { title, author, genre, year, comment } = req.body;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send('missing required field title');
      } else {
        const record = new Book({
          title,
          author,
          genre,
          year,
          comment,
        });

        record.save().then(result => {
          res.json({
            _id: result._id,
            title,
            author,
            genre,
            year,
            comment,
          });
        });
      }
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      Book.remove(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send('complete delete successful');
        }
      });
    });

  app
    .route('/api/books/:id')
    .get(function (req, res) {
      let bookId = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findOne({ _id: bookId }, function (err, data) {
        if (!data) {
          res.send('no book exists');
        } else {
          res.json(data);
        }
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let { title, author, genre, year, comment } = req.body;
      //json res format same as .get
      if (!title) {
        res.send('missing required field title');
      } else {
        Book.findOne({ _id: bookid }, function (err, data) {
          if (!data) {
            res.send('no book exists');
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
                },
              },
              { new: true },
              function (err, data) {
                if (err) {
                  res.send(err);
                } else {
                  res.json(data);
                }
              }
            );
          }
        });
      }
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findOne({ _id: bookid }, function (err, data) {
        if (!data) {
          res.send('no book exists');
        } else {
          Book.findByIdAndRemove(bookid, function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.send('delete successful');
            }
          });
        }
      });
    });
};
