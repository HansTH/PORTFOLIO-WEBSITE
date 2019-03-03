const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load model
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile/user
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.profile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get profile
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'There is no profile' }));
});

router.get('/user', (req, res) => {
  User.find()
    .then(user => {
      if (Object.keys(user).length === 0) {
        res.json({ profile: false });
      }

      Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profile => {
          if (Object.keys(profile).length === 0) {
            res.json({ profile: user.map(name => name.name) });
          }
          res.json(profile);
        });
    })
    .catch(err => res.status(404).json({ user: 'No user found' }));
});

module.exports = router;
