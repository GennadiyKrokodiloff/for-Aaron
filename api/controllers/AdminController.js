var randomstring  = require("randomstring");
var async = require('async');
var emailValidator = require('email-validator');
var bcrypt = require('bcrypt-nodejs');

function returnKey (user, res) {
  if (user.UserType === 'user') {
    return res.sendError({ 'message': 'unauthorized error' })
  }

  if (_.some(['new', 'pending', 'requestform', 'formsent'], function (availStatus) {
    return availStatus === user.Status;
  })) {
    return res.success(user.toUserPendingObject())
  }

  if ( (user.Status === 'inactive') || (user.Status === 'deleted') ) {
    return res.sendError({ 'message': 'User deleted or inactive' });
  }

  if (user.Status === 'active') {
    var keyToCreate = {
      'UserId'   : user.UserId,
      'AccessKey': randomstring.generate(33),
      'Active'   : true,
      'Role'     : user.UserType
    };
    async.auto({
      createKey: function (next) {
        AccessKey.create(keyToCreate)
          .exec(next);
      },
      findUser: ['createKey', function (callback, results) {
        User.findOne({
          UserId: user.UserId
        }).exec(callback)
      }]
    }, function (err, results) {
      if (err) {
        return res.sendError({message: 'could not createKey findUser', err: err})
      }
      var userObject = results.findUser.toUserObject();
      userObject.AccessKey = results.createKey.AccessKey;
      // console.log('---');
      console.log(userObject.AccessKey)
      return res.success(userObject)
    })
  }
}
  module.exports = {

    // users requires admin or subadmin access
    adminLogin: function (req, res) {
      var user     = req.user,
          password = req.body.password;

      bcrypt.compare(password, user.PasswordHash, function (err, result) {
        // console.log(err)
        if (err) {
          return res.sendError(err);
        }

        if (result) {
          return returnKey(user, res);
        }
        else {
          bcrypt.compare(password, user.TemporaryPasswordHash, function (err, result) {

            if (err) {
              return res.sendError(err);
            }

            if (result) {
              return returnKey(user, res);
            }
            else {
              return res.sendError({message: 'incorrect username or password'})
            }

          })

        }
      });
    },
    users: function (req, res) {
      var Offset = req.query.offset || 0,
        username = req.query.UserName || '',
        status = req.query.status,
        max = 25;
      // ask if we can pass max in filter
      var query = {
        where: {
          UserName: username
        },
        limit: max,
        skip: Offset
      };

      if (status) {
        query.where.Status = status
      }

      User.find(query).exec(function (err, users) {
        if (err) {
          res.sendError({message: 'error fetching user', error: err});
        }
        res.success(users);
      })
    },
    changeUserType: function (req, res) {
      var userId = req.body.userId,
          role   = req.body.type,
          admin  = req.user, 
          html;

      if (!userId || !role) {
        return res.sendError({'message': 'incorrect credentials'});
      }

      async.auto({
        user: function (call) {
          User.findOne({
            'UserId': userId
          }).exec(call);
        },
        changeType: ['user', function (call, data) {
          if (!data.user || (data.user.UserType === role) ) {
            if (!data.user) { return call('user with such id not found'); }
            
            return call('user already have role - ' + role);
          }

          AdminService.changeUserStatus(data.user, req.user, role, call);
        }],
        createNotification: ['changeType', function (call, data) {
          AdminService.createNotification(admin, data.user, call);
        }],
        sendNotification: ['createNotification', function (call, data) {
          html = EmailService.generateLetter({
            'tmplName': 'changeType',
            'user': {
              'firstName': data.user.FirstName,
              'lastName' : data.user.LastName,
              'role'     : role
            }
          });

          EmailService.sendLetter({
            'subject': 'Type changed',
            'to'     : data.user.EmailAddress,
            'html'   : html
          }, call);
        }]
      }, function (err, data) {
        if (err) {
          if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

          return res.sendError({'message': 'there is some error', 'err': err});
        }

        res.success(data.user);
      });
    },

    requestForm: function (req, res) {
      var UserId = req.body.UserId;
      var key = randomstring.generate(33);

      if (!CommonUtils.isIdValid(UserId)) {
        return res.sendError({'message': 'id is not valid'});
      }

      async.auto({
        user: function (call) {
          User.findOne({UserId: UserId}).exec(function (err, user) {
            if (err || !user) {
              return call(err || 'user not found');
            }

            if (user.Status === 'pending') {
              return call(null, user);
            } else {
              call('user not in pending');
            }

            console.log('whosis sending response')
          })
        },
        updateUser: ['user', function (call, data) {
          _.extend(data.user, {
            Status: 'requestform',
            ValidationFormKey: key
          });

          data.user.save(function (err, savedUser) {
            if (err) {
              return call(err);
            }


            call(null, savedUser);
          });
        }]
      }, function (err, results) {

        if (err) {
          return res.sendError({'message': 'some error', 'err': err});
        }
        var user = results.updateUser;
        EmailService.sendValidationFormKeyEmail({
          'subject': 'ValidationFormKey',
          'to': user.EmailAddress
        }, {
          'user': {
            'firstName': user.FirstName,
            'lastName': user.LastName,
            'validationKey': user.ValidationFormKey,
            'id': user.UserId || user.id,
            'domain': sails.getBaseurl()
          },
          'tmplName': 'validationForm'
        }, function (err, json) {
          if (err) {
            console.log(err)
          }

          return res.success(results.updateUser);
        });
      })

    },

    // AACK PUT /user/status
    changeStatus: function (req, res) {
      var userId = req.body.userId,
          status = req.body.status;

      if (!AdminService.isStatusAllowable(status) || !userId) {

        if (!userId) {
          return res.sendError({'message': 'User id is not correct'});
        }

        return res.sendError({'message': 'Such status is forbidden for this request'})
      }

      async.auto({
        user: function (call) {
          User.findOne({ 'UserId': userId }).exec(call);
        },
        setStatus: ['user', function (call, data) {
          if (!data.user) {
            return call('user not found');
          }

          AdminService.setUserStatus(status, data.user, req.user, call);
        }],
        sendEmailNotification: ['setStatus', function (call, data) {
          var status = data.setStatus,
            user = data.user,
            html = 'Hi ' + user.FirstName + ' ' + user.LastName + ' your accoun have been <strong>' + status + '</strong>';

          EmailService.sendLetter({
            'subject': 'Account status changing',
            'to': user.EmailAddress,
            'html': html
          }, call);
        }]
      }, function (err, data) {
        if (err) {
          return res.sendError({'message': 'there is some error', 'err': err});
        }

        res.success('Status successful changed');
      });
    }
  }


