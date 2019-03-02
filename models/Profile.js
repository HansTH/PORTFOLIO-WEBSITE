const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Profile model
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  bio: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  github: {
    type: String
  },
  mobiel: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
