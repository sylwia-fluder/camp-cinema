const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const users = require('./routes/users');
const screenings = require('./routes/screenings');
const tickets = require('./routes/tickets');
const auth = require('./auth/auth');
const app = express();


mongoose.connect('mongodb://localhost/campCinema')
  .then(() => console.log('Connect to DB'))
  .catch(err => console.error(err));


app.use(express.json());
app.use('/api/movies',movies);
app.use('/api/users',users);
app.use('/api/screenings',screenings);
app.use('/api/tickets',tickets);
app.use('/api/auth',auth);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});