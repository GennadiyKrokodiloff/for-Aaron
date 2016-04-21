/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': {
  //  view: 'homepage'
  //},

  'GET /'                    : 'HomeController.show_home',

  'POST /user/register'      : 'UserController.register',
  'POST /user/login'         : 'UserController.login',
  'POST /admin/login'        : 'AdminController.adminLogin',

  'GET /user'                : 'UserController.getUser',
  'GET /user/accesskeys'     : 'UserController.getAllUserAccessKeys',
  'GET /emailvalidate'       : 'UserController.emailValidate',
  'GET /user/validateconfirm': 'UserController.validateConfirmation',
  'GET /user/dashboard'      : 'UserController.getUserInfo',
  'GET /user/dashboard/visits' : 'UserController.getUserVisits',
  'GET /user/dashboard/contributions' : 'UserController.getUserContributions',
  'GET /user/dashboard/rides' : 'UserController.getUserRides',

  'POST /user/emailaddress'  : 'UserController.emailAddress',
  'POST /user/changepassword': 'UserController.userChangePassword',
  'PUT /user/changepassword' : 'UserController.adminChangePassword',
  'PUT /user'                : 'UserController.updateUser',
  'POST /user/forgotpassword': 'UserController.forgotPassword',
  'GET user/search'          : 'UserController.getFilteredUsers',
  'GET /user/userpermissions': 'UserController.getAllUserPermissions',
  'GET /user/protected'      : 'UserController.protected',
  'GET /user/find'           : 'UserController.find',
  'DELETE /user'             : 'UserController.deleteUser',
  'GET /users'               : 'UserController.getFilteredUsers',
  'GET /users/names'         : 'UserController.getUserNames',

  'GET /user/usermessages' : 'UserMessageController.getAllUserMessages',
  'GET /user/userchats'    : 'UserMessageController.getAllUserChats',
  'GET /usermessages'      : 'UserMessageController.getNotViewed',
  'POST /user/usermessage' : 'UserMessageController.createChat',
  'DELETE /usermessage'    : 'UserMessageController.deleteUserMessage',

  'PUT /user/type'        : 'AdminController.changeUserType',
  'PUT /user/status'      : 'AdminController.changeStatus',
  'PUT /user/requestform' : 'AdminController.requestForm',

  'GET /uservalidationform'       : 'UserValidationFormController.validationForm',
  'PUT /uservalidationform/status': 'UserValidationFormController.status',
  'POST /user/validationform'     : 'UserValidationFormController.createValidationForm',


  'POST /accesskey/validate': 'AccessKeyController.validate',
  'GET /accesskey'          : 'AccessKeyController.getAccessKey',
  'POST /accesskey'         : 'AccessKeyController.find',
  'PUT /accesskey'          : 'AccessKeyController.deactivateKey',
  'DELETE /accesskey'       : 'AccessKeyController.deleteKey',

  'POST /permissiongroup'           : 'PermissionGroupController.createPermissionGroup',
  'GET /permissiongroups'           : 'PermissionGroupController.getPermissionGroups',
  'PUT /permissiongroup'            : 'PermissionGroupController.updatePermissGroup',
  'DELETE /permissiongroup'         : 'PermissionGroupController.deletePermissGroup',
  'GET /permissiongroup/permissions': 'PermissionGroupController.getPermissions',

  'GET /permission'   : 'PermissionController.getPermission',
  'POST /permission'  : 'PermissionController.createPermission',
  'PUT /permission'   : 'PermissionController.updatePermission',
  'DELETE /permission': 'PermissionController.deletePermission',

  'GET /userpermission' : 'UserPermissionController.getUserPermission',
  'PUT /userpermission' : 'UserPermissionController.updateUserPermission',

  'GET /userlocation'         : 'UserLocationController.getUserLocation',
  'GET /user/userlocations'   : 'UserLocationController.getUserlocations',
  'PUT /userlocation'         : 'UserLocationController.updateUserLocation',
  'PUT /userlocation/default' : 'UserLocationController.setDefaultUserLocation',
  'POST /user/userlocation'   : 'UserLocationController.createUserLocation',
  'DELETE /userlocation'      : 'UserLocationController.deleteUserLocation',

  'PUT /message/viewed'       : 'MessageController.updateMessage',
  'POST /usermessages/message': 'MessageController.createMessage',
  'GET /message'              : 'MessageController.getMessage',
  'GET /usermessages/messages': 'MessageController.getMessages',
  'DELETE /message'           : 'MessageController.deleteMessage',

  'POST /user/notification'           : 'NotificationController.createNotification',
  'GET /user/usernotifications'       : 'NotificationController.getNotifications',
  'GET /user/usernotifications/status': 'NotificationController.getNotificationsByStatus',
  'GET /usernotification'             : 'NotificationController.getNotification',
  'PUT /usernotification/viewed'      : 'NotificationController.updateUserNotification',
  'DELETE /usernotification'          : 'NotificationController.deleteNotification',

  'POST /inmate'             : 'InmateController.registerInmate',
  'GET /inmates'             : 'InmateController.getInmates',
  'GET /inmates/search'      : 'InmateController.getActiveInmates',
  'GET /inmate/searchdetails': 'InmateController.getSearchDetails',
  'GET /inmate'              : 'InmateController.getInmate',
  'GET /inmate/names'        : 'InmateController.getInmateNames',
  'PUT /inmate'              : 'InmateController.updateInmate',
  'PUT /inmate/status'       : 'InmateController.updateInmateStatus',
  'DELETE /inmate'           : 'InmateController.deleteInmate',

  'POST /inmate/profilepost'   : 'InmateProfilePostController.createInmatePost',
  'DELETE /profilepost'        : 'InmateProfilePostController.deleteInmateProfilePost',
  'PUT /inmateprofilepost'     : 'InmateProfilePostController.updateInmateProfilePost',
  'PUT /profilepost/visibility': 'InmateProfilePostController.updateInmateProfilePostVisibility',
  'GET /inmate/profilepost'    : 'InmateProfilePostController.userGetProfilePost',
  'GET /profileposts'          : 'InmateProfilePostController.getAllInmatesProfilePosts',
  'GET /profilepost'           : 'InmateProfilePostController.getProfilePostById',

  'POST /inmate/comment'    : 'InmateCommentsController.createComment',
  'GET /inmate/comments'    : 'InmateCommentsController.getInmateComment',
  'GET /user/inmatecomments': 'InmateCommentsController.getUserInmateComment',
  'GET /inmatecomment'      : 'InmateCommentsController.getInmateCommentById',
  'PUT /inmatecomment'      : 'InmateCommentsController.updateInmateComment',
  'DELETE /inmatecomment'   : 'InmateCommentsController.deleteComment',

  'POST /facility'        : 'FacilityController.createFacility',
  'GET /facilities'       : 'FacilityController.getFacilities',
  'GET /facility'         : 'FacilityController.getFacilityDetails',
  'DELETE /facility'      : 'FacilityController.deleteFacility',
  'GET /facility/names'   : 'FacilityController.getFacilityNames',
  'GET /facilities/search': 'FacilityController.searchFacilities',
  'GET /facilities/states': 'FacilityController.getFacilityStates',

  'PUT /facility/fullname'    : 'FacilityController.updateFacilityFullName',
  'PUT /facility/Facilitytype': 'FacilityController.updateFacilityFacilityType',
  'PUT /facility/streatnumber': 'FacilityController.updateFacilityStreatNumber',
  'PUT /facility/address'     : 'FacilityController.updateFacilityAddress',
  'PUT /facility/address2'    : 'FacilityController.updateFacilityAddress2',
  'PUT /facility/city'        : 'FacilityController.updateFacilityCity',
  'PUT /facility/state'       : 'FacilityController.updateFacilityState',
  'PUT /facility/status'      : 'FacilityController.updateFacilityStatus',
  'PUT /facility/zip'         : 'FacilityController.updateFacilityZIP',
  'PUT /facility/note'        : 'FacilityController.updateFacilityNote',

  'POST /facility/customfield' : 'FacilityCustomFieldController.createFacilityCustomField',
  'GET /facility/customfields' : 'FacilityCustomFieldController.getFacilityCustomFields',

  'PUT /facilitycustomfield'    : 'FacilityCustomFieldController.updateFacilityCustomField',
  'DELETE /facilitycustomfield' : 'FacilityCustomFieldController.deleteFacilityCustomField',

  'POST /facility/comment'    : 'FacilityCommentsController.createComment',
  'GET /facility/comments'    : 'FacilityCommentsController.getFacilityComments',
  'GET /user/facilitycomments': 'FacilityCommentsController.getUserComments',
  'GET /facilitycomment'      : 'FacilityCommentsController.getComment',
  'PUT /facilitycomment'      : 'FacilityCommentsController.updateComment',
  'DELETE /facilitycomment'   : 'FacilityCommentsController.deleteComment',

  'POST /user/letter'      : 'LetterController.createLetter',
  'POST /letter/submited'  : 'LetterController.submitLetter',
  'POST /letter/processing': 'LetterController.processingLetter',
  'POST /letter/sent'      : 'LetterController.sentLetter',
  'GET /letter'            : 'LetterController.getLetter',
  'GET /letters'           : 'LetterController.getLetters',
  'GET /user/letters'      : 'LetterController.getUserLetters',
  'PUT /letter/status'     : 'LetterController.updateStatus',
  'PUT /letter/saved'      : 'LetterController.setSavedStatus',
  'PUT /letter'            : 'LetterController.updateLetter',
  'DELETE /letter'         : 'LetterController.deleteLetter',

  'POST /letter/textletter': 'TextLetterController.createTextLetter',
  'GET /letter/textletters': 'TextLetterController.getTextLetters',
  'GET /textletter'        : 'TextLetterController.getTextLetter',
  'PUT /textletter'        : 'TextLetterController.updateTextLetter',
  'DELETE /textletter'     : 'TextLetterController.deleteTextLetter',

  'POST /visitationrequest/comment'    : 'VisitationRequestCommentController.createVRComment',
  'GET /visitationrequest/comments'    : 'VisitationRequestCommentController.getVRComments',
  'GET /user/visitationrequestcomments': 'VisitationRequestCommentController.getUserVRComments',
  'GET /visitationrequestcomment'      : 'VisitationRequestCommentController.getVRComment',
  'PUT /visitationrequestcomment'      : 'VisitationRequestCommentController.updateVRComment',
  'DELETE /visitationrequestcomment'   : 'VisitationRequestCommentController.deleteVRComment',

  'POST /scheduledvisitation'       : 'ScheduledVisitationController.createScheduledVisitation',
  'DELETE /scheduledvisitation'     : 'ScheduledVisitationController.deleteScheduldVisitation',
  'PUT /scheduledvisitation'        : 'ScheduledVisitationController.updateScheduledVisitation',
  'PUT /scheduledvisitation/inmate' : 'ScheduledVisitationController.updateScheduledVisitationInmate',
  'PUT /scheduledvisitation/status' : 'ScheduledVisitationController.updateScheduledVisitationStatus',
  'GET /scheduledvisitations'       : 'ScheduledVisitationController.getScheduledVisitaions',
  'GET /scheduledvisitations/basic'       : 'ScheduledVisitationController.getScheduledVisitationBasic',
  'GET /scheduledvisitation'        : 'ScheduledVisitationController.getScheduledVisistationById',
  'GET /user/scheduledvisitations'  : 'ScheduledVisitationController.getUserScheduledVisitations',
  'GET /scheduledvisitation/facility'  : 'ScheduledVisitationController.getScheduledVisitationFacility',

  'POST /scheduledvisitation/comment'    : 'ScheduledVisitationCommentController.createSVComment',
  'GET /scheduledvisitation/comments'    : 'ScheduledVisitationCommentController.getSVComments',
  'GET /user/scheduledvisitationcomments': 'ScheduledVisitationCommentController.getUserSVComments',
  'GET /scheduledvisitationcomment'      : 'ScheduledVisitationCommentController.getSVComment',
  'PUT /scheduledvisitationcomment'      : 'ScheduledVisitationCommentController.updateSVComment',
  'DELETE /scheduledvisitationcomment'   : 'ScheduledVisitationCommentController.deleteSVComment',

  'POST /letter/fileletter/:letterId' : 'FileLetterController.createFileLetter',
  'GET /letter/fileletters'           : 'FileLetterController.getFileLetters',
  'GET /fileletter'                   : 'FileLetterController.getFileLetter',
  'GET /fileletter/details'           : 'FileLetterController.getFileLetterDetails',
  'PUT /fileletter/details'           : 'FileLetterController.updateFileLetterDetails',
  'DELETE /fileletter'                : 'FileLetterController.deleteFileLetter',

  'POST /visitationrequest'   : 'VisitationRequestController.createVisitationRequest',
  'PUT /visitationrequest'    : 'VisitationRequestController.updateVisitationRequest',
  'GET /visitationrequests': 'VisitationRequestController.getVisitationRequests',
  'GET /faster/visitationrequests': 'VisitationRequestController.getFastVisitationRequests',
  'GET /visitationrequest'    : 'VisitationRequestController.getVisitationReqById',
  'DELETE /visitationrequest' : 'VisitationRequestController.deleteVisitaionRequest',


  'POST /scheduledvisitationdetails'          : 'ScheduledVisitationDetailController.createScheduledVisitationDetail',
  'PUT /scheduledvisitationdetails'           : 'ScheduledVisitationDetailController.updateScheduledVisitaionDetail',
  'DELETE /scheduledvisitationdetails'        : 'ScheduledVisitationDetailController.deleteScheduledVisitationDetail',
  'PUT /scheduledvisitationdetails/status'    : 'ScheduledVisitationDetailController.updateScheduledVisitaionDetailStatus',
  'GET /scheduledvisitation/details'          : 'ScheduledVisitationDetailController.getScheduledVisitationDetailById',
  'GET /user/scheduledvisitationdetails'      : 'ScheduledVisitationDetailController.getUserScheduledVisitationDetails',
  'GET /scheduledvisitationdetails/joined'    : 'ScheduledVisitationDetailController.getScheduledVisitationDetailJoined',
  'GET /scheduledvisitationdetail'            : 'ScheduledVisitationDetailController.getScheduledVisitationDetail',

  'POST /ride'               : 'RideController.createRide',
  'PUT /ride'                : 'RideController.updateRide',
  'GET /rides'               : 'RideController.getRides',
  'GET /ride'                : 'RideController.getRideById',
  'PUT /ride/calcaulatemiles': 'RideController.calculateTraveled',
  'PUT /ride/confirmmiles'   : 'RideController.confirmMiles',
  'PUT /ride/status'         : 'RideController.updateRideStatus',

  'GET /user/rides': 'RideController.getUserRides',

  'GET /scheduledvisitation/ride': 'RideController.scheduledVisitationRide',
  'DELETE /ride'                 : 'RideController.deleteRide',

  'POST /ride/comment'    : 'RideCommentController.createRideComment',
  'GET /ride/comments'    : 'RideCommentController.getRideComments',
  'GET /user/ridecomments': 'RideCommentController.getUserRideComments',
  'GET /ridecomment'      : 'RideCommentController.getRideComment',
  'PUT /ridecomment'      : 'RideCommentController.updateRideComment',
  'DELETE /ridecomment'   : 'RideCommentController.deleteRideComment',
  'GET /ride/comment'     : 'RideCommentController.getRideCommentById',

  'POST /ridedetails'     : 'RideDetailController.createRideDetail',
  'GET /ride/ridedetails' : 'RideDetailController.getRideDetails',
  'GET /ridedetails'      : 'RideDetailController.getRideDetailById',

  'GET /ride/joined'       : 'RideDetailController.rideJoined',
  'PUT /ridedetails'       : 'RideDetailController.updateRideDetailAnonymous',
  'DELETE /ridedetails'    : 'RideDetailController.deleteRideDetail',
  'PUT /ridedetails/status': 'RideDetailController.updateRideDetailStatus',

  'POST /personalrequest/comment'    : 'PersonalRequestCommentController.createPRComment',
  'GET /personalrequest/comments'    : 'PersonalRequestCommentController.getPRComments',
  'GET /personalrequestcomment'      : 'PersonalRequestCommentController.getPRComment',
  'PUT /personamrequestcomment'      : 'PersonalRequestCommentController.updateComment',
  'DELETE /personalrequestcomment'   : 'PersonalRequestCommentController.deleteComment',
  'GET /user/personalrequestcomments': 'PersonalRequestCommentController.getPersonalComments',

  'POST /paymentmethod'       : 'UserPaymentMethodController.createPaymentMethod',
  'GET /user/paymentmethod'   : 'UserPaymentMethodController.getUserPaymentMethods',
  'GET /paymentmethod'        : 'UserPaymentMethodController.getPaymentMethod',
  'PUT /paymentmethod'        : 'UserPaymentMethodController.updatePaymentMethod',
  'PUT /paymentmethod/default': 'UserPaymentMethodController.updateDefaultPaymentMethod',

  'POST /donation/comment'    : 'DonationCommentController.createDonationComment',
  'GET /donation/comments'    : 'DonationCommentController.getDonComments',
  'GET /user/donationcomments': 'DonationCommentController.getUserDonationComments',
  'GET /donationcomment'      : 'DonationCommentController.getDonCommentInfo',
  'PUT /donationcomment'      : 'DonationCommentController.updateDonComment',
  'DELETE /donationcomment'   : 'DonationCommentController.deleteDonComment',

  'POST /personalrequest'  : 'PersonalRequestController.createPersRequest',
  'GET /personalrequests'  : 'PersonalRequestController.getPersonalRequests',
  'GET /personalrequest'   : 'PersonalRequestController.getPersonalRequest',
  'PUT /personalrequest'   : 'PersonalRequestController.updatePersonalRequest',
  'DELETE /personalrequest': 'PersonalRequestController.deletePersonalRequest',

  'GET /user/transactions': 'UserTransactionController.getUserTransactions',

  'POST /inmate/donation': 'InmateDonationController.createDonation',
  'GET /inmate/donations': 'InmateDonationController.getInmateDonations',
  'GET /inmatedonation'  : 'InmateDonationController.getDonationInfo',

  'POST /personalrequestdetails'    : 'PersonalrequestDetailController.createPRDetail',
  'GET /personalrequest/details'    : 'PersonalrequestDetailController.getDetails',
  'GET /user/personalrequestdetails': 'PersonalrequestDetailController.getUserDetails',
  'GET /personalrequestdetails'     : 'PersonalrequestDetailController.getPersonalRequestDetails',

  'GET /donations': 'DonationController.getDonations',
  'GET /donation' : 'DonationController.getDonation',
  'POST /donation': 'DonationController.createDonation',

  'GET /alldonations': 'DonationController.getAllDonations'





  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
