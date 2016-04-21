module.exports = {

  attributes: {

    InmateDonationId: {
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

    Anonymous: {
      type: 'boolean'
    },

    UserTransactionId: {
      model: 'UserTransaction'
    },

    Amount: {
      type: 'float'
    },

    Status: {
      type: 'string',
      enum: ['submitted', 'processing', 'denied', 'error', 'done', 'completed'],
      defaultsTo: 'done'
    },

    Note: {
      type: 'string'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    }

  }

}
