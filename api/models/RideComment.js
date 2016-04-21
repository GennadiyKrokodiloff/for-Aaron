module.exports = {

  attributes: {

    RideCommentId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    RideId: {
      type: 'integer'
    },

    UserId: {
      type: 'integer'
    },

    Anonymous: {
      type: 'boolean'
    },

    Comment: {
      type: 'string'
    },

    DatePosted: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    Deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    DeletedByUser: {
      model: 'User'
    }

  }
  
};
