module.exports = {
	isStatusAllowable : isStatusAllowable,
	setUserStatus	  : setUserStatus,
	changeUserStatus  : changeUserStatus,
	createNotification: createNotification
};

/**
 * @name isStatusAllowable
 * @desc Checking is param allowable for user status request
 * @param modelName - name of the getting model
 */
function isStatusAllowable(status) {
	return (status === 'active') || (status === 'inactive') || (status === 'deleted');
}

/**
 * @name setUserStatus
 * @desc Setting of the user status
 * @param status - new status
 * 		  user   - user state whom changed
 * 		  admin  - user who change status
 *        call   - callback function
 */
function setUserStatus(status, user, admin, call) {
	var statusMessage;

	user.Status = status;

	switch (status) {
    	case 'active': {
			statusMessage		 = 'active'
			user.ActivatedByUser = admin.UserId;

			return createNotification(admin, user, function (err, notification) {
				if (err) { return call(err); }

				user.save(function (err, savedUser) {
					if (err) { return call(err); }

					call(null, statusMessage);
				});
			});
		}
    	case 'inactive': {
			statusMessage = 'inactivated';
      		break;
		}
		case 'deleted': {
			statusMessage = 'deleted';
      		break;
		}
	}

	user.save(function (err, savedUser) {
		if (err) { return call(err); }

		call(null, statusMessage);
	});
}

/**
 * @name changeUserStatus
 * @desc Checking is param allowable for user status request
 * @param user - to which need to change status
 * 		  role - to which role we need to change status
 * 		  call - callback function
 */
function changeUserStatus(user, admin, newRole, call) {
	var prevRole = user.UserType,
		isNeedDeletePermissions;

	user.UserType = newRole;
	user.save(function (err, savedUser) {
		if (err) { return call(err); }

		if ( isNeedToChangePermissions(prevRole, newRole) ) {

			if (newRole === 'sub-admin') {
				isNeedDeletePermissions = false;
			} else {
				isNeedDeletePermissions = true;
			}

			changePermissions(isNeedDeletePermissions, admin, user, call);
		} else {
			call(null, savedUser);
		}
	});
}

/**
 * @name changePermissions
 * @desc Checking is it need delete or add permissions, called when user type was chnaged 
 * @param isNeedDelete - boolean variable can be equal true or false (if is false then we must add permissions)
 * 		  call   	   - callback function
 */
function changePermissions(isNeedDelete, admin, user, call) {

	if (isNeedDelete) {
		deletePermissions(user, call);
	} else {
		addPermissions(user, admin, call);
	}
}

/**
 * @name deletePermissions
 * @desc Deleting permissions from the user permission table, for curr user 
 * @param user 		  - user whose user type was changed
 * 		  call        - callback function
 */
function deletePermissions(user, call) {
	UserPermission.destroy({
		'UserId': user.UserId
	}).exec(function (err, deletedPermissions) {
		if (err) { return call(err); }

		call(null, deletedPermissions);
	});
}

/**
 * @name addPermissions
 * @desc Add permissions to the user permissions table, for curr user 
 * @param user 		  - user whose user type was changed
 * 		  call        - callback function
 */
function addPermissions(user, admin, call) {

	async.auto({
		permissionsGroup: function (next) {
			PermissionGroup.find(null).exec(next);
		},
		permissions: ['permissionsGroup', function (next, data) {
			var permissGroupsIDsList = _.pluck(data.permissionsGroup, 'PermissionGroupId');

			Permission.find({
				'PermissionGroupId': permissGroupsIDsList
			}).exec(next);
		}],
		createUserPermissions: ['permissions', function (next, data) {
			var newUserPermissList = generateNewPermissions(data.permissions, user, admin);

			UserPermission.create(newUserPermissList).exec(next);
		}]
	}, function (err, data) {
		if (err) { return call(err); }

		call(null, data.createUserPermissions);
	});

}

/**
 * @name generateNewPermissions
 * @desc Generating of the new permissons for new sub admin
 * @param permissions - list of all permissions
 */
function generateNewPermissions(permissions, user, admin) {
	var newPermissionsArr = [];

	_.each(permissions, function (permission) {
		newPermissionsArr.push({
			'PermissionId'	  : permission.PermissionId,
			'UserId'	  	  : user.UserId,
			'Allowed'	  	  : false,
			'LastChanged' 	  : new Date(),
			'AddedByUser' 	  : admin.UserId,
			'LastChangeByUser': new Date()
		});
	});

	return newPermissionsArr;
}

/**
 * @name isNeedToChangePermissions
 * @desc Checking is it need to change the permissions in PermissGroup
 * 		 (making only if it was changed from user to sub-admin or from admin to sub-admin)
 * @param prevRole - current role of the user
 * 		  newRole  - new role to which need change user role
 */
function isNeedToChangePermissions(prevRole, newRole) {

	if ( (prevRole === 'user') && (newRole === 'admin') ) {
		return false;
	}

	return true;
}

/**
 * @name createNotification
 * @desc Creating notifiction after changing of user status
 * @param admin - user who change status and create notfification
 * 		  user  - user for whom it was meant
 *	      call  - callback function
 */
function createNotification(admin, user, call) {
	Notifications.create({
		'Sender': admin.UserId,
		'UserId': user.UserId,
		'HasObject': false
	}).exec(call);
}