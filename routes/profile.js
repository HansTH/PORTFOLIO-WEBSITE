const express = require('express');
const router = express.Router();

// Load model
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile/
// @desc    Get profile
// @access  Public
router.get('/', (req, res) => {
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

module.exports = router;
