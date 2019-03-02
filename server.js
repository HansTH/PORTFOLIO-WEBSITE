const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys').mongoUri;
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

// routes
const user = require('./routes/user');
const profile = require('./routes/profile');

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/user', user);
app.use('/api/profile', profile);

app.listen(port, () => console.log(`Server running on port: ${port}`));
