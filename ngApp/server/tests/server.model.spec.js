/**
 * Created by cliff on 8/9/2017.
 */

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Member = mongoose.model('Member');

/**
 * Globals
 */
var user,
  member;

/**
 * Unit tests
 */
describe('Member Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      email: 'test@test.com',
      username: 'username'
    });

    user.save(function() {
      member = new Member({
        firstName: 'Member ',
        lastName: ' Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return member.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      member.firstName = '';
      return member.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Member.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

