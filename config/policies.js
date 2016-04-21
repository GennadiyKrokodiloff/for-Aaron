/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */
var policies    = {},
    userRoles   = {
      admin: 'admin',
      user : 'user'
    },
    setUserRole = function (role) {
      return function (req, res, next) {
        req.role = role;
        next(null);
      };
    };

policies.isNotificationOwner = ['isAuthenticated', 'checkNotificationOwner'];
policies.isAuthenticated     = ['isAuthenticated'];
policies.isAdmin             = ['isAuthenticated', 'isAdmin'];
policies.isSubAdmin          = ['isAuthenticated', 'isSubAdmin'];
policies.isSubAdminOrAdmin   = ['isSubAdminOrAdmin'];

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': policies.isAuthenticated,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/

  UserController: {
    'login'                : [setUserRole(userRoles.user), 'auth', 'keysChecking'],
    'protected'            : policies.isAuthenticated,
    'changePassword'       : ['isAuthenticated', 'isUser'],
    'updateUser'           : ['isAuthenticated', 'isUser'],
    'getUserNames'         : policies.isAdmin,
    'getAllUserPermissions': policies.isAdmin,
    'adminChangePassword'  : policies.isAdmin,
    'emailValidate'        : true,
    'validateConfirmation' : true,
    'register'             : true,
    'forgotPassword'       : true,
    'emailAddress'         : true
  },

  AdminController: {
    'adminLogin' : [setUserRole(userRoles.admin), 'auth', 'keysChecking'],
    '*'          : policies.isAdmin
  },

  UserValidationFormController: {
    'validationForm' : policies.isAdmin,
    'status'         : policies.isAdmin,
    'createValidationForm' : true
  },

  UserMessageController: {
    '*'                 : policies.isAdmin,
    'getAllChats'       : policies.isAdmin,
    'createChat'        : policies.isAuthenticated,
    'getAllUserMessages': policies.isAuthenticated
  },


  NotificationController: {
    'getNotification'       : policies.isNotificationOwner,
    'updateUserNotification': policies.isNotificationOwner,
    'deleteNotification'    : policies.isNotificationOwner,
    'createNotification'    : policies.isAdmin
  },

  InmateController: {
    '*'               : policies.isAdmin,
    'getActiveInmates': policies.isAuthenticated,
    'getInmate'       : policies.isAuthenticated,
    'getSearchDetails': policies.isAuthenticated,
    'getInmateNames'  : policies.isAuthenticated
  },

  InmateProfilePostController: {
    '*'                                 : policies.isAdmin,
    'userGetProfilePost'                : policies.isAuthenticated,
    'getAllInmatesProfilePosts'         : policies.isAuthenticated,
    'getProfilePostById'                : policies.isAuthenticated,
  },

  FacilityController: {
    'createFacility'              : policies.isAdmin,
    'updateFacilityFullName'      : policies.isAdmin,
    'updateFacilityFacilityType'  : policies.isAdmin,
    'updateFacilityStreatNumber'  : policies.isAdmin,
    'updateFacilityAddress'       : policies.isAdmin,
    'updateFacilityAddress2'      : policies.isAdmin,
    'updateFacilityCity'          : policies.isAdmin,
    'updateFacilityState'         : policies.isAdmin,
    'updateFacilityStatus'        : policies.isAdmin,
    'updateFacilityZIP'           : policies.isAdmin,
    'updateFacilityNote'          : policies.isAdmin,

  },

  UserPermissionController: {
    '*': policies.isAdmin
  },

  FacilityCustomFieldController: {
    'createFacilityCustomField': policies.isAdmin,
    'updateFacilityCustomField': policies.isAdmin,
    'deleteFacilityCustomField': policies.isAdmin
  },

  InmateCommentsController : {
    'deleteComment'       : policies.isAdmin,
  },

  FacilityCommentsController : {
    'deleteComment': policies.isAdmin
  },

  LetterController: {
    'processingLetter': policies.isAdmin,
    'sentLetter'      : policies.isAdmin,
    'getLetters'      : policies.isAdmin,
    'updateStatus'    : policies.isAdmin,
  },


  VisitationRequestController : {
    'createVisitationRequest': policies.isAdmin,
    'deleteVisitaionRequest' : policies.isAdmin
  },

  PermissionGroupController: {
    '*' : policies.isAdmin,
  },

  VisitationRequestCommentController: {
    'deleteVRComment': policies.isAdmin
  },

  ScheduledVisitationCommentController: {
    'deleteSVComment': policies.isAdmin
  },

  RideCommentController: {
    'deleteRideComment': policies.isAdmin
  },

  PersonalRequestCommentController: {
    'deleteComment': policies.isAdmin
  },

  DonationCommentController: {
    'deleteDonComment': policies.isAdmin
  },

  PersonalRequestController: {
    'createPersRequest'    : policies.isAdmin,
    'updatePersonalRequest': policies.isAdmin,
    'deletePersonalRequest': policies.isAdmin
  },

  HomeController: {
      'show_home': true
  }

	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
