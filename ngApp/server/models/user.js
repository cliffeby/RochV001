const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    default: '',
    required: 'Please fill Member first name',
    trim: true
  },
  password: {
    type: String,
    default: '',
    required: 'Please fill user password',
    trim: true
  },
  email: {
    type: String,
    default: ""
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

