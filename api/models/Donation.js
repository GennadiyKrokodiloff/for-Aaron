module.exports = {

  attributes: {
    
    DonationId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true

    },

    UserId: {
      model: 'User'
    },

    UserTransactionId: {
      model: 'UserTransaction'
    },

    Anonymous: {
      type: 'boolean'
    },

    Amount: {
      type: 'float'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    Status: {
      type: 'string',
      enum: ['submitted', 'processing', 'denied', 'error', 'done', 'completed'],
      defaultsTo: 'done'
    },

    Note: {
      type: 'string'
    }

  }

};