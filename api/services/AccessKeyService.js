module.exports = {
	isAccessKeyValid: isAccessKeyValid,
	setUserName     : setUserName,
	returnAccessKey : returnAccessKey
};


/**
 * @name isAccessKeyValid
 * @desc Checking is accessKey id is valid
 * @param accessKeyId - id of the current accessKey
 */
function isAccessKeyValid (accessKeyId) {
	return accessKeyId && !isNaN(accessKeyId);
}

/**
 * @name setAccessKey
 * @desc Checking is accessKey id is valid
 * @param accessKeyId - id of the current accessKey
 */
function setUserName (accessKey, call) {

	User.findOne({
		'UserId': accessKey.UserId
	}).exec(function (err, user) {
		if (err || !user) { return call(err || 'user with such id not found'); }

		accessKey.userName = user.UserName;
		call(null, accessKey);
	});
}

/**
 * @name returnAccessKey
 * @desc Checking is accessKey id is valid
 * @param accessKeyId - id of the current accessKey
 * @param call - callback
 */
function returnAccessKey (accessKeyId, call) {

	AccessKey.findOne({
	    'AccessKeyId': accessKeyId
	}).exec(function (err, accesskey) {
		if (err || !accesskey) { return call(err || 'access key not found'); }

	    setUserName(accesskey, function (err, accesskey) {
	    	if (err) { return call(err); }

	     	call(null, accesskey);
	    });
	});
}
