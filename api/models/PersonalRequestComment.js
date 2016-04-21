module.exports = {

  attributes: {
    PersonalRequestCommentId: {
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
