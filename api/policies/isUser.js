module.exports = function (req, res, next) {

	if (!req.isUser) {
		console.log('Client is not user');
	}

	next();
};
