const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Database connection
mongoose.connect(config.database);

mongoose.Promise = global.Promise;

// Testing database connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// Check for database error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});


// intializing express
const app = express();

const port = 3000;

// Give access to all domains
app.use(cors());

// Set Static file
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middlware
app.use(bodyParser.json());

const usersRoute = require('./routes/users');

// Route to users
app.use('/users', usersRoute);

// Passport Middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// The Home page
app.get('/', (req, res) => {
  res.send('Invalid Point')
});

// All other route should go to the production index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Listening to the Server
app.listen(port, () => {
  console.log('Server started at port ' + port);
})
