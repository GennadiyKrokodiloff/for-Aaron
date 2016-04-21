var azureConfig  = require('./azureData').azureData,
	fs 			 = require('fs'),
	path         = require('path'),
	randomstring = require('randomstring'),
	azure 		 = require('azure-storage');

require('./azureStorage');

function AzureManager() {
	this.init();
};

AzureManager.prototype.init = function () {
	this.blobService = azure.createBlobService();

	this.checkUploadDir();
};

AzureManager.prototype.createBlobService = function () {
	return azure.createBlobService();
};

AzureManager.prototype.deleteBlob = function (fileName, call) {
	this.blobService.deleteBlob(azureConfig.container, fileName, function (err, res) {
		if (err) {
			return call(null, {
				'code'		: err.code,
				'statusCode': err.statusCode 
			});
		}

		call(null);
	});
};

AzureManager.prototype.getAllStoredFiles = function (config, call) {
  this.blobService.listBlobsSegmented(azureConfig.container, config || {}, call);
};

AzureManager.prototype.checkUploadDir = function () {

	if (!this.isDirExist(azureConfig.uploadDir)) {
		this.makeDirectory(azureConfig.uploadDir);
	}
};

AzureManager.prototype.isDirExist = function (path) {
	try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
};

AzureManager.prototype.makeDirectory = function (path) {
	var isWithErrors = fs.mkdirSync(path);

	if (isWithErrors) {
		console.log('Cannot create dir - ' + path);
	}
};

AzureManager.prototype.uploadNewFile = function (file, call) {
	var fileNameLength = 20,
		fileName 	   = randomstring.generate({
			'length' : fileNameLength,
			'charset': 'alphabetic' 
		}),
		self           = this;

	async.auto({
		isContainerExist: function (next) {
			self.blobService.createContainerIfNotExists(azureConfig.container, function (err, result, response) {
				if (err) { return next(err); }

				next(null, result);
			});
		},
		upload: ['isContainerExist', function (next, data) {

			self.blobService.createBlockBlobFromLocalFile(azureConfig.container, fileName, file, function (err, result, response) {
				if (err) { return next(err); }

				next(null, {
					'result'  : result,
					'response': response,
					'filePath': self.generateFilePath(result)

				});

			});
		}]
	}, function (err, data) {
		if (err) { return call(err); }

		call(null, data.upload);
	});
	
};

AzureManager.prototype.generateFilePath = function (fileName) {
	var connectString = azureConfig.AZURE_STORAGE_CONNECTION_STRING,
		accName 	  = azureConfig.STORAGE_ACCOUNT_NAME,
		container     = azureConfig.container;

	return connectString({ 'accountName': accName }) + container + '/' + fileName;
};

module.exports.azureManager = new AzureManager;