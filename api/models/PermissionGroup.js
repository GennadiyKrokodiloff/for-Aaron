module.exports = {

  attributes: {

    PermissionGroupId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    Name: {
      type: 'string'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    CreatedByUser: {
      model: 'User'
    }
    
  }

}
