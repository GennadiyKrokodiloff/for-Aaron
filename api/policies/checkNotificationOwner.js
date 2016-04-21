module.exports = function (req, res, next) {
	var notificationId = req.query.notificationId || req.body.notificationId,
		user           = req.user;

	if (!notificationId) {
		return res.sendError({
			'message': 'Invalid notification id'
		});
	}

	async.parallel({
		notification: function (call) {
			Notifications.findOne(notificationId).exec(function (err, notification) {
				if (err || !notification) { 
					return call(err || 'notification not found');
				}

				call(null, notification);
			});
		}
	}, function CheckNotification (err, data) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({
				'message': 'some error',
				'err'	 : err
			});
		}

		if (user.UserId === data.notification.UserId) {
			next();
		} else {
			res.sendError({
				'message': 'User id of notification and id of the user who send request is not equal'
			});
		}
	});

}