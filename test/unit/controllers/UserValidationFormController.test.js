var request = require('supertest');
require('../../bootstrap.test.js');
var _ = require('lodash');


describe('UserValidationController', function () {
  var adminagent;
  var accesskey = 'adminaccesskey1';
  describe('validationForm', function () {
    it('should get validation form', function (done) {
      request(sails.hooks.http.app)
        .get('/uservalidationform?UserValidationFormId=' + 1)
        .set('X-Api-Key', accesskey)
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          res.body.data.should.have.property('UserId')
        }).end(done)
    })
  })

  describe('status', function () {
    it('should change status ok', function (done) {
      request(sails.hooks.http.app)
        .post('/uservalidationform/status')
        .set('X-Api-Key', accesskey)
        .send({
          uservalidationformid: 1,
          status: 'ok'
        })
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);

        }).end(done)
    })
  })

  describe('createValidationForm', function () {
    var form = {
      ValidationFormKey: 'validationfomkey5',
      ShulAffiliatedWith: 'someone',
      RuvOfShul: 'revofshul1',
      RuvContact: 'Jamesperson',
      Occupation: 'weedsmoker',
      ReferenceName: 'Jonny',
      ReferenceContact: 'the contact'
    }
    it('should submit validationform by creating it', function (done) {
      request(sails.hooks.http.app)
        .post('/user/validationform')
        .send(form)
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          res.body.data.should.have.property('UserId')
        }).end(done)
    })
  })



})
