//Match Routes

const Match = require('../models/match');

exports.getMatches = function(req, res){
  console.log('Get request for all matches');
  Match.find({})
    .sort({datePlayed: 'desc'})
    .exec(function(err, matches){
      if (err){
        console.log("Error retrieving matches");
      }else {
        res.json(matches);
      }
    });
};

exports.getMatch = function(req, res){
  console.log('Get request for a single match');
  Match.findById(req.params.id)
    .exec(function(err, match){
      if (err){
        console.log("Error retrieving match");
      }else {
        res.json(match);
      }
    });
};

exports.postMatch= function(req, res){
  console.log('Post a match');
  var newMatch = new Match();
  newMatch.name = req.body.name;
  newMatch.memberId = req.body.memberId;
  newMatch.scorecardId = req.body.scorecardId;
  newMatch.lineUpId = req.body.lineUpId;
  newMatch.datePlayed = req.body.datePlayed;
  newMatch.user = req.body.user;

  newMatch.save(function(err, insertedMatch){
    if (err){
      console.log('Error saving match');
    }else{
      res.json(insertedMatch);
    }
  });
};

exports.putMatch = function(req, res){
  console.log('Update a match', req.body.datePlayed);
  Match.findByIdAndUpdate(req.params.id,
    {
      $set: { name: req.body.name,
        scorecardId: req.body.scorecardId,
        memberId: req.body.memberId,
        lineUpId: req.body.lineUpId,
        datePlayed: req.body.datePlayed,
        created: req.body.created,
        user: req.body.user
      }
    },
    {
      new: true
    },
    function(err, updatedMatch){
      if(err){
        console.log("Error update match", err,updatedMatch);
        res.send("Error updating match");
      }else{
        res.json(updatedMatch);
      }
    }
  );
};

exports.deleteMatch = function(req, res){
  console.log('Deleting a match');
  Match.findByIdAndRemove(req.params.id, function(err, deletedMatch){
    if(err){
      res.send("Error deleting match");
    }else{
      res.json(deletedMatch);
    }
  });
};
