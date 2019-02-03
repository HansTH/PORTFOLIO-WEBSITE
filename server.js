const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys_dev').mongoUri;
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const user = require('./routes/user');

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello server');
});

// Use routes
app.use('/api/user', user);

app.listen(port, () => console.log(`Server running on port: ${port}`));
