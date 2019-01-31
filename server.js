const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./config/keys_dev').mongoUri;

// routes
const user = require('./routes/user');

const app = express();
const port = process.env.PORT || 5000;

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
