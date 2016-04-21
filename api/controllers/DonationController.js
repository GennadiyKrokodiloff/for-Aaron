module.exports = {
	'getDonations'   : getDonations,
	'getDonation'    : getDonation,
	'createDonation' : createDonation,
	'getAllDonations': getAllDonations
};

/**
 * @type GET
 * @name getDonations
 * @desc Getting list of the donations
 * @param req - request object
 * 		  res - response object
 */
function getDonations(req, res) {
	var params = _.pick(req.query, ['userId', 'offset', 'perpage']);

	DonationService.getDonationsList(params, req.user, req.isAdmin, function (err, donationsInfo) {
		if (err) {
			if ( _.isString(err) ) { 
				return res.sendError({ 'message': err }); 
			}

			return res.sendError({ 'message': 'some error', 'err': err });
		}

		res.success(donationsInfo);
	});
}

/**
 * @type GET
 * @name getDonation
 * @desc Getting list of the donations
 * @param req - request object
 * 		  res - response object
 */
function getDonation(req, res) {
	var donationId = req.query.donationId;

	if (!donationId) {
		return res.sendError({ 'message': 'Donation id is not defined' });
	}

	DonationService.getDonation(donationId, req.user, function (err, donation) {
		if (err) {
			if ( _.isString(err) ) { 
				return res.sendError({ 'message': err }); 
			}

			return res.sendError({ 'message': 'some error', 'err': err });
		}

		res.success(donation);
	});
}

/**
 * @type POST
 * @name createDonation
 * @desc Making of the donation to the Lasurim system
 * @param req - request object
 * 		  res - response object
 */
function createDonation(req, res) {
	var params = _.pick(req.body, ['userPaymentMethodId', 'anonymous', 'amount', 'note']);

	if ( !params.userPaymentMethodId || ( !params.amount || (params.amount <= 0) ) ) {

		if (!params.userPaymentMethodId) {
			return res.sendError({ 'message': 'userPaymentMethodId is not defined' });
		}

		return res.sendError({ 'message': 'Amount of donated is not defined, less or equal 0' });
	}

	DonationService.donateToLasurim(params, req.user, function (err, donationsInfo) {
		if (err) {
			if ( _.isString(err) ) { 
				return res.sendError({ 'message': err }); 
			}

			return res.sendError({ 'message': 'some error', 'err': err });
		}

		res.success(donationsInfo);
	});
}

/**
 * @type GET
 * @name getAllDonations
 * @desc Getting of all donations (for inmate and for lasurim)
 * @param req - request object
 * 		  res - response object
 */
function getAllDonations(req, res) {
	var findObj = null;

	if (!req.isAdmin && !req.isSubAdmin) {
		findObj = {};
		findObj['UserId'] = req.user.UserId;
	}

	CommonUtils.getAllDonations(findObj, function (err, donations) {
		if (err) {
			return res.sendError({
				'message': 'some err',
				'err'	 : err
			});
		}

		res.success(donations);
	});
}