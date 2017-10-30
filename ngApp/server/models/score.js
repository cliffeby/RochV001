const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  name: String,
  cap: String,
  wonTwoBall: Boolean,
  wonOneBall: Boolean,
  wonIndo: Boolean,
  matchId: {
    type: Schema.ObjectId,
    ref: 'Match'
  },
  memberId: {
    type: Schema.ObjectId,
    ref: 'Member'
  },
  datePlayed: Date,
  partnerId: {
    type: Schema.ObjectId,
    ref: 'Member'
  },
  foursomeIds: [{
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
//TODO Add modified date to Score
// ScoreSchema.pre('save', function(next){
//   now = new Date();
//   modified = now;
// })

module.exports = mongoose.model('Score', ScoreSchema);

