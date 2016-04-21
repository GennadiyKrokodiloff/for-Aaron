module.exports = {

  attributes: {

    LetterId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    UserId: {
      model: 'User'
    },

    InmateId: {
      model: 'Inmate'
    },

    Status: {
      type: 'string',
      defaultsTo: 'saved'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    LastUpdated: {
      type: 'datetime'
    },

    ProcessedByUser:  {
      model: 'User'
    },

    Note: {
      type: 'string'
    },

    DateSubmitted: {
      type: 'datetime'
    },

    DateSent: {
      type: 'datetime'
    },

    LastUpdatedByUser: {
      model: 'User'
    },

    fileLetters: {
      type      : 'collection',
      via       : 'LetterId',
      collection: 'FileLetter'
    },

    textLetters: {
      type      : 'collection',
      via       : 'LetterId',
      collection: 'TextLetter'
    },

  },

  afterUpdate: function (letter, call) {

    if (letter.Status.toLowerCase() === 'submitted') {
      letter.DateSubmitted = new Date();
    } else if (letter.Status.toLowerCase() === 'sent') {
      letter.DateSent = new Date();
    }

    call(null, letter);
    // console.log('letter is', letter);
    // letter.save(function (err, savedLetter) {
    //   if (err) {
    //     console.log('Error while trying to save letter date'); 
    //     return call(err);
    //   }

    //   call(null, savedLetter);  
    // });

  }

}
