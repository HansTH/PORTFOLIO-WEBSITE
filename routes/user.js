const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

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
  // check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find({ user: req.body.user }).then(user => {
    if (user.length > 0) {
      errors.user = 'User already register.';
      return res.status(400).json(errors);
    } else {
      // create a avatar image
      const avatar = gravatar.url(req.body.avatar, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default icon
      });

      const newUser = new User({
        username: req.body.username,
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

// @route   GET /api/user/login
// @desc    Login user, return a JWT token
// @access  Public
router.post('/login', (req, res) => {
  // check validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // check user excist
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        };

        // sign token
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET /api/user/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

module.exports = router;
