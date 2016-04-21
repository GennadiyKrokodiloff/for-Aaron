module.exports = {
	'createDonationComment'	 : createDonationComment,
	'getDonComments'	   	 : getDonComments,
	'getUserDonationComments': getUserDonationComments,
	'getDonCommentInfo'		 : getDonCommentInfo,
	'updateDonComment'		 : updateDonComment,
	'deleteDonComment'		 : deleteDonComment
};

/**
 * @type POST
 * @name createLetter
 * @desc Creating of the donation comment
 * @param req - request object
 * 		  res - response object
 */
function createDonationComment(req, res) {
	var params = _.pick(req.body, ['donationId', 'comment', 'anonymous']);

	if ( !params.donationId || !params.comment ) {
		if (!params.donationId) { return res.sendError({ 'message': 'You did not specify donation id' }); }

		return res.sendError({ 'message': 'You did not specify comment string' });
	}

	DonationCommentService.createDonComment(params, req.user, function (err, newDonComment) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(newDonComment);
	});

}

/**
 * @type GET
 * @name getDonComments
 * @desc Getting of the donation comments by donation Id
 * @param req - request object
 * 		  res - response object
 */
function getDonComments(req, res) {
	var params = _.pick(req.query, ['donationId', 'offset', 'perpage']);

	if ( !params.donationId ) {
		return res.sendError({ 'message': 'You did not specify donation id' });
	}

	DonationCommentService.getComments(params, function (err, comments) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(comments);
	});

}

/**
 * @type GET
 * @name getUserDonationComments
 * @desc Getting of the donation comments by user who make request
 * @param req - request object
 * 		  res - response object
 */
function getUserDonationComments(req, res) {
	var params = _.pick(req.query, ['offset', 'perpage']);

	DonationCommentService.getUserComments(params, req.user, function (err, comments) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(comments);
	});

}

/**
 * @type GET
 * @name getDonCommentInfo
 * @desc Getting of the donation comment full info
 * @param req - request object
 * 		  res - response object
 */
function getDonCommentInfo(req, res) {
	var donCommentId = req.query.donationCommentId;

	if ( !donCommentId ) {
		return res.sendError({ 'message': 'You did not specify id of donation comment' });
	}

	DonationCommentService.getCommentInfo(donCommentId, function (err, comment) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(comment);
	});

}

/**
 * @type PUT
 * @name updateDonComment
 * @desc Updating of the donation comment
 * @param req - request object
 * 		  res - response object
 */
function updateDonComment(req, res) {
	var params = _.pick(req.body, ['donationCommentId', 'comment']);

	if ( !params.donationCommentId || !params.comment ) {
		if (!params.comment) {
			return res.sendError({ 'message': 'You did not specify of comment' });
		}

		return res.sendError({ 'message': 'You did not specify id of donation comment' });
	}

	DonationCommentService.updateComment(params, req.user, function (err, updatedComment) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(updatedComment);
	});

}

/**
 * @type DELETE
 * @name deleteDonComment
 * @desc Deleting of the donation comment
 * @param req - request object
 * 		  res - response object
 */
function deleteDonComment(req, res) {
	var donationCommentId = req.body.donationCommentId;

	if ( !donationCommentId ) {
		return res.sendError({ 'message': 'You did not specify id of donation comment' });
	}

	DonationCommentService.deleteComment(donationCommentId, req.user, function (err, deletedComment) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message': 'some err', 'err': err });
		}

		res.success(deletedComment);
	});

}
