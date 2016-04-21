module.exports = {

  attributes : {
    InmateProfilePostId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    InmateId: {
      type: 'integer'
    },
    Title: {
      type: 'string'
    },
    Content: {
      type: 'string'
    },
    Visible: {
      type: 'boolean'
    },
    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },
    LastUpdated: {
      type: 'datetime'
    },
    CreatedByUser: {
      model: 'User'
    },
    LastUpdatedByUser: {
      model: 'User'
    }
  }
}
