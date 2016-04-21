module.exports = {

  attributes: {

    NotificationId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    Sender: {
      type: 'integer'
    },

    UserId: {
      type: 'integer'
    },

    HasObject: {
      type: 'boolean'
    },

    Object: {
      type: 'string'
    },

    ObjectId: {
      type: 'integer'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }

    },

    Viewed: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }

    }

  }

}