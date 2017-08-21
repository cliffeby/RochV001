/**
 * Created by cliff on 8/18/2017.
 */
// Users
const User = require('../models/user');

exports.getUsers=function(req, res){
  console.log('Get request for all users');
  User.find({})
    .sort('lastName')
    .exec(function(err, users){
      if (err){
        console.log("Error retrieving users");
      }else {
        res.json(users);
      }
    });
};

exports.getUser=function(req, res){
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

exports.postUsers=function(req, res){
  console.log('Post a user');
  var newUser = new User();
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.currentHCap  = req.body.currentHCap;
  newUser.user = req.body.user;
  newUser.save(function(err, insertedUser){
    if (err){
      console.log('Error saving user');
    }else{
      res.json(insertedUser);
    }
  });
};

exports.putUser=function(req, res){
  console.log('Update a user');
  User.findByIdAndUpdate(req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        currentHCap: req.body.currentHCap,
        user: req.body.user}
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

exports.deleteUser=function(req, res){
  console.log('Deleting a user');
  User.findByIdAndRemove(req.params.id, function(err, deletedUser){
    if(err){
      res.send("Error deleting user");
    }else{
      res.json(deletedUser);
    }
  });
};
