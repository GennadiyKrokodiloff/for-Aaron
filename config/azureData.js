var _    = require('lodash'),
	path = require('path');


module.exports.azureData = {
	'STORAGE_ACCOUNT_NAME'			 : 'lasurim',
	'STORAGE_ACCOUNT_ACCESS_KEY'	 : 'amFlhLNWAKp842UeNf6aew51EozgRNDd7QLjdb3FSGS0oM2aShagTBsOPmHsOiPTFTWUROje+KlypOVQdIdQxQ==',
	'AZURE_STORAGE_CONNECTION_STRING': _.template('https://<%=accountName%>.blob.core.windows.net/'),
	'container' 				 	 : 'files',
	'uploadDir'						 : path.normalize(__dirname + '/../upload')

};