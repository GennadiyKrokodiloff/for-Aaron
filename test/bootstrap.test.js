var Sails = require('sails');
var Barrels = require('barrels');
require('should');
//localDiskDb
// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'silly'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    hooks: {
      grunt: false
    }
  }, function (err, sails) {
    if (err)
      return done(err);

    // Load fixtures
    var barrels = new Barrels();

    // Save original objects in `fixtures` variable
    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(function (err) {
      if(err){
        console.log(err);
      }
      done(err, sails);
    });
  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
