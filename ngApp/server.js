const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const memberController = require('./server/controllers/member.controller');
const matchController = require('./server/controllers/match.controller');
const scoreController = require('./server/controllers/score.controller');
const scorecardController = require('./server/controllers/scorecard.controller');
const passport = require('passport');
const path = require('path');
// const api = require('./server/routes/api');
const port = process.env.PORT || 3000;
//process.env['NODE_ENV'] = 'test';

const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
const config = require('./server/_config');
console.log('ENVIRON', app.settings.env, process.env.NODE_ENV);
// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});
app.use(cors());




app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(passport.initialize());

// Configure API to accept RS256 signed tokens
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://roch.auth0.com/.well-known/jwks.json"
  }),
  aud: 'http://localhost:4200/home',
  issuer: "https://roch.auth0.com/",
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:members read:matches']);

app.use(jwtCheck);

var router = express.Router();
// Create endpoint handlers for /members
router.route('/members')
  .post(jwtCheck,  jwtAuthz(['create:member']), memberController.postMember)
  .get(jwtCheck, jwtAuthz(['read:members']), memberController.getMembers);

// Create endpoint handlers for /members/_id
router.route('/members/:id')
  .get(jwtCheck, checkScopes, memberController.getMember)
  .put(jwtCheck, jwtAuthz(['create:member']), memberController.putMember)
  .delete(jwtCheck, jwtAuthz(['remove:member']), memberController.deleteMember);


router.route('/matches')
  .post(jwtCheck, jwtAuthz(['create:match']), matchController.postMatch)
  .get(jwtCheck, jwtAuthz(['read:matches']), matchController.getMatches);

// Create endpoint handlers for /matches/_id
router.route('/matches/:id')
  .get(jwtCheck, checkScopes, matchController.getMatch)
  .put(jwtCheck, jwtAuthz(['create:match']), matchController.putMatch)
  .delete(jwtCheck, jwtAuthz(['remove:match']), matchController.deleteMatch);

router.route('/scores')
  .post(jwtCheck, jwtAuthz(['create:score']), scoreController.postScore)
  .get(jwtCheck, jwtAuthz(['read:scores']), scoreController.getScores);

// Create endpoint handlers for /scores/:beer_id
router.route('/scores/:id')
  .get(jwtCheck, jwtAuthz(['read:scores']), scoreController.getScore)
  .put(jwtCheck, jwtAuthz(['create:score']), scoreController.putScore)
  .delete(jwtCheck, jwtAuthz(['remove:score']), scoreController.deleteScore);

router.route('/scoresByMatch/:id')
 .get(scoreController.getMatchScores);

router.route('/scoresByMatchPlayer/:matchId/:memberId')
  .get(scoreController.getMatchPlayer);

router.route('/scorecards')
  .post(jwtCheck, jwtAuthz(['create:scorecard']), scorecardController.postScorecard)
  .get(jwtCheck, jwtAuthz(['read:scorecards']), scorecardController.getScorecards);
  // .get( scorecardController.getScorecards);
// Create endpoint handlers for /scorecards/_id
router.route('/scorecards/:id')
  .get(jwtCheck, jwtAuthz(['read:scorecards']), scorecardController.getScorecard)
  .put(jwtCheck, jwtAuthz(['create:scorecard']), scorecardController.putScorecard)
  .delete(jwtCheck, jwtAuthz(['remove:scorecard']), scorecardController.deleteScorecard);

// Register all our routes with /api
app.use('/api', router);

app.get('*', function(req, res) {
  res.status(404);
  res.send("No such path in this API");
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

//
// app.get('/authorized', function (req, res) {
//   res.send('Secured Resource');
// });

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
