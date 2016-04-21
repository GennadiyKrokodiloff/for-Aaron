module.exports = {

  attributes: {

    PersonalRequestDetailId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    PersonalRequestId: {
      model: 'PersonalRequest'
    },

    UserId: {
      model: 'User'
    },

    Anonymous: {
      type: 'boolean'
    },

    Amount: {
      type: 'float'
    },

    Date: {
      type: 'date',
      defaultsTo: new Date
    },

    UserTransactionId: {
      model: 'UserTransaction'
    },

    Status: {
      type: 'string',
      enum: ['processing', 'completed', 'denied'],
      defaultsTo: 'processing'
    },

    Note: {
      type: 'string'
    }

  }
  
};
