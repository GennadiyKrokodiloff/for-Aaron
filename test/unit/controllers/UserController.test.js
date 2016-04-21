
var request = require('supertest');
require('../../bootstrap.test.js');
var _ = require('lodash');

var fakeusers = require('../../fake/userfake.json');

var myuser = {
 "username": "Eli_Kuphal",
  "firstname": "Torrance",
  "lastname": "White",
  "password": "password",
  "emailaddress": "TorreyFrami@yahoo.com",
  "address": "18444 Lisa Inlet",
  "address2": "921 Collins Key",
  "city": "Collins mouth",
  "state": "Utah",
  "zip": "10001-9837",
  "dob": "3874834"};

describe('UserController', function () {
  describe('register', function () {
    it('should return success and status new', function (done) {
      request(sails.hooks.http.app)
        .post('/user/register').send( myuser)
        .expect(function (res) {
          //  res.body.Status.should.equal('Success')
          console.log(res.body);
          res.status.should.equal(200)
          res.body.success.should.equal(true);
          res.body.data.status.should.equal('new');
          res.body.data.should.have.property('UserId');
        }).end(done)
    });


  });
  describe('emailValidate', function () {
    it('validate key sent in email', function (done) {
      var key = '$2a$08$x3dJo6bLfT/X1NncvuzYK.zSEcTw3KKImyqod4yCrwwcyyslmvyOW'
      request(sails.hooks.http.app)
        .get('/user/emailvalidate?key=' + key)
        .expect(200, done)
    })
  })
  describe('login', function () {
    it('should login in user with username', function (done) {
      var data = {
        username: 'afaayerhan',
        password: 'password'
      }
      console.log(data);
      request(sails.hooks.http.app)
        .post('/user/login')
        .send(data)
          .expect(function (res) {
            res.status.should.equal(200);
            console.log(res.body);
            res.body.should.have.property('UserId');
          }).end(done);
    })

    it('should login and return user accesskey', function (done) {
      var activeUser = {
        username: 'activeuser',
        password: 'password'
      }
      request(sails.hooks.http.app)
        .post('/user/login')
        .send(activeUser)
        .expect(function (res) {
          res.status.should.equal(200);
          console.log(res.body);
          res.body.success.should.equal(true)
          res.body.data.should.have.property('UserId');
          res.body.data.should.have.property('AccessKey');
        }).end(done);
    })
    })

  describe('emailAddress', function () {
    it('should update emailaddress of new user ', function (done) {
      request(sails.hooks.http.app)
        .put('/user/emailaddress')
        .send({
      UserId: 7,
        Password: 'password',
        EmailAddress: 'newemailaddress@mail.com',
        UserName: 'newuser'
    })
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          console.log(res.body)
          res.body.data.emailaddress.should.equal('newemailaddress@mail.com');
        }).end(done)
    })
  })

  // User Api methods that require agent

  describe('changePasswordd', function () {
    var userApi;
    var UserData = {
     UserId: 3,
     NewPassword: 'newpassword',
     OldPassword: 'password'

   }
    var loginData = {
      username: 'activeuser',
      password: 'password'
    }

    before('loginUser', function (done) {
       userApi = request.agent(sails.hooks.http.app);
      userApi.post('/user/login')
        .send(loginData)
        .expect(function (res) {
          res.status.should.equal(200);
          console.log(res.body);
          res.body.data.should.have.property('UserId');
          res.body.data.should.have.property('AccessKey');
          UserData.AccessKey = res.body.data.AccessKey;
        }).end(done)

    });

    it('change password', function (done) {
      console.log(UserData)
      userApi.put('/user/changepassword')
        .send(UserData)
        .expect(function (res) {
          console.log(res.body);
          res.status.should.equal(200);

        }).end(done)
    })
  })


})

