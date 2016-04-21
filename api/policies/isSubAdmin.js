module.exports = function (req, res, next) {

	if (!req.isSubAdmin && req.isUser) {
		return res.sendError({
			'message' : 'Permission denied, have no rights to perform this action'
		});
	}

	next();
};