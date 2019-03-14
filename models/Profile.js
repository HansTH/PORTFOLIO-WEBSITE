const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Profile model
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  fullname: {
    type: String,
    required: true
  },
  jobtitle: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  skill: [
    {
      title: {
        type: String,
        required: true
      },
      skills: {
        type: [String],
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    }
  ],
  portfolio: [
    {
      appTitle: {
        type: String,
        required: true
      },
      appInfo: {
        type: String,
        required: true
      },
      appCategory: {
        type: String,
        required: true
      },
      appScreenshot: {
        type: String,
        required: true
      },
      appSkills: {
        type: [String],
        required: true
      }
    }
  ],
  contactTitle: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },

  experience: [
    {
      companyName: {
        type: String,
        required: true
      },
      companyCity: {
        type: String,
        require: true
      },
      companyStart: {
        type: Date,
        required: true
      },
      companyEnd: {
        type: Date
      },
      companyCurrent: {
        type: Boolean,
        default: false
      },
      companyJobTitle: {
        type: String,
        required: true
      },
      companyJobInfo: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
