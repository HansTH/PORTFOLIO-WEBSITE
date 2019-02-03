const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../models/User');

// @route   GET /api/user/test
// @desc    Test user route
// @access  Public
router.get('/test', (req, res) => {
  res.json({
    message: 'User works'
  });
});

// @route   POST /api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist' });
    } else {
      // create a avatar image
      const avatar = gravatar.url(req.body.avatar, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default icon
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      });

      // create a crypted password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
