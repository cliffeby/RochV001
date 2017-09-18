/**
 * Created by cliff on 8/19/2017.
 */
const Score = require('../models/score');

exports.getScores = function(req, res){
  console.log('Get request for all scores', req.user);
  Score.find({})
    .exec(function(err, scores){
      if (err){
        console.log("Error retrieving scores");
      }else {
        res.json(scores);
      }
    });
};

exports.getScore = function(req, res){
  console.log('Get request for a single score', req);
  Score.findById(req.params.id)
    .exec(function(err, score){
      if (err){
        console.log("Error retrieving score");
      }else {
        res.json(score);
      }
    });
};

exports.getMatchScores = function(req, res){
  console.log('Get request for match scores');
  Score.find({'matchId': req.params.id})
    .exec(function(err, score){
      if (err){
        console.log("Error retrieving match score");
      }else {
        res.json(score);
      }
    });
};

exports.getMatchPlayer = function(req, res){
  console.log('Get request for player-match score', req.params.matchId, req.params.memberId);
  Score.find({'matchId': req.params.matchId,'memberId': req.params.memberId})
    .exec(function(err, score){
      if (err){
        console.log("Error retrieving match score");
      }else {
        res.json(score);
        console.log('Response',score);
      }
    });
};

exports.postScore = function(req, res){
  var newScore = new Score();
  newScore.name = req.body.name;
  newScore.cap = req.body.cap;
  newScore.wonTwoBall = req.body.wonTwoBall;
  newScore.wonOneBall = req.body.wonOneBall;
  newScore.wonIndo = req.body.wonIndo;
  newScore.foursomeIds = req.body.foursomeIds;
  newScore.matchId  = req.body.matchId;
  newScore.memberId  = req.body.memberId;
  newScore.user = req.body.user;
  newScore.save(function(err, insertedScore){
    if (err){
      console.log('Error saving score');
    }else{
      res.json(insertedScore);
      console.log('InsertedScorePass');
    }
  });
};

exports.putScore = function(req, res){
  console.log('Update a score', req.user);
  Score.findByIdAndUpdate(req.params.id,
    {
      $set: {
        name: req.body.name,
        cap: req.body.cap,
        wonTwoBall: req.body.wonTwoBall,
        wonOneBall: req.body.wonOneBall,
        wonIndo: req.body.wonIndo,
        foursomeIds: req.body.foursomeIds,
        matchId: req.body.matchId,
        memberId: req.body.memberId,
        user: req.body.user
      }
    },
    {
      new: true
    },
    function(err, updatedScore){
      if(err){
        res.send("Error updating score");
      }else{
        res.json(updatedScore);
      }
    }

  );
};

exports.deleteScore = function(req, res){
  console.log('Deleting a score');
  Score.findByIdAndRemove(req.params.id, function(err, deletedScore){
    if(err){
      res.send("Error deleting score");
    }else{
      res.json(deletedScore);
    }
  });
};
