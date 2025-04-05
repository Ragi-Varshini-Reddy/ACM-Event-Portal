const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  branch: {
    type: String,
    default: null,
    required: true
  },
  section: {
    type: String,
    default: null,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: null,
    required: true
  },
  phone_number: {
    type: String,
    default: null,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);