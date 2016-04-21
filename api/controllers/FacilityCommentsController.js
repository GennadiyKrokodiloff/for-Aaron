module.exports = {
	'createComment' 	 : createComment,
	'getFacilityComments': getFacilityComments,
	'getUserComments'	 : getUserComments,
	'getComment' 		 : getComment,
	'updateComment' 	 : updateComment,
	'deleteComment'	     : deleteComment
};

/**
 * @type POST
 * @name createComment
 * @desc Creating of the facility comment
 * @param req - request object
 * 		  res - response object
 */
function createComment(req, res) {
	var facilityId     = req.body.facilityId,
		isAnonymous    = req.body.anonymous,
		comment 	   = req.body.comment,
		commentCreator = req.user,
		data;

	if (!facilityId || !comment) {
		return res.sendError({ 'message': 'Invalid credentials' });
	};

	data = {
		'FacilityId': facilityId,
		'UserId'    : commentCreator.UserId,
		'Anonymous' : isAnonymous,
		'Comment'	: comment
	};

	FacilityCommentsService.createFacilityComment(data, commentCreator, function (err, facilityComment) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message' : err }); }

			return res.sendError({ 'message' : 'there is some error', 'err': err });
		}

		res.success(facilityComment);
	});
}

/**
 * @type GET
 * @name getFacilityComments
 * @desc Getting of the facility comments
 * @param req - request object
 * 		  res - response object
 */
function getFacilityComments(req, res) {
	var facilityId = req.query.facilityId,
		params     = _.pick(req.query, ['offset', 'perpage']),
		settings;

	if (!facilityId) {
		return res.sendError({ 'message' : 'Invalid facility ID' });
	}

	settings = CommonUtils.getSearchConfig(params, {
		'FacilityId': facilityId,
		'sort' 		: {
			'DatePosted': 0
		}
	});

	FacilityCommentsService.getFacilityComments(settings, function (err, commentsInfo) {
		if (err) {
			if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

			return res.sendError({ 'message':'Some error', 'err': err });
		}

		res.success(commentsInfo);
	});
}

/**
 * @type GET
 * @name getUserComments
 * @desc Getting of the facility comments by current user
 * @param req - request object
 * 		  res - response object
 */
function getUserComments(req, res) {
	var userId = (req.user && req.user.UserId) || 1;

	FacilityComment.find({
		'UserId': userId
	}).sort('DatePosted DESC')
    .exec(function (err, comments) {
		if (err) { return res.sendError({ 'message':'Some DB error', 'err': err }); }

		res.success( CommonUtils.setDeleteStatus(comments) );
	});
}

/**
 * @type GET
 * @name getComment
 * @desc Getting of the current facility comment
 * @param req - request object
 * 		  res - response object
 */
function getComment(req, res) {
	var commentId = req.query.facilityCommentId;

	if (!commentId) {
		return res.sendError({ 'message':'Comment id is invalid' });
	}

	FacilityComment.find(commentId).exec(function (err, comments) {
		if (err || !comments.length) {
			return res.sendError({
				'message':'there is some error',
				'err': err || 'comment not found'
			});
		}

		res.success( CommonUtils.setDeleteStatus(comments) );
	});
}

/**
 * @type PUT
 * @name updateComment
 * @desc Updating of the current comment
 * @param req - request object
 * 		  res - response object
 */
function updateComment(req, res) {
	var commentId = req.body.facilityCommentId,
		comment   = req.body.comment;

	if (!commentId || !comment) {
		return res.sendError({ 'message' : 'Incorrect credentials' });
	}

	FacilityCommentsService.updateFacilComment(commentId, comment, function (err, updatedComment) {

		if ( err && _.isString(err) ) {
			return res.sendError({ 'message' : err });
		} else if (err) {
			return res.sendError({ 'message': 'there is some error', 'err': err });
		}

		res.success(updatedComment);
	});
}

/**
 * @type PUT
 * @name deleteComment
 * @desc Deleting of the comment
 * @param req - request object
 * 		  res - response object
 */
 function deleteComment(req, res) {
 	var commentId = req.body.facilityCommentId;

 	if (!commentId) {
 		res.sendError({ 'message':'Comment id not found in request' });
 	}

 	FacilityCommentsService.deleteComment(commentId, req.user, function (err, deletedComment) {

		if ( err && _.isString(err) ) {
			return res.sendError({ 'message' : err });
		} else if (err) {
			return res.sendError({ 'message': 'there is some error', 'err': err });
		}

		res.success(deletedComment);
 	});
}
