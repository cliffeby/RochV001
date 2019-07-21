/**
 * Created by cliff on 8/19/2017.
 */

const Scorecard = require('../models/scorecard');
//Scorecard Routes
exports.getScorecards = function(req, res){
  console.log('Get request for all scorecards');
  Scorecard.find({})
    .exec(function(err, scorecards){
      if (err){
        console.log("Error retrieving scorecards");
      }else {
        res.json(scorecards);
      }
    });
};

exports.getScorecard = function(req, res){
  console.log('Get request for a single scorecard');
  Scorecard.findById(req.params.id)
    .exec(function(err, scorecard){
      if (err){
        console.log("Error retrieving scorecard");
      }else {
        res.json(scorecard);
      }
    });
};

exports.postScorecard =  function(req, res){
  console.log('Post a scorecard');
  var newScorecard = new Scorecard();
  newScorecard.name = req.body.name;
  newScorecard.rating = req.body.rating;
  newScorecard.slope = req.body.slope;
  newScorecard.parInputString = req.body.parInputString;
  // newScorecard.pars = req.body.pars;
  newScorecard.hCapInputString = req.body.hCapInputString;
  newScorecard.hCap = req.body.hCap;
  newScorecard.yardsInputString = req.body.yardsInputString;
  newScorecard.yards = req.body.yards;
  newScorecard.created = req.body.created;
  newScorecard.user = req.body.user;
  newScorecard.save(function(err, insertedScorecard){
    if (err){
      console.log('Error saving scorecard');
    }else{
      res.json(insertedScorecard);
    }
  });
};

exports.putScorecard =  function(req, res){
  console.log('Update a scorecard', req.user);
  Scorecard.findByIdAndUpdate(req.params.id,
    {
      $set: {
        name: req.body.name,
        rating: req.body.rating,
        slope: req.body.slope,
        parInputString: req.body.parInputString,
        // pars: req.body.pars,
        hCapInputString: req.body.hCapInputString,
        hCap: req.body.hCap,
        yardsInputString: req.body.yardsInputString,
        yards: req.body.yards,
        created: req.body.created,
        user: req.body.user}
    },
    {
      new: true
    },
    function(err, updatedScorecard){
      console.log('SCORECARD CONTROLer', updatedScorecard);
      if(err){
        res.send("Error updating scorecard");
      }else{
        res.json(updatedScorecard);
      }
    }

  );
};

exports.deleteScorecard = function(req, res){
  console.log('Deleting a scorecard');
  Scorecard.findByIdAndRemove(req.params.id, function(err, deletedScorecard){
    if(err){
      res.send("Error deleting scorecard");
    }else{
      res.json(deletedScorecard);
    }
  });
};
