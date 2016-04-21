module.exports = {

  attributes: {

    RideDetailId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    RideId: {
      model: 'Ride'
    },

    UserId: {
      model: 'User'
    },

    IsOwner: {
      type: 'boolean'
    },

    DateAdded: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    Status: {
      type: 'string'
    },

    Anonymous: {
      type: 'boolean'
    }

  }
  
};
