var request 	   = require('request');
	modelPath      = './../models/',
	defaultOffset  = 0,
	defaultPerpage = 20;

module.exports = {
	'getModel' 		      : getModel,
	'getModelAttributes'  : getModelAttributes,
	'isIdValid'		      : isIdValid,
	'isParamsValid'       : isParamsValid,
	'isReqFieldsPresents' : isReqFieldsPresents,
	'isReqFieldsPresents_': isReqFieldsPresents_,
	'getDBRecords' 	      : getDBRecords,
	'getSearchConfig'	  : getSearchConfig,
	'getNamesFromComment' : getNamesFromComment,
	'getFindCriterias' 	  : getFindCriterias,
	'createNotifications' : createNotifications,
	'setDeleteStatus'     : setDeleteStatus,
	'setUserNames' 		  : setUserNames,
	'setUserName' 		  : setUserName,
	'removeAllSpecSymbols': removeAllSpecSymbols,
	'generateObj'		  : generateObj,
	'getRecsAmount'       : getRecsAmount,
	'setUserInfo'		  : setUserInfo,
	'removeEmpty' 		  : removeEmpty,
	'setRecordsInfo'      : setRecordsInfo,
	'generateUserNames'   : generateUserNames,
	'setFileName'         : setFileName,
	'makeRequest'		  : makeRequest,
	'setRelations'		  : setRelations,
	'getCommonAmount'     : getCommonAmount,
	'getAllDonations'	  : getAllDonations,
	'default'		    : {
		offset : defaultOffset,
		perpage: defaultPerpage
	}
};

/**
 * @name getModel
 * @desc Getting of the model, from model folder
 * @param modelName - name of the getting model
 */
function getModel(modelName) {
	return require(modelPath + modelName);
}

/**
 * @name getModelAttributes
 * @desc Getting attributes of the current model as Array (without functions)
 * @param model - DB model
 */
function getModelAttributes(model) {
	return _.map(model.attributes, function (attribute, key) {
		if ( !_.isFunction(model.attributes[key]) ) {
			return key;
		}
	});
}

/**
 * @name isIdValid
 * @desc Checking is transfering if is valid
 * @param id - id of some model
 */
function isIdValid(id) {
	return !isNaN(+id);
}

/**
 * @name isParamsValid
 * @desc Checking is all params valid (none of them must not be equal undefined)
 * @param params - required fiedls
 */
function isParamsValid(params, canBeEmpty) {

	if ( !canBeEmpty && _.isEmpty(params) ) {
		return false;
	}

	for (var key in params) {
		if ( params.hasOwnProperty(key) && _.isUndefined(params[key]) ) {
			return false;
		}
	}

	return true;
}

/**
 * @name isReqFieldsPresents
 * @desc Checking is all required fields presents in request body
 * @param requiredFields - arr of required fields
 * 		  comingFields   - object come with request
 */
function isReqFieldsPresents(requiredFields, comingFields) {
	return requiredFields.length === comingFields.length;
}

function isReqFieldsPresents_(requiredFields, comingFields) {
	var found = true;
	var curFound = false;
	for (var i = 0; i < requiredFields.length; i++) {
		curFound = false;
		for (var j = 0; j < comingFields.length; j++) {
			if(requiredFields[i] === comingFields[j]) {
				curFound = true;
				break;
			}
		};
		if(!curFound) {
			found = false;
			break;
		}
	};
	return found;
}

/**
 * @name getSearchConfig
 * @desc Getting of config for each GET request (offset, perpage, sort ) 
 * @param offset  - from which record need begin searching
 * 		  perpage - how much records needs return
 * 		  sort    - bool type how we need sort response 1 or 0
 *		  query   - object of searching in DB
 */
function getSearchConfig(findSettings, findObj, sortedField) {
	var serachObj 		   = {
			offset 	   : findSettings.offset  || defaultOffset,
			perpage    : findSettings.perpage || defaultPerpage,
			searchQuery: findObj,
			sortQuery  : null
		},
		DEFAULT_SORT_ORDER = 0;

	if ( (findSettings.sortBy && (findSettings.sortOrder==0 || findSettings.sortOrder==1)) && _.isString(findSettings.sortBy) ) {
		serachObj.searchQuery.sort = {};
		serachObj.searchQuery.sort[findSettings.sortBy] = parseInt(findSettings.sortOrder) || DEFAULT_SORT_ORDER;
	} else {
		delete findSettings.sortBy;
		delete findSettings.sortOrder;
	}

	if ( sortedField && _.isString(sortedField) ) {
		serachObj.sortQuery = {};
		serachObj.sortQuery[sortedField] = parseInt(findSettings.sort) || 1;
	}

	return serachObj;
}

/**
 * @name getDBRecords
 * @desc Getting records from DB, function called in all get requests
 * @param DBmodel  - collection in DB, in which will be makeing searching
 * 		  settings - settings object consist of perpage, offset and sort
 * 		  call     - function which will be called after searching
 */
function getDBRecords(DBmodel, settings, call) {

	DBmodel
		.find(settings.searchQuery)
		.skip(settings.offset)
		.limit(settings.perpage)
		.sort(settings.sortQuery)
		.exec(call);
}

/**
 * @name getFindCriterias
 * @desc Gettting of object, by which will be making searching from DB
 * @param incomeParams - params that come with request, can conataine a lot of variouse variables
 * 		  reqParams    - required params, params that we need to get from incomeParams
 * 
 */
function getFindCriterias(incomeParams, reqParams) {
	return _.omit( _.pick(incomeParams, reqParams), _.isUndefined );
}

/**
 * @name getNamesFromComments
 * @desc function will find @ - symbol and take text after @ till white space, it will be user name
 * @param comment - string with comment
 */
function getNamesFromComment(comment) {
	return comment.match(/(^|[^@\w])@.*?\s/ig) || [];
}


 /**
 * @name getRecsAmount
 * @desc Getting amount of some records, called when user need request with counting something
 * @param Model 	   - in which table we need to count records
 * 		  searchString - if for counting need some specific params (object, null, id number)
 * 		  call 		   - callback function
 */
function getRecsAmount(Model, searchString, call) {
	Model.count(searchString).exec(call);
}

/**
 * @name createNotifications
 * @desc Creating of the new notifications for with comments
 * @param names   		 - object with data about new comment
 * 		  createdComment - created comment
 * 		  commentCreator - user who create comment
 * 		  notificData	 - object consist from idField and object - fields
 * 		  call    		 - callback function
 */
function createNotifications(names, createdComment, commentCreator, notificData, call) {

	async.waterfall([function (next) {
		next( null, generNotificComments(names, createdComment.Comment) );
	}, function (notifComments, next) {
		var usersNames = _.unique( _.keys(notifComments, 'userName') );

		User.find({
			'UserName': usersNames
		}).exec(function (err, users) {
			next(err, {
				'users': users,
				// 'notifComments': notifComments
			});
		});
	}, function (data, next) {
		var users = data.users, 
			comment;

		if (!users.length) { return next(null, []); }

		async.map(users, function (user, nextCall) {
			// comment = data.notifComments[user.UserName].comment;

			nextCall(null, {
				'Sender'   : commentCreator.UserId,
				'UserId'   : user.UserId,
				'HasObject': true,
				'Object'   : notificData.object,
				'ObjectId' : createdComment[notificData.idField]
			});
		}, function (err, notificationsArr) {
			if (err) { console.log('Some error in create notifications', err); }

			Notifications.create(notificationsArr).exec(next);
		});
	}], call);
}

/**
 * @name generNotificComments
 * @desc Generating of the notifications comments instaed of array users now we will have 
 * 		 array of objects where userName - 
 * @param names   - object with data about new comment
 * 		  comment - new created comment
 */
function generNotificComments(names, comment) {
	var notifComments = {};

	names.forEach(function (name, index) {
		var commentBegin = comment.indexOf(name) + name.length, 
			commentEnd   = comment.indexOf(names[index + 1]),
			userName 	 = removeAllSpecSymbols(name);

		notifComments[userName] = {
			'comment' : getUserComment(commentBegin, commentEnd, comment)
		};

		comment = comment.slice(commentEnd);
	});

	return notifComments;
}

/**
 * @name getUserComment
 * @desc Getting of the comment by curr user name, from comment facility string
 * @param commentBegin - beginign of the comment
 * 		  commentEnd - ending of the comment
 * 		  comment - new created comment
 */
function getUserComment(commentBegin, commentEnd, comment) {
	return comment.slice(commentBegin, commentEnd).trim();
}

/**
 * @name setDeleteStatus
 * @desc Setting of the delete status if comment was deleted
 * @param comments - array of comments
 */
function setDeleteStatus(comments, deletedComment) {
	return _.map(comments, function (comment) {

		if (comment.Deleted) {
			comment.Comment = deletedComment || 'Comment was deleted by admin';
		}

		return comment;
	});
}

 /**
 * @name setUserNames
 * @desc Settign of the user name for each comment
 * @param comments - array of comments for curr inmate
 * 		  call 	   - callback function
 */
 function setUserNames(comments, call) {
	var usersIDs 		 = _.pluck(comments, 'UserId'),
		grouopedComments = _.groupBy(comments, 'UserId');;

	async.waterfall([function (next) {
		User.find(usersIDs).exec(next);
	}, function (users, next) {

		_.each(users, function (user) {
			setUserInfo(user, grouopedComments[user.UserId]);
		});
		next(null, comments);
	}], call);
 }

 /**
 * @name setUserName
 * @desc Setting name of the user, when getting one record from DB
 * @param user   - user who make request
 * 		  record - record from for which need to set username
 */
function setUserName(user, record) {

	if (!record.Anonymous) {
		record.userName = user.UserName;
	} else {
		record.userName = 'anonymous';
	}

	return record;
}

 /**
 * @name setUserInfo
 * @desc Setting of the user info for curr records
 * @param user    - user who make request
 * 		  records - records from which we need to take user info
 */
function setUserInfo(user, records) {

	_.each(records, function (record) {
		setUserName(user, record);
	});
}

 /**
 * @name removeAllSpecSymbols
 * @desc Remove all spec symbols from string
 * @param string - some string with text
 */
function removeAllSpecSymbols(string) {
	return string.replace(/[^a-zA-ZА-Яа-я0-9]/ig, '');
}

 /**
 * @name generateObj
 * @desc Generating of the new object
 * @param key   - key of new object
 * 		  value - value that can be getted by key
 */
function generateObj(key, value) {
	var newObj = {};

	newObj[key] = value;
	return newObj;
}

 /**
 * @name removeEmpty
 * @desc Removing from object all values that are undefined or empty string
 * @param obj - object from which need to remove all not valid values
 */
function removeEmpty(obj) {
	return _.omit(obj, function (val) {		
		return _.isUndefined(val) || _.isNaN(val) || ( _.isString(val) && _.isEmpty(val.trim()) ); 
	});
}

/*
 * @name setRecordsInfo
 * @desc Settings some specific info to array of records
 * @param records      	  - records to which need to set info
 * 		  groupedField 	  - by whitc field records was grouped
 * 		  fieldName    	  - name of the field to which inforamtion will be added
 * 		  params  	   	  - params which need to get from finded records from DB
 * 		  allowAnonymous  - does app need to check is user anonymous
 */
function setRecordsInfo(records, groupedRecords, groupedField, fieldName, params, allowAnonymous) {
	var groupedFieldName = '';

	_.each(records, function (record) {
		groupedFieldName = record[groupedField];

		setGroupedRecordsInfo(groupedRecords[groupedFieldName], record, fieldName, params, allowAnonymous);
	});
}

/**
 * @name setGroupedRecordsInfo
 * @desc Setting of some info to list of grouped records
 * @param records        - records to which nedd to add some info
 *		  fieldName      - field By whitch need to find records from grouped object
 * 		  params  	  	 - params which need to get from finded records from DB
 *		  allowAnonymous - does app need to check is user anonymous 
 */
function setGroupedRecordsInfo(groupedRecords, record, fieldName, params, allowAnonymous) {

	_.each(groupedRecords, function (groupedRecord) {

		if (allowAnonymous && groupedRecord.Anonymous) {
			return groupedRecord[fieldName] = 'anonymous';
		}
		
		groupedRecord[fieldName] = _.pick(record, params);
	});
}

/**
 * @name generateUserNames
 * @desc Setting of the user name for records array
 * @param records - records to which nedd to add user name
 * 		  params  - params that need to be taken from the user
 */
function generateUserNames(records, params) {

	_.each(records, function (record) {

		if (record.Anonymous) {
			record.user = 'anonymous';
		} else {

			if (params) {
				record.user = _.pick(record.UserId, params);
			} else {
				record.user = record.UserId;
			}
			
		}

		delete record.UserId;
	});
}

/**
 * @name setFileName
 * @desc Setting of the file name, file name is taken from URL
 * @param file - current file
 */
function setFileName(file) {
	file['fileName'] = file.Url.split('/').pop();
}

/**
 * @name makeRequest
 * @desc Making of the request to payment system
 * @param reqObj - request object
 * 		  call   - callback that fired after getting response from the server
 */
function makeRequest(reqObj, call) {
	request({ 
		'method'   : 'POST',
		'url'      : sails.config.cardknoxSetting.uri,
		'ciphers'  : 'RC4-MD5:RC4-SHA',	
		'formData' : reqObj
	}, function (err, res, data) {
		data = parseUrlEncoded_(data);

		if (err || !data.xToken) { 
			return call(err || data.xError || data); 
		}

		call(null, data);
	});
}

/** 
 * @name parseUrlEncoded_
 * @desc Parsing of the string, that come from payment server
 * @param expDate - expiriation date
 */
function parseUrlEncoded_(str) {
	var resObj = {},
		params = str.split('&');

	_.each(params, function (val) {
		var param = val.split('=');

		resObj[param[0]] = param[1];
	});

	return resObj;
}

/** 
 * @name setRelations
 * @desc Setting of the relations betweens two records (when two records have two links on each others)
 * @param donateObj   - object to which was maded donation (it can be personal request, lasurim or inmate)
 * 		  transaction - created transaction (transaction create when when user make some donation)
 * 		  donateId    - id of the donated object which must be taken and saved in transaction
 * 		  call        - callback function
 */
function setRelations(donateObj, transaction, donateId, call) {

	async.parallel({
		setTransactionId: function (next) {
			transaction.ObjectId = donateObj[donateId] || donateObj.id;

			if (transaction.id) {
				transaction.UserTransactionId = transaction.id;
			}
			
			transaction.save(next);
		},
		setDonateObjId: function (next) {
			donateObj.UserTransactionId = transaction.UserTransactionId || transaction.id;
			
			if (donateObj.id) {
				donateObj[donateId] = donateObj.id;
			}
			
			donateObj.save(next);
		}
	}, call);
}

/** 
 * @name getCommonAmount
 * @desc Getting common amount of records from DB
 * @param DBModel - table or collection from which need to find records
 * 		  findObj - finding query
 * 		  call    - callback function
 */
function getCommonAmount(DBModel, findObj, call) {
	DBModel.count(findObj).exec(call);
}

/**
 * @name getAllDonations
 * @desc Getting of all donations from DB for curr user or for admin
 * @param 
 */
function getAllDonations(findObj, call) {
	async.parallel({
		inmateDonations: function (next) {
			InmateDonation.find(findObj).exec(next);
		},
		donations: function (next) {
			Donation.find(findObj).exec(next);
		}
	}, call);
}