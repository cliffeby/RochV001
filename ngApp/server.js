const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const memberController = require('./server/controllers/member.controller');
const matchController = require('./server/controllers/match.controller');
const scoreController = require('./server/controllers/score.controller');
const scorecardController = require('./server/controllers/scorecard.controller');
const userController = require('./server/controllers/user');
const path = require('path');
// const api = require('./server/routes/api');
const port =3000;

const app = express();

const config = require('./server/_config');

// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();
// Create endpoint handlers for /members
router.route('/members')
  .post(memberController.postMember)
  .get(memberController.getMembers);

// Create endpoint handlers for /members/:beer_id
router.route('/members/:id')
  .get(memberController.getMember)
  .put(memberController.putMember)
  .delete(memberController.deleteMember);

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Create endpoint handlers for /users/:_id
router.route('/users/:id')
  .get(userController.getUser)
  .put(userController.putUser)
  .delete(userController.deleteUser);

router.route('/matches')
  .post(matchController.postMatch)
  .get(matchController.getMatches);

// Create endpoint handlers for /matches/_id
router.route('/matches/:id')
  .get(matchController.getMatch)
  .put(matchController.putMatch)
  .delete(matchController.deleteMatch);

router.route('/scores')
  .post(scoreController.postScore)
  .get(scoreController.getScores);

// Create endpoint handlers for /scores/:beer_id
router.route('/scores/:id')
  .get(scoreController.getScore)
  .put(scoreController.putScore)
  .delete(scoreController.deleteScore);
router.route('/scoresByMatch/:id')
 .get(scoreController.getMatchScores);
router.route('/scoresByMatchPlayer/:matchId/:memberId')
  .get(scoreController.getMatchPlayer);
router.route('/scorecards')
  .post(scorecardController.postScorecard)
  .get(scorecardController.getScorecards);

// Create endpoint handlers for /scorecards/:beer_id
router.route('/scorecards/:id')
  .get(scorecardController.getScorecard)
  .put(scorecardController.putScorecard)
  .delete(scorecardController.deleteScorecard);
// Register all our routes with /api

app.use('/api', router);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
