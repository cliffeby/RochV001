const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: 'Please fill Member first name',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Member last name',
    trim: true
  }
  ,
  currentHCap: Number,
  matchIds: [{
    type: Schema.ObjectId,
    ref: 'Match'
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

module.exports = mongoose.model('Member', MemberSchema);

