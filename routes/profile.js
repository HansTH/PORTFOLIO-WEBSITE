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
const validateExperienceInput = require('../validation/experience');

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
// ADD OR UPDATE SKILL
// @route   POST api/profile/skill/
// @desc    Add or Update skill
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

    // get fields
    const skillFields = {};
    if (req.body.title) skillFields.title = req.body.title;
    if (req.body.icon) skillFields.icon = req.body.icon;

    // skills, split into an array
    if (typeof req.body.skills !== 'undefined') {
      skillFields.skills = req.body.skills.split(',');
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // get index of the skill in the array
          const skillIndex = profile.skill
            .map(item => item.id)
            .indexOf(req.body.id);

          // check if index exists
          if (skillIndex != -1) {
            profile.skill.splice(skillIndex, 1, skillFields);
          } else {
            profile.skill.unshift(skillFields);
          }
          // save the new profile
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE SKILL
// @route   DELETE api/profile/skill/:skill_id
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
          .indexOf(req.params.skill_id);
        console.log(deleteIndex);
        // splice out of skill array
        profile.skill.splice(deleteIndex, 1);
        // save new skill array
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET SKILL
// @route   GET api/profile/skill/:skill_id
// @desc    Get skile by ID
// @access  Private
router.get(
  '/skill/:skill_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const skillIndex = profile.skill
          .map(item => item.id)
          .indexOf(req.params.skill_id);

        // splice out of skill array
        const skill = profile.skill[skillIndex];
        // return the skill item
        res.json(skill);
      })
      .catch(err => res.status(404).json(err));
  }
);

// PORTFOLIO
//
// GET PORTFOLIO
// @route   GET api/profile/portfolio/:portfolio_id
// @desc    Get portfolio by ID
// @access  Private
router.get(
  '/portfolio/:portfolio_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const portfolioIndex = profile.portfolio
          .map(item => item.id)
          .indexOf(req.params.portfolio_id);

        // splice out of portfolio array
        const portfolio = profile.portfolio[portfolioIndex];
        // return the portfolio item
        res.json(portfolio);
      })
      .catch(err => res.status(404).json(err));
  }
);

// ADD OR UPDATE PORTFOLIO
// @route   POST api/profile/portfolio/
// @desc    Add or Update portfilio
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

    // get fields
    const portfolioFields = {};
    if (req.body.appTitle) portfolioFields.appTitle = req.body.appTitle;
    if (req.body.appInfo) portfolioFields.appInfo = req.body.appInfo;
    if (req.body.appCategory)
      portfolioFields.appCategory = req.body.appCategory;
    if (req.body.appScreenshot)
      portfolioFields.appScreenshot = req.body.appScreenshot;

    // appSkills, split into an array
    if (typeof req.body.appSkills !== 'undefined') {
      portfolioFields.appSkills = req.body.appSkills.split(',');
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // get index of the portfolio in the array
          const portfolioIndex = profile.portfolio
            .map(item => item.id)
            .indexOf(req.body.id);

          // check if index exists
          if (portfolioIndex != -1) {
            profile.portfolio.splice(portfolioIndex, 1, portfolioFields);
          } else {
            profile.portfolio.unshift(portfolioFields);
          }
          // save the new profile
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/portfolio/:portfolio_id
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
          .indexOf(req.params.portfolio_id);

        // splice out of portfolio array
        profile.portfolio.splice(deleteIndex, 1);
        // save new portfolio array
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// EXPERIENCE
//
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const expFields = {};
    if (req.body.companyName) expFields.companyName = req.body.companyName;
    if (req.body.companyCity) expFields.companyCity = req.body.companyCity;
    if (req.body.companyStart) expFields.companyStart = req.body.companyStart;
    if (req.body.companyEnd) expFields.companyEnd = req.body.companyEnd;
    if (req.body.companyCurrent)
      expFields.companyCurrent = req.body.companyCurrent;
    if (req.body.companyJobTitle)
      expFields.companyJobTitle = req.body.companyJobTitle;
    if (req.body.companyJobInfo)
      expFields.companyJobInfo = req.body.companyJobInfo;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          const expIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.body.id);

          if (expIndex != -1) {
            profile.experience.splice(expIndex, 1, expFields);
          } else {
            profile.experience.unshift(expFields);
          }
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience by id
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const deleteIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(deleteIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/experience/:exp_id
// @desc    Get experience by ID
// @access  Private
router.get(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const experienceIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // splice out of experience array
        const experience = profile.experience[experienceIndex];
        // return the experience item
        res.json(experience);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
