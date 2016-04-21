
module.exports = {
  createFacilityCustomField :   createFacilityCustomField,
  getFacilityCustomFields: getFacilityCustomFields,
  updateFacilityCustomField:updateFacilityCustomField,
  deleteFacilityCustomField: deleteFacilityCustomField
}


function createFacilityCustomField (req, res) {
  var facilityId = req.body.facilityId,
      name       = req.body.name,
      value      = req.body.value;
  if(!facilityId || !name || !value) {
    return res.sendError({message: 'missing requiredFields'})
  }

  var customFieldToCreate = {
      FacilityId : facilityId,
      Name       : name,
      Value      : value
  };

  customFieldToCreate.CreatedByUser = req.user;

  FacilityCustomField.create(customFieldToCreate)
    .exec(function (err, createdCustomField) {
      if(err || !createdCustomField) {
        return res.sendError({message: 'could not create FacilityCustomField', err: err});
      }

    return  res.success(createdCustomField);
    })
}


function getFacilityCustomFields (req, res) {
  var facilityId = req.query.facilityId;

  if(!facilityId) {
    return res.sendError({message: 'facilityId is required'});
  }
  FacilityCustomField.find({FacilityId: facilityId})
    .exec(function (err, foundFields) {
      if(err || !foundFields) {
        return res.sendError({message: 'error finding customFields', err: err})
      }

      return res.success(foundFields);
    })

}

function updateFacilityCustomField (req, res) {
  var facilityCustomFieldId = req.body.facilityCustomFieldId;
  if(!facilityCustomFieldId) {
    return res.sendError({message: 'facilityId is required'});
  }
  if (!req.body.name || !req.body.value){
    return res.sendError({message: '"name" or "value" is empty'})
  }

  var customFieldTpl = {
    name: 'Name',
    value: 'Value'
  }

  var dataKeys = ['name', 'value'];

  var fields = _.pick(req.body, dataKeys);
  // console.log(fields);
  
  fields = _.omit(fields, _.undefined);
  console.log(fields);

  var data = {};

  _.each(fields, function(value, key) {
      key = customFieldTpl[key] || key;
      data[key] = value;
  });

  FacilityCustomField.update({FacilityCustomFieldId: facilityCustomFieldId}, data)
    .exec(function(err, updatedCustomFiled) {
      console.log('here')
      if(err) {
        console.log(err);
        return res.sendError({message: 'error updating fileds', err: err})
      }
      console.log(updatedCustomFiled);
      return res.success(updatedCustomFiled);
    })

}

function deleteFacilityCustomField (req, res) {
  var facilityCustomFieldId = req.body.facilityCustomFieldId;

  FacilityCustomField.find(null).exec(function (err, customFields) {
    if (err) { return console.log(err); }

    console.log(customFields);
  });

  if(!facilityCustomFieldId) {
    return res.sendError({message: 'facilityCustomFieldId is required'});
  }

  FacilityCustomField.destroy({ 'FacilityCustomFieldId' : facilityCustomFieldId })
    .exec(function (err, deletedCustomFiled) {
      if(err || !deletedCustomFiled) {
        if (!deletedCustomFiled.length ) { 
          return res.sendError({ 'message': 'Custom field with such id was not found' }); 
        }

        return res.sendError({message: 'error deleted facilitycustomfield', err: err})
      }

      return res.success(deletedCustomFiled);
    })
}
