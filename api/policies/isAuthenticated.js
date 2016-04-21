// checking does request contains access key

module.exports = function (req, res, next) {
  var key = getAccessKey(req);

  req.isAdmin = req.isUser = req.isSubAdmin = false;

  if (!key) {
    return res.sendError({ 'message': 'Permission denied, acess key not found' });
  }

  async.auto({
    getAcessKey: function (call) {
      AccessKey
        .findOne({ 'AccessKey': key })
        .populate('UserId')
      .exec(call);
    },
    isAccessKeyAvail: ['getAcessKey', function (call, data) {
      var accessKey   = data.getAcessKey, 
          isKeyActive = accessKey && accessKey.Active,
          user        = accessKey.UserId,
          err         = checkIsAccessKeyAvail(accessKey, isKeyActive, user);;

      if (err) {
        return call(err);
      };

      return call(null);
    }]
  }, function (err, data) {
    if (err) {
      if ( _.isString(err) ) { 
        return res.sendError({ 
          'message': err 
        }); 
      } else if (err.code && err.code === 1) {
        return res.status(401).send({ 
          'message': err.text 
        });
      }

      return res.sendError({ 'message': 'error while getting permissions', 'err': err });
    }

    setUserAndAccessKey(req, data);
    setUserType(req, data.getAcessKey);
    next();
  });

}

/** 
 * @name getAccessKey
 * @desc Getting of the access key from header or query param
 * @param req - request object
 */
function getAccessKey(req) {

  if (req.param('AccessKey')) {
    return req.param('AccessKey')
  } else if (req.headers['x-api-key']) {
    return req.headers['x-api-key'];
  }

  return req.query.accessKey;
}

/** 
 * @name setUserAndAccessKey
 * @desc Setting of the curr user and access key
 * @param req  - request object
 *        data - data obj contains curr user and access key; 
 */
function setUserAndAccessKey(req, data) {
    req.accessKey = data.getAcessKey;
    req.user      = data.getAcessKey.UserId;
}

/** 
 * @name setUserType
 * @desc Getting type of the user who make request
 * @param req  - request object
 *        user - user that make request 
 */
function setUserType(req, accessKey) {
  var role = accessKey.Role;

  if (role === 'admin') {
    return req.isAdmin = true;
  } else if (role === 'sub-admin') {
    return req.isSubAdmin = true;
  }

  return req.isUser = true;
}

/** 
 * @name checkIsAccessKeyAvail
 * @desc Checking is access key is availabel
 * @param accessKey   - access key getted from client
 *        isKeyActive - boolean vaue checking is key active
 *        user        - finded user in access key 
 */
function checkIsAccessKeyAvail(accessKey, isKeyActive, user) {
  if (!accessKey || !isKeyActive) {
    if (!accessKey) { 
      return 'Access key not found'; 
    }

    return {
      'code': 1,
      'text': 'Access key is not available any more'
    };
  }

  if (!user) {
    return 'User was not found';
  }

  return null;
}