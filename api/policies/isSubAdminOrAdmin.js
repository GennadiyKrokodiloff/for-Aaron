module.exports = function (req, res, next) {

	if (!req.isSubAdmin || !req.isAdmin) {
		return res.sendError({
			'message' : 'Permission denied, have no rights to perform this action'
		});
	}

	next();
};