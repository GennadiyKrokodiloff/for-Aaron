var azureConfig  = require('./azureData').azureData;

initEnvVariables();

function initEnvVariables () {
	var accName 	 = azureConfig['STORAGE_ACCOUNT_NAME'],
		accAccessKey = azureConfig['STORAGE_ACCOUNT_ACCESS_KEY'];

	process.env['AZURE_STORAGE_ACCOUNT'] 		   = accName;
	process.env['AZURE_STORAGE_ACCESS_KEY'] 	   = accAccessKey;
	// process.env['AZURE_STORAGE_CONNECTION_STRING'] = azureConfig['AZURE_STORAGE_CONNECTION_STRING']({ 'accountName': accName });
};