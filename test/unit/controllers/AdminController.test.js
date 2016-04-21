var request = require('supertest');
require('../../bootstrap.test.js');
var _ = require('lodash');

describe('AdminController', function () {
  var adminagent;
  var accesskey;
  before('login as admin', function (done) {
    var adminuser = {
      username: 'admin',
      password: 'password'
    }
    adminagent = request.agent(sails.hooks.http.app);
    adminagent
      .post('/user/login')
      .send(adminuser)
      .expect(function (res) {
        res.status.should.equal(200);
        res.body.data.should.have.property('UserId');
        res.body.data.should.have.property('AccessKey');
        accesskey = res.body.data.AccessKey;
      }).end(done);

  })

  describe('requestForm', function () {
    it('should chenge status to requestForm and generate validationFormKey', function (done) {
      adminagent
         .put('/user/requestform')
        .send({
          AccessKey: accesskey,
          UserId: 4
        })
        .expect(function (res) {
          console.log(res.body);

          res.body.success.should.equal(true);
          res.body.data.should.have.property('ValidationFormKey');

        }).end(done)
    })
  })

  describe('changeUserType', function () {
    it('should change a user to and admin', function (done) {
     adminagent
        .put('/user/type')
        .send({
          UserId: 2,
          Type: 'admin',
          AccessKey: accesskey
        })
        .expect(200)
        .expect(function (res) {
          console.log(res.body)
          res.body.success.should.equal(true);

        }).end(done)
    })
  })
})
