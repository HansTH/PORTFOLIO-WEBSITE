const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys').mongoUri;
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
