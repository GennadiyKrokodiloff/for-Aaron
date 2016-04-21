module.exports = {

  attributes: {
    LogId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    UserId: {
      type: 'integer'
    },
    Object: {
      type: 'string'
    },
    ObjectId: {
      type: 'integer'
    },
    Action: {
      type: 'string'
    },
    Datecreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }
  }
}
