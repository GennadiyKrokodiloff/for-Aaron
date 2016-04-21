var request = require('supertest');
require('../../bootstrap.test.js');
var _ = require('lodash');

var validaccesskey = 'useraccesskey1';
// none user api methods
describe('AccessKeyController', function () {
  describe('validate', function () {
    it('should validate accesskey and return true f', function (done) {
      request(sails.hooks.http.app)
        .post('/accesskey/validate')
          .send({
            accesskey: validaccesskey
          })
          .expect(function (res) {
            res.body.success.should.equal(true);
            res.body.data.should.equal(true);
          }).end(done)
    })
  })

  describe('find', function () {
    it('should return an accesskey with all filds', function (done) {
      request(sails.hooks.http.app)
        .post('/accesskey')
        .send({
          accesskey: validaccesskey
        })
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          res.body.data.AccessKey.should.equal(validaccesskey);
        }).end(done)
    })
  });
  describe('deactivateKey', function () {
    it('should change accesskey Active state to false', function (done) {
      request(sails.hooks.http.app)
        .put('/accesskey')
        .send({
          accesskey: validaccesskey
        })
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          res.body.data.Active.should.equal(false);
        }).end(done)
    })
  });
  describe('deleteKey', function () {
    it('should delete the key from database and return deletedKey ', function (done) {
      request(sails.hooks.http.app)
        .delete('/accesskey?accesskey=' + validaccesskey)
        .expect(200)
        .expect(function (res) {
          res.body.success.should.equal(true);
          res.body.data.AccessKey.should.equal(validaccesskey);

        }).end(done)
    })
  })
})

