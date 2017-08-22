/**
 * Created by cliff on 8/18/2017.
 */
// Users
// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    created: req.body.created
  });

  user.save(function(err) {
    if (err) {
     return res.send(err);
    }
    res.json({message: 'New user'});

  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return res.send(err);
    }
    res.json(users);
  });
};

exports.getUser = function(req, res){
  console.log('Get request for a single user');
  User.findById(req.params.id)
    .exec(function(err, user){
      if (err){
        console.log("Error retrieving user");
      }else {
        res.json(user);
      }
    });
};

exports.putUser = function(req, res){
  console.log('Update a user');
  User.findByIdAndUpdate(req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        created: req.body.created
      }
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user");
      }else{
        res.json(updatedUser);
      }
    }

  );
};

exports.deleteUser = function(req, res){
  console.log('Deleting a user');
  User.findByIdAndRemove(req.params.id, function(err, deletedUser){
    if(err){
      res.send("Error deleting user");
    }else{
      res.json(deletedUser);
    }
  });
};
