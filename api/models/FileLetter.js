module.exports = {

  attributes: {

    FileLetterId: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    LetterId: {
      model: 'Letter'
    },

    Url: {
      type: 'string'
    },

    Type: {
      type: 'string'
    },

    Name:{
      type:'string'
    },

    DateUploaded: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }

  }

};
