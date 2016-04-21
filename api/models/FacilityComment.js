module.exports = {

  attributes: {

    FacilityCommentId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    FacilityId: {
      model: 'Facility'
    },

    UserId: {
      model: 'User'
    },

    Anonymous: {
      type: 'boolean',
      defaultsTo: false
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
      model: 'User',
      defaultsTo: null
    }

  }

}
