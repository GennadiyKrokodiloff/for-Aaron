module.exports = {

  attributes : {

    InmateCommentId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    InmateId: {
      model: 'Inmate'
    },

    UserId: {
    	type: 'integer'
    },

    Anonymous: {
    	type: 'boolean',
      defaultsTo: false
    },

    Comment: {
    	type: 'string',
      size: 150
    },

    DatePosted: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date()
      }
    },

  	Deleted: {
  		type: 'boolean',
      defaultsTo: false
  	},

  	DeletedByUser: {
  		model: 'User'
  	}

  }

}
