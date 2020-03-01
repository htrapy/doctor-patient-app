const Joi = require('joi');

const constants = require('./constants');

const errorHandler = function (err) {
  console.log(err)
  const res = {
    status: constants.responseFlags.BAD_REQUEST,
    message: constants.responseMessages.BAD_REQUEST,
    data: {}
  }

  if (typeof(err) == 'object') {
    res.status = err && err.status ?  err.status : res.status;
    res.message = err && err.message ? err.message : res.message;
    res.data = err && err.data ? err.data : res.data;
  }
  
  if (typeof(err) == 'string') {
    res.message = err;
  }
  return res;
};

const successHandler = function (res) {
  return customResponse({ data: res });
};

const customResponse = function (res) {
  return {
    status: res.status || constants.responseFlags.ACTION_COMPLETE,
    message: res.message || constants.responseMessages.ACTION_COMPLETE,
    data: res.data || {}
  };
};

const failActionFunction = function (request, h, error) {
    console.log(error);
    if (error && error.isJoi && Array.isArray(error.details) && error.details.length > 0) {
        return h.response({
            message: constants.responseMessages.PARAMETER_MISSING,
            status: constants.responseFlags.PARAMETER_MISSING,
            data: error.details[0].message.replace(/["]/ig, ''),
        }).takeover();
    }
    return h.response(error).takeover();
};

const authorizationHeaderObj = Joi.object({
  authorization: Joi.string().required(),
}).unknown();

module.exports = {
  errorHandler,
  successHandler,
  customResponse,
  failActionFunction,
  authorizationHeaderObj
};
