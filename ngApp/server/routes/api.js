// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const models = require('../models/index');
// const Video = require('../models/video');
// const Match = require('../models/match');
// const Scorecard = require('../models/scorecard');
// //const Member = require('../models/member');
// const Score = require('../models/score');
// const User = require('../models/user');
// const app = express();
// // const config = require('../_config');
// //
// // // *** mongoose *** ///
// // mongoose.Promise = global.Promise;
// // mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
// //   if(err) {
// //     console.log('Error connecting to the database. ' + err);
// //   } else {
// //     console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
// //   }
// // });
// //const db = "mongodb://devuser:dev1234@ds053788.mlab.com:53788/mean-devr04";
// // const db = "mongodb://localhost/mean-devR04:27017";
// // const db = "mongodb://127.0.0.1/mean-devR04";
// // mongoose.Promise = global.Promise;
// // mongoose.connect(db, function(err){
// //     if(err){
// //         console.error("Error! " + err);
// //     }
// // });
//
// router.get('/videos', function(req, res){
//   console.log('Get request for all videos');
//   Video.find({})
//     .exec(function(err, videos){
//       if (err){
//         console.log("Error retrieving videos");
//       }else {
//         res.json(videos);
//       }
//     });
// });
//
// router.get('/videos/:id', function(req, res){
//   console.log('Get request for a single video');
//   Video.findById(req.params.id)
//     .exec(function(err, video){
//       if (err){
//         console.log("Error retrieving video");
//       }else {
//         res.json(video);
//       }
//     });
// });
//
// router.post('/video', function(req, res){
//   console.log('Post a video');
//   var newVideo = new Video();
//   newVideo.title = req.body.title;
//   newVideo.url = req.body.url;
//   newVideo.description = req.body.description;
//   newVideo.save(function(err, insertedVideo){
//     if (err){
//       console.log('Error saving video');
//     }else{
//       res.json(insertedVideo);
//     }
//   });
// });
//
//
// router.put('/video/:id', function(req, res){
//   console.log('Update a video');
//   Video.findByIdAndUpdate(req.params.id,
//     {
//       $set: {title: req.body.title, url: req.body.url, description: req.body.description}
//     },
//     {
//       new: true
//     },
//     function(err, updatedVideo){
//       if(err){
//         res.send("Error updating video");
//       }else{
//         res.json(updatedVideo);
//       }
//     }
//
//   );
// });
//
//
// router.delete('/video/:id', function(req, res){
//   console.log('Deleting a vid');
//   user.findByIdAndRemove(req.params.id, function(err, deletevid){
//     if(err){
//       res.send("Error deleting vid");
//     }else{
//       res.json(deletedvid);
//     }
//   });
// });
//
// router.get('/users', function(req, res){
//   console.log('Get request for all users');
//   User.find({})
//     .exec(function(err, users){
//       if (err){
//         console.log("Error retrieving users");
//       }else {
//         res.json(users);
//       }
//     });
// });
//
// router.get('/users/:id', function(req, res){
//   console.log('Get request for a single user');
//   User.findById(req.params.id)
//     .exec(function(err, user){
//       if (err){
//         console.log("Error retrieving user");
//       }else {
//         res.json(user);
//       }
//     });
// });
//
// router.post('/user', function(req, res){
//   console.log('Post a user');
//   var newuser = new User();
//   newuser.username = req.body.username;
//   newuser.password = req.body.password;
//   newuser.email = req.body.email;
//   newuser.created = req.body.created;
//   newuser.save(function(err, inserteduser){
//     if (err){
//       console.log('Error saving user');
//     }else{
//       res.json(inserteduser);
//     }
//   });
// });
//
//
// router.put('/user/:id', function(req, res){
//   console.log('Update a user');
//   User.findByIdAndUpdate(req.params.id,
//     {
//       $set: {title: req.body.title, url: req.body.url, description: req.body.description}
//     },
//     {
//       new: true
//     },
//     function(err, updateduser){
//       if(err){
//         res.send("Error updating user");
//       }else{
//         res.json(updateduser);
//       }
//     }
//
//   );
// });
//
//
// router.delete('/user/:id', function(req, res){
//   console.log('Deleting a user');
//   User.findByIdAndRemove(req.params.id, function(err, deleteduser){
//     if(err){
//       res.send("Error deleting user");
//     }else{
//       res.json(deleteduser);
//     }
//   });
// });
// //Match Routes
// router.get('/matches', function(req, res){
//   console.log('Get request for all matches');
//   Match.find({})
//     .sort({datePlayed: 'desc'})
//     .exec(function(err, matches){
//       if (err){
//         console.log("Error retrieving matches");
//       }else {
//         res.json(matches);
//       }
//     });
// });
//
// router.get('/matches/:id', function(req, res){
//   console.log('Get request for a single match');
//   Match.findById(req.params.id)
//     .exec(function(err, match){
//       if (err){
//         console.log("Error retrieving match");
//       }else {
//         res.json(match);
//       }
//     });
// });
//
// router.post('/match', function(req, res){
//   console.log('Post a match');
//   var newMatch = new Match();
//   newMatch.name = req.body.name;
//   newMatch.memberId = req.body.memberId;
//   newMatch.scorecardId = req.body.scorecardId;
//   newMatch.lineUpId = req.body.lineUpId;
//   newMatch.datePlayed = req.body.datePlayed;
//   newMatch.user = req.body.user;
//
//   newMatch.save(function(err, insertedMatch){
//     if (err){
//       console.log('Error saving match');
//     }else{
//       res.json(insertedMatch);
//     }
//   });
// });
//
// router.put('/match/:id', function(req, res){
//   console.log('Update a match', req.body.datePlayed);
//   Match.findByIdAndUpdate(req.params.id,
//     {
//       $set: { name: req.body.name,
//               scorecardId: req.body.scorecardId,
//               memberId: req.body.memberId,
//               lineUpId: req.body.lineUpId,
//               datePlayed: req.body.datePlayed,
//               created: req.body.created,
//               user: req.body.user
//       }
//     },
//     {
//       new: true
//     },
//     function(err, updatedMatch){
//       if(err){
//         res.send("Error updating match");
//       }else{
//         res.json(updatedMatch);
//       }
//     }
//   );
// });
//
// router.delete('/match/:id', function(req, res){
//   console.log('Deleting a match');
//   Match.findByIdAndRemove(req.params.id, function(err, deletedMatch){
//     if(err){
//       res.send("Error deleting match");
//     }else{
//       res.json(deletedMatch);
//     }
//   });
// });
// //Scorecard Routes
// router.get('/scorecards', function(req, res){
//   console.log('Get request for all scorecards');
//   Scorecard.find({})
//     .exec(function(err, scorecards){
//       if (err){
//         console.log("Error retrieving scorecards");
//       }else {
//         res.json(scorecards);
//       }
//     });
// });
//
// router.get('/scorecards/:id', function(req, res){
//   console.log('Get request for a single scorecard');
//   Scorecard.findById(req.params.id)
//     .exec(function(err, scorecard){
//       if (err){
//         console.log("Error retrieving scorecard");
//       }else {
//         res.json(scorecard);
//       }
//     });
// });
//
// router.post('/scorecard', function(req, res){
//   console.log('Post a scorecard');
//   var newScorecard = new Scorecard();
//   newScorecard.name = req.body.name;
//   newScorecard.rating = req.body.rating;
//   newScorecard.slope = req.body.slope;
//   newScorecard.parInputString = req.body.parInputString;
//   newScorecard.par = req.body.par;
//   newScorecard.hCapInputString = req.body.hCapInputString;
//   newScorecard.hCap = req.body.hCap;
//   newScorecard.yardsInputString = req.body.yardsInputString;
//   newScorecard.yards = req.body.yards;
//   newScorecard.created = req.body.created;
//   newScorecard.user = req.body.user;
//   newScorecard.save(function(err, insertedScorecard){
//     if (err){
//       console.log('Error saving scorecard');
//     }else{
//       res.json(insertedScorecard);
//     }
//   });
// });
//
// router.put('/scorecard/:id', function(req, res){
//   console.log('Update a scorecard');
//   Scorecard.findByIdAndUpdate(req.params.id,
//     {
//       $set: {
//         name: req.body.name,
//         rating: req.body.rating,
//         slope: req.body.slope,
//         parInputString: req.body.parInputString,
//         par: req.body.par,
//         hCapInputString: req.body.hCapInputString,
//         hCap: req.body.hCap,
//         yardsInputString: req.body.yardsInputString,
//         yards: req.body.yards,
//         created: req.body.created,
//         user: req.body.user}
//     },
//     {
//       new: true
//     },
//     function(err, updatedScorecard){
//       if(err){
//         res.send("Error updating scorecard");
//       }else{
//         res.json(updatedScorecard);
//       }
//     }
//
//   );
// });
//
// router.delete('/scorecard/:id', function(req, res){
//   console.log('Deleting a scorecard');
//   Scorecard.findByIdAndRemove(req.params.id, function(err, deletedScorecard){
//     if(err){
//       res.send("Error deleting scorecard");
//     }else{
//       res.json(deletedScorecard);
//     }
//   });
// });
// // // Members
// // router.get('/members', function(req, res){
// //   console.log('Get request for all members');
// //   Member.find({})
// //     .sort('lastName')
// //     .exec(function(err, members){
// //       if (err){
// //         console.log("Error retrieving members");
// //       }else {
// //         res.json(members);
// //       }
// //     });
// // });
// //
// // router.get('/members/:id', function(req, res){
// //   console.log('Get request for a single member');
// //   Member.findById(req.params.id)
// //     .exec(function(err, member){
// //       if (err){
// //         console.log("Error retrieving member");
// //       }else {
// //         res.json(member);
// //       }
// //     });
// // });
// //
// // router.post('/member', function(req, res){
// //   console.log('Post a member');
// //   var newMember = new Member();
// //   newMember.firstName = req.body.firstName;
// //   newMember.lastName = req.body.lastName;
// //   newMember.currentHCap  = req.body.currentHCap;
// //   newMember.user = req.body.user;
// //   newMember.save(function(err, insertedMember){
// //     if (err){
// //       console.log('Error saving member');
// //     }else{
// //       res.json(insertedMember);
// //     }
// //   });
// // });
// //
// // router.put('/member/:id', function(req, res){
// //   console.log('Update a member');
// //   Member.findByIdAndUpdate(req.params.id,
// //     {
// //       $set: {
// //         firstName: req.body.firstName,
// //         lastName: req.body.lastName,
// //         currentHCap: req.body.currentHCap,
// //         user: req.body.user}
// //     },
// //     {
// //       new: true
// //     },
// //     function(err, updatedMember){
// //       if(err){
// //         res.send("Error updating member");
// //       }else{
// //         res.json(updatedMember);
// //       }
// //     }
// //   );
// // });
// //
// // router.delete('/member/:id', function(req, res){
// //   console.log('Deleting a member');
// //   Member.findByIdAndRemove(req.params.id, function(err, deletedMember){
// //     if(err){
// //       res.send("Error deleting member");
// //     }else{
// //       res.json(deletedMember);
// //     }
// //   });
// // });
//
// router.get('/scores', function(req, res){
//   console.log('Get request for all scores');
//   Score.find({})
//     .exec(function(err, scores){
//       if (err){
//         console.log("Error retrieving scores");
//       }else {
//         res.json(scores);
//       }
//     });
// });
//
// router.get('/scores/:id', function(req, res){
//   console.log('Get request for a single score');
//   Score.findById(req.params.id)
//     .exec(function(err, score){
//       if (err){
//         console.log("Error retrieving score");
//       }else {
//         res.json(score);
//       }
//     });
// });
//
// router.get('/scoresByMatch/:id', function(req, res){
//   console.log('Get request for match scores');
//   Score.find({'matchId': req.params.id})
//     .exec(function(err, score){
//       if (err){
//         console.log("Error retrieving match score");
//       }else {
//         res.json(score);
//       }
//     });
// });
//
// router.get('/scoresByMatchPlayer/:matchId/:memberId', function(req, res){
//   console.log('Get request for player-match score', req.params.matchId, req.params.memberId);
//   Score.find({'matchId': req.params.matchId,'memberId': req.params.memberId})
//     .exec(function(err, score){
//       if (err){
//         console.log("Error retrieving match score");
//       }else {
//         res.json(score);
//         console.log('Response',score);
//       }
//     });
// });
//
// router.post('/score', function(req, res){
//   console.log('Post a score', req.body);
//   var newScore = new Score();
//   newScore.name = req.body.name;
//   newScore.cap = req.body.cap;
//   newScore.wonTwoBall = req.body.wonTwoBall;
//   newScore.wonOneBall = req.body.wonOneBall;
//   newScore.wonIndo = req.body.wonIndo;
//   newScore.foursomeIds = req.body.foursomeIds;
//   newScore.matchId  = req.body.matchId;
//   newScore.memberId  = req.body.memberId;
//   newScore.user = req.body.user;
//   newScore.save(function(err, insertedScore){
//     if (err){
//       console.log('Error saving score');
//       console.log('InsertedScoreFail',insertedScore);
//     }else{
//       res.json(insertedScore);
//       console.log('InsertedScorePass',insertedScore);
//     }
//   });
// });
//
// router.put('/score/:id', function(req, res){
//   console.log('Update a score');
//   Score.findByIdAndUpdate(req.params.id,
//     {
//       $set: {
//         name: req.body.name,
//         cap: req.body.cap,
//         wonTwoBall: req.body.wonTwoBall,
//         wonOneBall: req.body.wonOneBall,
//         wonIndo: req.body.wonIndo,
//         foursomeIds: req.body.foursomeIds,
//         matchId: req.body.matchId,
//         memberId: req.body.memberId,
//         user: req.body.user
//           }
//     },
//     {
//       new: true
//     },
//     function(err, updatedScore){
//       if(err){
//         res.send("Error updating score");
//       }else{
//         res.json(updatedScore);
//       }
//     }
//
//   );
// });
//
// router.delete('/score/:id', function(req, res){
//   console.log('Deleting a score');
//   Score.findByIdAndRemove(req.params.id, function(err, deletedScore){
//     if(err){
//       res.send("Error deleting score");
//     }else{
//       res.json(deletedScore);
//     }
//   });
// });
// module.exports = router;
