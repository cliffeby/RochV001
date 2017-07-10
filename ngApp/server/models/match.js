const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Match name',
    trim: true
  },
  scorecardId: {
    type: Schema.ObjectId,
    ref: 'Scorecard'
  },
  datePlayed: Date,
  memberIds: [{
    type: Schema.ObjectId,
    ref: 'Member'
  }],
  lineUpIds: [{
    type: Schema.ObjectId,
    ref: 'Member'
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

module.exports = mongoose.model('Match', MatchSchema);

