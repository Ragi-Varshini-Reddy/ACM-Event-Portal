const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
  },
    roll_no: {
    type: String,
    required: true
  },
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