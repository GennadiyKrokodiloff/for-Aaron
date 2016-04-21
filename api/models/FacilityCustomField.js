module.exports = {

  attributes: {

    FacilityCustomFieldId : {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    FacilityId: {
      type: 'integer'
    },

    Name: {
      type: 'string'
    },

    Value: {
      type: 'string'
    },

    Visible: {
      type: 'boolean',
      defaultsTo: true
    },

    CreatedByUser : {
      model: 'User'
    },

    LastUpdatedByUser: {
      model: 'User'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    LastUpdated: {
      type: 'datetime'
    }

  }

}
