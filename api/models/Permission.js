module.exports = {

  attributes: {

    PermissionId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    PermissionGroupId: {
      type: 'integer'
    },

    Name: {
      type: 'string'
    },

    Description: {
      type: 'string'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }

  }
  
}
