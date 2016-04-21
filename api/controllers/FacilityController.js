var _ = require('lodash');

module.exports = {
  createFacility: createFacility,
  getFacilities: getFacilities,
  searchFacilities: searchFacilities,
  getFacilityDetails: getFacilityDetails,
  deleteFacility: deleteFacility,
  getFacilityNames:getFacilityNames,
  updateFacilityFullName: updateFacilityFullName,
  updateFacilityFacilityType: updateFacilityFacilityType,
  updateFacilityStreatNumber: updateFacilityStreatNumber,
  updateFacilityAddress: updateFacilityAddress,
  updateFacilityAddress2: updateFacilityAddress2,
  updateFacilityCity: updateFacilityCity,
  updateFacilityState: updateFacilityState,
  updateFacilityStatus: updateFacilityStatus,
  updateFacilityZIP: updateFacilityZIP,
  updateFacilityNote : updateFacilityNote,
  getFacilityStates : getFacilityStates

}


/**
 * @type POST
 * @param req
 * @param res
 */
function createFacility(req, res) {
  var facilityData = _.pick(req.body, FacilityService.creationAllowedField);

  console.log(facilityData)
  if ( !CommonUtils.isReqFieldsPresents_(FacilityService.creationReqField, _.keys(facilityData)) ) {
    return res.sendError({ 'message': 'not all required fields present' });
  }

  async.auto({
    generFacilitData: function (next) {
      next( null, FacilityService.generFacilityData(facilityData) );
    },
    createFacility: ['generFacilitData', function (next, data) {
      data.generFacilitData.CreatedByUser = req.user.UserId;

      Facility.create(data.generFacilitData).exec(next);
    }]
  }, function (err, data) {
    if (err) {
      if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

      return res.sendError({ 'message': 'some err', 'err': err });
    }

    res.success(data.createFacility);
  });

}

/**
 * @type GET
 * @param req
 * @param res
 */
function getFacilities(req, res) {
  var offset  = req.query.offset || 0,
    perpage   = req.query.perpage || 20,
    sortby    = req.query.sortby,
    sortorder = req.query.sortorder || 'asc';

  var sortTpl = {
    desc: 'DESC',
    asc: 'ASC'
  }


  var sort = '';
  var tpl = _.invert(FacilityService.sortbyTemplate);

  if ( _.some(_.values(FacilityService.sortbyTemplate), function (templSort) {
    return templSort == sortby;
  }) ) {
    sort = tpl[sortby];

    if (sortorder == 'desc' || 'asc') {
      sort = sort + ' ' + sortTpl[sortorder];
    }
  }

  async.waterfall([function (next) {

    Facility
      .find(null)
      .sort(sort)
      .skip(offset)
      .limit(perpage)
      .exec(next);
  }, function getStrordAmount (facilities, next) {

    Facility.count(null).exec(function (err, amount) {
      if (err) { return next(err); }

      next(null, {
        'totalCount': amount,
        'facilities': facilities
      });

    });

  }], function (err, data) {
    if (err) { return res.sendError({ 'message': 'some err', 'err': err }); }

    var facilityObj = _.map(data.facilities, function (facility) {
      return facility;
        // return {
        //   'FacilityId'  : facility.FacilityId,
        //   'Fullname'    : facility.FullName,
        //   'Address'     : facility.Address,
        //   'Status'      : facility.Status,
        //   'State'       : facility.State,
        //   'FacilityType': facility.FacilityType
        // };
      });

      res.success({
        'facilities': facilityObj,
        'totalCount': data.totalCount
      });
  });

}


/**
 *Type DELETE
 * @param req
 * @param res
 * @returns {*}
 */
function deleteFacility (req, res) {
  var facilityId = req.body.facilityId;

  if(!facilityId) {
    return res.sendError({message: 'required fileds not found'})
  }

  var query = {
    'FacilityId' : facilityId
  }

  async.parallel([
    function (callback) {
      Inmate.count(query).exec(callback)
    },
    function (callback) {
      ScheduledVisitation.count(query).exec(callback)
    },
    function (callback) {
      Ride.count(query).exec(callback)
    }
  ], function (err, result) {
    if(err) {
      return res.sendError({message: 'could count all references for facility to be deleted', err: err})
    }

   var isreferenced = result.every(function (value, index) {
      return value === 0;
    });
    if(!isreferenced) {
      return res.sendError({message: 'facility already reference elsewhere'})
    }

    Facility.destroy(query).exec(function (err, deletedFacility) {
      if(err || !deletedFacility) {
        return res.sendError({
          'message': 'could not deleteFacilty',
          'err'    : err || 'facility not found'
        });
      }

      return res.success(deletedFacility);
    });
  });
}

/**
 * type: GET
 * @param req
 * @param res
 */

function searchFacilities (req, res) {

  var sortedFields = ['offset', 'perpage', 'sortBy', 'sortOrder', 'fullname', 'address', 'state', 'type','searchOperator'],
      params       = _.pick(req.query, sortedFields),
      searchObj    = {
        'FullName': {
          'contains': params.fullname
        },
        'Address' : {
          'contains': params.address
        },
        'State'   : {
          'contains': params.state
        },
        'FacilityType'   : {
          'contains': params.type
        }
      };

  FacilityService.getFacilSearchDetails(params, searchObj, function (err, facilitiesInfo) {
    if (err) { return res.sendError({ 'message': 'some err', 'err': err }); }

    res.success(facilitiesInfo);
  });

}

/**
 * type GET
 * @desc for getting facility with comments and facility customfields
 * @param req
 * @param res
 */
function getFacilityDetails (req, res) {
  var facilityId = req.query.facilityId;

  if(!facilityId) {
    return res.sendError({message: 'facilityId required'});
  }

  FacilityService.getFacilityDetails(facilityId, function (err, facility) {

    if (err) {
      if ( _.isString(err) ) { return res.sendError({ 'message': err }); }

     return res.sendError({ 'message': 'some error', 'err': err });
    }

     return  res.success(facility);
  });

}


function updateFacilityFullName (req, res) {
  var FacilityId = req.body.facilityId;
  var FullName = req.body.fullName;

  if (!FacilityId || !FullName) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {FullName: FullName})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}
function updateFacilityFacilityType (req, res) {
  var FacilityId = req.body.facilityId;
  var FacilityType = req.body.facilityType;

  if (!FacilityId || !FacilityType) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {FacilityType: FacilityType})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}
function updateFacilityStreatNumber (req, res) {
  var FacilityId = req.body.facilityId;
  var StreatNumber = req.body.streatNumber;

  if (!FacilityId || !StreatNumber) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {StreatNumber: StreatNumber})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}
function updateFacilityAddress (req, res) {
  var FacilityId = req.body.facilityId;
  var Address = req.body.address;

  if (!FacilityId || !Address) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {Address: Address})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}


function updateFacilityAddress2 (req, res) {
  var FacilityId = req.body.facilityId;
  var Address2 = req.body.address2;

  if (!FacilityId || !Address2) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {Address2: Address2})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}

function updateFacilityCity (req, res) {
  var FacilityId = req.body.facilityId;
  var City = req.body.city;

  if (!FacilityId || !City) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {City: City})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}


function updateFacilityState (req, res) {
  var FacilityId = req.body.facilityId;
  var State = req.body.state;

  if (!FacilityId || !State) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {State: State})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}


function updateFacilityZIP (req, res) {
  var FacilityId = req.body.facilityId;
  var ZIP = req.body.zip;

  if (!FacilityId || !ZIP) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {ZIP: ZIP})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}

function updateFacilityStatus (req, res) {
  var FacilityId = req.body.facilityId;
  var Status = req.body.status;

  if (!FacilityId || !Status) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {Status: Status})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}

function updateFacilityNote (req, res) {
  var FacilityId = req.body.facilityId;
  var Note = req.body.note;

  if (!FacilityId || !Note) {
    return res.sendError({message: 'required fields not present'})
  }

  Facility.update({FacilityId: FacilityId}, {Note: Note})
    .exec(function (err, updatedFacility) {
      if(err) {
        return res.sendError({message: 'could not update Facility ', err: err})
      }

      return res.success(updatedFacility)
    })

}


function getFacilityNames (req, res) {
  var name = req.query.name;

  if(!name) {
    return res.sendError({message: 'name is requeired'})
  }

  Facility.find({
    FullName : {
    'contains' : name
  }})
    .limit(10)
    .exec(function (err, foundFacilities) {
    if(err) {
      return res.sendError({message: 'error finding facilities', err:err})
    }
    foundFacilities = _.map(foundFacilities, function (valueObj) {
      return {
        FullName: valueObj.FullName,
        FacilityId: valueObj.FacilityId,
        Address: valueObj.Address
      }
    });
    return res.success(foundFacilities)
  })


}

function getFacilityStates(req, res) {
  Facility.find().exec(function(err, states) {
    states = _.pluck(states, 'State');
    states = _.uniq(states);
    return res.success(states);
  })
}






















