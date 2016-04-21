module.exports = {

  attributes : {

    AccessKeyId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    UserId: {
      model: 'User'
    },

    AccessKey: {
      type: 'string'
    },

    Active: {
      type: 'boolean'
    },

    Role: {
      type: 'string',
      enum: ['user', 'admin', 'sub-admin']
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    ExpirationDate: {
      type: 'datetime'
    }

  }

}
