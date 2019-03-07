const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load model
const Profile = require('../models/Profile');
const User = require('../models/User');

// load validation
const validateProfileInput = require('../validation/profile');
const validateSkillInput = require('../validation/skill');
const validatePortfolioInput = require('../validation/portfolio');

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
        .populate('user', ['name', 'avatar', 'email'])
        .then(profile => {
          if (Object.keys(profile).length === 0) {
            res.json({ profile: user.map(name => name.name) });
          }
          res.json(profile);
        });
    })
    .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.fullname) profileFields.fullname = req.body.fullname;
    if (req.body.jobtitle) profileFields.jobtitle = req.body.jobtitle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.contactTitle)
      profileFields.contactTitle = req.body.contactTitle;
    if (req.body.contactEmail)
      profileFields.contactEmail = req.body.contactEmail;
    if (req.body.contactNumber)
      profileFields.contactNumber = req.body.contactNumber;

    // skills, split into an array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update user
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists.';
            res.status(404).json(errors);
          }

          // create new user
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// DELETE PROFILE
// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

// SKILL
//
// @route   POST api/profile/skill
// @desc    Add skill to profile
// @access  Private
router.post(
  '/skill',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validation
    const { errors, isValid } = validateSkillInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let skillArray = [];
    // skills, split into an array
    if (typeof req.body.skills !== 'undefined') {
      skillArray = req.body.skills.split(',');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newSkill = {
        title: req.body.title,
        skills: skillArray,
        icon: req.body.icon
      };

      // add to experience profile
      profile.skill.unshift(newSkill);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// DELETE SKILL
// @route   DELETE api/profile/skill/:exp_id
// @desc    Delete skile from profile
// @access  Private
router.delete(
  '/skill/:skill_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const deleteIndex = profile.skill
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // splice out of skill array
        profile.skill.splice(deleteIndex, 1);
        // save new skill array
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// PORTFOLIO
//
// @route   POST api/profile/portfolio
// @desc    Add portfoilio to profile
// @access  Private
router.post(
  '/portfolio',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validation
    const { errors, isValid } = validatePortfolioInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let skillArray = [];
    // skills, split into an array
    if (typeof req.body.appSkills !== 'undefined') {
      skillArray = req.body.appSkills.split(',');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newPortfolio = {
        appTitle: req.body.appTitle,
        appSkills: skillArray,
        appInfo: req.body.appInfo,
        appScreenshot: req.body.appScreenshot,
        appYear: req.body.appYear
      };

      // add to experience profile
      profile.portfolio.unshift(newPortfolio);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/portfolio/:exp_id
// @desc    Delete porfolio from profile
// @access  Private
router.delete(
  '/portfolio/:portfolio_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const deleteIndex = profile.portfolio
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // splice out of portfolio array
        profile.portfolio.splice(deleteIndex, 1);
        // save new portfolio array
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
