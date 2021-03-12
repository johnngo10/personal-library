'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

const apiRoutes = require('./routes/api.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect database
connectDB();

//Routing for API
apiRoutes(app);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Start our server and tests!
app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port ' + process.env.PORT);
});
