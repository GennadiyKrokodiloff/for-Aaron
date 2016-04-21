module.exports = {

  attributes: {

    FacilityId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    FacilityType: {
      type: 'string'
    },

    FullName: {
      type: 'string'
    },

    StreatNumber: {
      type: 'integer'
    },

    Address: {
      type: 'string'
    },

    Address2: {
      type: 'string'
    },

    City: {
      type: 'string'
    },

    State: {
      type: 'string'
    },

    ZIP: {
      type: 'integer'
    },

    Status: {
      type      : 'string',
      defaultsTo: ['active'],
      enum: ['active', 'inactive']
    },

    Note: {
      type: 'string'
    },

    CreatedByUser: {
      model: 'User'
    },

    LastUpdatedUser: {
      model: 'user'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    LastUpdated: {
      type: 'datetime'
    },

    toFacilitiesSerchObj : function () {
      return {
        fullname: this.FullName,
        address: this.Address,
        status: this.Status
      }
    }
    
  },

    afterCreate: function (createFacility, next) {
      /* console.log("in ater created" + cratedUser.id);
       var UserId = cratedUser.id;*/
      if (createFacility.id) {
        createFacility.FacilityId = createFacility.id;
      }

      next();
    }

}
