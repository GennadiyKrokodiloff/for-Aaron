
module.exports = {
  getAccessKey: function (req, res) {
    var AccessKeyId = req.query.AccessKey;

    if ( !AccessKeyService.isAccessKeyValid(AccessKeyId) ) {
      return res.sendError({message: 'accesskey is invalid'});
    }

    AccessKeyService.returnAccessKey(AccessKeyId, function (err, accesskey) {

      if (err) {
        return res.sendError({ 'message': 'there was some error', 'err': err });
      }

      res.success(accesskey);
    });
  },

  find: function (req, res) {
    var accesskey = req.body.accesskey;

    if (!accesskey) {
      return res.sendError({message: 'accesskey parameter not found'});
    }
    AccessKey.findOne({
      AccessKey: accesskey
    }).exec(function (err, key) {
      if (err) {
        return res.sendError(err);
      }

      if (key) {

        return res.success(key)
      }
    })
  },

  validate: function (req, res) {
    var accesskey = req.body.accesskey;

    if (!accesskey) {
      return res.sendError({message: 'accesskey parameter not found'});
    }
    AccessKey.findOne({
       AccessKey: accesskey
     }).exec(function (err, key) {
       if (err) {
         res.sendError(err);
       }

       if (key) {

         return res.success(key.Active)
       }
     })
  },

  deactivateKey: function (req, res) {
    var accesskey = req.body.accesskey;

    if (!accesskey) {
      return res.sendError({message: 'accesskey parameter not found'});
    }

    AccessKey.findOne({AccessKey: accesskey})
      .exec(function (err, key) {

        if (err) {
          return res.sendError(err);
        }

        if (key) {

          key.Active = false
          key.save(function (err, saved) {
            if (!err) {
              return res.success(saved);
            }
          });

        }
      })
  },
  deleteKey: function (req, res) {
    var accesskey = req.query.accesskey;

    if (!accesskey) {
      return res.sendError({message: 'accesskey parameter not found'})
    }

    AccessKey.destroy({AccessKey: accesskey})
      .exec(function (err, deletedKey) {
        if (err) {
          return res.sendError(err)
        }

        if (deletedKey) {
          return res.success(deletedKey[0])
        }
      })
  }
}
