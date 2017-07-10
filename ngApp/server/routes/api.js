const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/index');
const Video = require('../models/video');
const Match = require('../models/match');
const Scorecard = require('../models/scorecard');

const db = "mongodb://devuser:dev1234@ds053788.mlab.com:53788/mean-devr04";
//const db = "mongodb://uservishwas:dbpwvishwas1@ds147920.mlab.com:47920/scorecardplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/videos', function(req, res){
  console.log('Get request for all videos');
  Video.find({})
    .exec(function(err, videos){
      if (err){
        console.log("Error retrieving videos");
      }else {
        res.json(videos);
      }
    });
});

router.get('/videos/:id', function(req, res){
  console.log('Get request for a single video');
  Video.findById(req.params.id)
    .exec(function(err, video){
      if (err){
        console.log("Error retrieving video");
      }else {
        res.json(video);
      }
    });
});

router.post('/video', function(req, res){
  console.log('Post a video');
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err, insertedVideo){
    if (err){
      console.log('Error saving video');
    }else{
      res.json(insertedVideo);
    }
  });
});


router.put('/video/:id', function(req, res){
  console.log('Update a video');
  Video.findByIdAndUpdate(req.params.id,
    {
      $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
      new: true
    },
    function(err, updatedVideo){
      if(err){
        res.send("Error updating video");
      }else{
        res.json(updatedVideo);
      }
    }

  );
});


router.delete('/video/:id', function(req, res){
  console.log('Deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
    if(err){
      res.send("Error deleting video");
    }else{
      res.json(deletedVideo);
    }
  });
});

router.get('/matches', function(req, res){
  console.log('Get request for all matches');
  Match.find({})
    .exec(function(err, matches){
      if (err){
        console.log("Error retrieving matches");
      }else {
        res.json(matches);
      }
    });
});

router.get('/matches/:id', function(req, res){
  console.log('Get request for a single match');
  Match.findById(req.params.id)
    .exec(function(err, match){
      if (err){
        console.log("Error retrieving match");
      }else {
        res.json(match);
      }
    });
});

router.post('/match', function(req, res){
  console.log('Post a match');
  var newMatch = new Match();
  // newMatch.title = req.body.title;
  // newMatch.url = req.body.url;
  newMatch.name = req.body.name;
  newMatch.save(function(err, insertedMatch){
    if (err){
      console.log('Error saving match');
    }else{
      res.json(insertedMatch);
    }
  });
});


router.put('/match/:id', function(req, res){
  console.log('Update a match');
  Match.findByIdAndUpdate(req.params.id,
    {
      $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
      new: true
    },
    function(err, updatedMatch){
      if(err){
        res.send("Error updating match");
      }else{
        res.json(updatedMatch);
      }
    }

  );
});


router.delete('/match/:id', function(req, res){
  console.log('Deleting a match');
  Match.findByIdAndRemove(req.params.id, function(err, deletedMatch){
    if(err){
      res.send("Error deleting match");
    }else{
      res.json(deletedMatch);
    }
  });
});

router.get('/scorecards', function(req, res){
  console.log('Get request for all scorecards');
  Scorecard.find({})
    .exec(function(err, scorecards){
      if (err){
        console.log("Error retrieving scorecards");
      }else {
        res.json(scorecards);
      }
    });
});

router.get('/scorecards/:id', function(req, res){
  console.log('Get request for a single scorecard');
  Scorecard.findById(req.params.id)
    .exec(function(err, scorecard){
      if (err){
        console.log("Error retrieving scorecard");
      }else {
        res.json(scorecard);
      }
    });
});

router.post('/scorecard', function(req, res){
  console.log('Post a scorecard');
  var newScorecard = new Scorecard();
  newScorecard.name = req.body.name;
  newScorecard.save(function(err, insertedScorecard){
    if (err){
      console.log('Error saving scorecard');
    }else{
      res.json(insertedScorecard);
    }
  });
});


router.put('/scorecard/:id', function(req, res){
  console.log('Update a scorecard');
  Scorecard.findByIdAndUpdate(req.params.id,
    {
      $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
      new: true
    },
    function(err, updatedScorecard){
      if(err){
        res.send("Error updating scorecard");
      }else{
        res.json(updatedScorecard);
      }
    }

  );
});


router.delete('/scorecard/:id', function(req, res){
  console.log('Deleting a scorecard');
  Scorecard.findByIdAndRemove(req.params.id, function(err, deletedScorecard){
    if(err){
      res.send("Error deleting scorecard");
    }else{
      res.json(deletedScorecard);
    }
  });
});


router.get('/scorecards', function(req, res){
  console.log('Get request for all scorecards');
  Scorecard.find({})
    .exec(function(err, scorecards){
      if (err){
        console.log("Error retrieving scorecards");
      }else {
        res.json(scorecards);
      }
    });
});

router.get('/scorecards/:id', function(req, res){
  console.log('Get request for a single scorecard');
  Scorecard.findById(req.params.id)
    .exec(function(err, scorecard){
      if (err){
        console.log("Error retrieving scorecard");
      }else {
        res.json(scorecard);
      }
    });
});

router.post('/scorecard', function(req, res){
  console.log('Post a scorecard');
  var newScorecard = new Scorecard();
  newScorecard.title = req.body.title;
  newScorecard.url = req.body.url;
  newScorecard.description = req.body.description;
  newScorecard.save(function(err, insertedScorecard){
    if (err){
      console.log('Error saving scorecard');
    }else{
      res.json(insertedScorecard);
    }
  });
});


router.put('/scorecard/:id', function(req, res){
  console.log('Update a scorecard');
  Scorecard.findByIdAndUpdate(req.params.id,
    {
      $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
      new: true
    },
    function(err, updatedScorecard){
      if(err){
        res.send("Error updating scorecard");
      }else{
        res.json(updatedScorecard);
      }
    }

  );
});


router.delete('/scorecard/:id', function(req, res){
  console.log('Deleting a scorecard');
  Scorecard.findByIdAndRemove(req.params.id, function(err, deletedScorecard){
    if(err){
      res.send("Error deleting scorecard");
    }else{
      res.json(deletedScorecard);
    }
  });
});
module.exports = router;
