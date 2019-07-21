const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScorecardSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Scorecard name',
    trim: true
  },
  rating: {
    type: Number
  },
  slope: {
    type: Number
  },
  parInputString: String,
  // pars: [{
  //   type: String
  // }],
  hCapInputString: String,
  hCaps: [{
    type: String
  }],
  yardsInputString: String,
  yards: [{
    type: String
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Scorecard', ScorecardSchema);

