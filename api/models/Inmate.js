module.exports = {

  attributes: {

    InmateId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    RegistrationNumber: {
      type: 'integer'
    },

    FirstName: {
      type: 'string',
      index: true
    },

    MiddleName: {
      type: 'string'
    },

    LastName: {
      type: 'string'
    },

    ReleaseDate: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    Gender: {
      type: 'string'
    },

    DateOfBirth: {
      type: 'datetime'
    },

    Age: {
      type: 'integer'
    },

    Race: {
      type: 'string'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    LastUpdated: {
      type: 'datetime'
    },

    CreatedByUser: {
      model: 'User'
    },

    LastUpdatedByUser: {
      model: 'User'
    },

    Notes: {
      type: 'string'
    },

    ImportantNotes: {
      type: 'string'
    },

    FacilityId: {
      model: 'Facility'
    },

    Status: {
      type: 'string',
      enum: ['active', 'released', 'invisible', 'deleted']
    },

    visitRequests: {
      type      : 'collection',
      via       : 'InmateId',
      collection: 'VisitationRequest'
    },

    personalRequests: {
      type      : 'collection',
      via       : 'InmateId',
      collection: 'PersonalRequest'
    },

    comments: {
      type      : 'collection',
      via       : 'InmateId',
      collection: 'InmateComment'
    },

    donations: {
      type      : 'collection',
      via       : 'InmateId',
      collection: 'InmateDonation'
    },

    letters: {
      type      : 'collection',
      via       : 'InmateId',
      collection: 'Letter'
    }

  }

}