module.exports = {

  attributes: {

    RideId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    FacilityId: {
      model: 'Facility'
    },

    IsFromScheduledVisitation: {
      type: 'boolean'
    },

    ScheduledVisitationId: {
      model: 'ScheduledVisitation'
    },

    Date: {
      type: 'date'
    },

    Time: {
      type: 'datetime'
    },

    AllowOtherUsersToJoin: {
      type: 'boolean',
      defaultsTo: false
    },

    SeatsAvailable: {
      type: 'integer'
    },

    UserLocationId: {
      model: 'UserLocation'
    },

    MilesTraveled: {
      type: 'integer'
    },

    ContactNumber: {
      type: 'integer'
    },

    DateCreated: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

    CreatedByUser: {
      model: 'User'
    },

    LastUpdated: {
      date: 'datetime'
    },

    LastUpdatedByUser: {
      model: 'User'
    },

    Status: {
      type: 'string',
      defaultsTo: 'ontime',
      enum: ['ontime', 'completed', 'cancelled']
    },

    rideDetails: {
      type      : 'collection',
      via       : 'RideId',
      collection: 'RideDetail'
    }

  }

}
