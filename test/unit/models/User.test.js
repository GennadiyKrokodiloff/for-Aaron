require('../../bootstrap.test.js');
describe('User', function() {
  it ('should have the same amount of documents as in fixtures', function(done) {
    User.find().exec(function(err, oranges) {
      fixtures['user'].length.should.be.greaterThan(0);
      oranges.length.should.be.eql(fixtures['user'].length);

      done();
    });
  });

  it('should have a email validationKey', function (done) {
    User.findOne({UserName: 'Eli_Kuphal'}).exec(function (err, data) {

      if(data){
        done();
      }
      else {
        throw new Error(err)
      }
    })
  })
});
