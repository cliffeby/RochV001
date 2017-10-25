/**
 * Created by cliff on 8/11/2017.
 */
var assert = require('assert');
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

before(function(done) {
  var request = require("request");


  var options = { method: 'POST',
    url: 'https://roch.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"2x46U3niRwqKcOMafBK1rMWttc4qWJI4","client_secret":"p2e87mcF04-dPpzHVIrV3blThn_u7djvXZY6VQp1YtwUbZvGQ3uiQEgubg7OEK9b","audience":"http://localhost:4200/home","grant_type":"client_credentials"}' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);


    console.log('REQ BODY',body);
  });
  done();
});






describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')))
  });
  it('should return the same array', function(){
    assert.equal(['a','b','c'].length, 'a,b,c'.split(',').length, 'arrays have equal length');
    for (var i=0; i<['a','b','c'].length; i++) {
      assert.equal(['a','b','c'][i], 'a,b,c'.split(',')[i], i +'element is equal');
    };
  });
});
describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('http://3000/api/scores')

      .expect(401, done)
  });

  it('errors if bad x-api-key header', function(done) {
    api.get('/home')

      .expect(401)
      .expect({error:"Unauthorized"}, done);
  });

});

