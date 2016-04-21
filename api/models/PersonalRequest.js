module.exports = {

  attributes: {

    PersonalRequestId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    InmateId: {
      model: 'Inmate'
    },

    Title: {
      type: 'string'
    },

    Description: {
      type: 'string'
    },

    Value: {
      type: 'float'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    ExpirationDate: {
      type: 'datetime'
    },

    CreatedByUser: {
      model: 'User'
    },

    LastUpdated: {
      type: 'datetime'
    },

    LastUpdatedByUser: {
      model: 'User'
    },

    Status: {
      type: 'string',
      defaultsTo: 'open',
      enum: ['open', 'processing', 'completed']
    },

    Anonymous: {
      type: 'boolean',
      defaultsTo: false
    },

    Note: {
      type: 'string'
    },

    persReqDetails: {
      type      : 'collection',
      via       : 'PersonalRequestId',
      collection: 'PersonalRequestDetail'
    },

    persReqComments: {
      type      : 'collection',
      via       : 'PersonalRequestId',
      collection: 'PersonalRequestComment'
    }

  },

  afterUpdate: function (perRequest, call) {
    perRequest.LastUpdated = new Date();
    call(null, perRequest);
  },

};