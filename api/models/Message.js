module.exports = {

  attributes: {

    MessageId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    UserMessageId: {
      model: 'UserMessage'
    },

    SenderId: {
      model: 'User'
    },

    Text: {
      type: 'string'
    },

    Starred: {
      type: 'boolean'
    },

    StarredByUser: {
      model: 'User'
    },

    LinkToObject: {
      type: 'boolean'
    },

    Object: {
      type: 'string'
    },

    ObjectId: {
      type: 'integer'
    },

    Viewed: {
      type: 'boolean',
      defaultsTo: false
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    }
    
  }

}