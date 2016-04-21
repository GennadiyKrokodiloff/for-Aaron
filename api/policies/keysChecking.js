module.exports = function (req, res, next) {
	var time = new Date();

	resetDay(time);
	AccessKey.update({
		'Role'       : req.role,
		'UserId'     : req.user.UserId,
		'DateCreated': {
			'<': time
		}
	}, {
		'Active': false
	}).exec(function (err, accessKeys) {
		if (err) { 
			return res.sendError({
				'message': 'error while access keys checking', 
				'err' 	 : err 
			}); 
		}

		if (accessKeys.length) { console.log('Keys was deactivated', accessKeys); }
		next(null);
	});
}

/** 
 * @name resetDay
 * @desc Reseting of the current time to o - hours, 0 - minutes, 0 - seconds
 * @param time - curr time when was maded request
 */
function resetDay(time) {
	time.setHours(0);
	time.setMinutes(0);
	time.setSeconds(0);
}