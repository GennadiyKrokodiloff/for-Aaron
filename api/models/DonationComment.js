module.exports = {

  attributes: {
    DonationCommentId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    DonationId: {
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
        return new Date();
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
