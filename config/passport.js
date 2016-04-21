/*
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var emailValidator = require('email-validator');
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user, next) {
  console.log(user);
  next(null, user.UserId || user.id);
});

passport.deserializeUser(function (UserId, next) {

  User.findOne({
    'id': UserId
  }).exec(function (err, user) {
    if (err) { return next(err); }

    if (!user) {
      return next('Cannot find user with such id');
    }

    next(null, user);
  })
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, next) {
  var query = {};

  if (emailValidator.validate(username)) {
    query.EmailAddress = username;
  } else {
    query.UserName = username;
  }
  User.findOne(query).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {message: 'User notFound'})
    }

    if (bcrypt.compareSync(password, user.PasswordHash)) {

      return next(null, user, {message: 'user successfully logged in'})
    }
    // else {
    //   if(bcrypt.compareSync(password, user.TemporaryPasswordHash || '')) {

    //     return next(null, user, {message: 'user successfully logged in'})
    //   }
    // }

    return next(null, null, {message: 'invalid username or password'});
  })
} ));
*/
