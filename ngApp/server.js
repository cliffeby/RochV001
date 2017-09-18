const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const memberController = require('./server/controllers/member.controller');
const matchController = require('./server/controllers/match.controller');
const scoreController = require('./server/controllers/score.controller');
const scorecardController = require('./server/controllers/scorecard.controller');
const userController = require('./server/controllers/user.controller');
const passport = require('passport');
const authController = require('./server/controllers/auth.controller');
const path = require('path');
// const api = require('./server/routes/api');
const port =3000;

const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
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
app.use(cors());




app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

// Configure API to accept RS256 signed tokens
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://roch.auth0.com/.well-known/jwks.json"
  }),
  audience: 'http://localhost:4200/home',
  issuer: "https://roch.auth0.com/",
  algorithms: ['RS256']
});
const checkUserScopes = jwtAuthz(['read:scores']);
const checkAdminScopes = jwtAuthz(['create:scorecards']);
const checkScopes = jwtAuthz(['read:scorecards']);

app.use(jwtCheck);

var router = express.Router();
// Create endpoint handlers for /members
router.route('/members')
  .post(jwtCheck, checkScopes, memberController.postMember)
  .get(jwtCheck, checkScopes, memberController.getMembers);

// Create endpoint handlers for /members/:beer_id
router.route('/members/:id')
  .get(jwtCheck, checkScopes, memberController.getMember)
  .put(jwtCheck, checkScopes, memberController.putMember)
  .delete(jwtCheck, checkScopes, memberController.deleteMember);


router.route('/matches')
  .post(jwtCheck, checkScopes, matchController.postMatch)
  .get(jwtCheck, checkScopes, matchController.getMatches);

// Create endpoint handlers for /matches/_id
router.route('/matches/:id')
  .get(jwtCheck, checkScopes, matchController.getMatch)
  .put(jwtCheck, checkScopes, matchController.putMatch)
  .delete(jwtCheck, checkScopes, matchController.deleteMatch);


router.route('/scores')
  .post(jwtCheck, checkScopes, scoreController.postScore)
  .get(jwtCheck, checkUserScopes, scoreController.getScores);

// Create endpoint handlers for /scores/:beer_id
router.route('/scores/:id')
  .get(jwtCheck, checkScopes, scoreController.getScore)
  .put(jwtCheck, checkScopes, scoreController.putScore)
  .delete(jwtCheck, checkScopes, scoreController.deleteScore);

router.route('/scoresByMatch/:id')
 .get(scoreController.getMatchScores);

router.route('/scoresByMatchPlayer/:matchId/:memberId')
  .get(scoreController.getMatchPlayer);

router.route('/scorecards')
  .post(jwtCheck, checkAdminScopes, scorecardController.postScorecard)
  .get(jwtCheck, checkScopes, scorecardController.getScorecards);

// Create endpoint handlers for /scorecards/:beer_id
router.route('/scorecards/:id')
  .get(jwtCheck, checkScopes, scorecardController.getScorecard)
  .put(jwtCheck, checkScopes, scorecardController.putScorecard)
  .delete(jwtCheck, checkScopes, scorecardController.deleteScorecard);
// Register all our routes with /api

app.use('/api', router);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
