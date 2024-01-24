const APIResponse = require("./APIResponse");
const exception = require("./customExceptions");
const { STATUS_CODE, ERROR_TYPE, RESPONSE_STATUS } = require("../constants");

let result;

function sendResponse(res, rslt) {
  err = rslt && rslt.error;
  if (err) {
    switch (err.errorType) {
      case ERROR_TYPE.UNAUTHORIZED:
        return res.status(RESPONSE_STATUS.UNAUTHORIZED).send(rslt);
      case ERROR_TYPE.INTERNAL:
        return res.status(RESPONSE_STATUS.INTERNAL_ERROR).send(rslt);
      case ERROR_TYPE.BAD_REQUEST:
        return res.status(RESPONSE_STATUS.BAD_REQUEST).send(rslt);
      case ERROR_TYPE.FORBIDDEN:
        return res.status(RESPONSE_STATUS.FORBIDDEN).send(rslt);
      case ERROR_TYPE.NOT_FOUND:
        return res.status(RESPONSE_STATUS.NOT_FOUND).send(rslt);  
      default:
        console.log("default error type");
    }
  }
  // send status code 200
  return res.status(RESPONSE_STATUS.SUCCESS).send(rslt);
}

function sendError(res, err) {
  if (!err.errorType) {
    console.log("unhandled error = ", err);
    err = exception.internalServerError(err)
  }
  result = new APIResponse(STATUS_CODE.ERROR, err);
  sendResponse(res, result);
}

function sendError_200(res, err) {
  if (!err.errorType) {
    console.log("unhandled error = ", err);
    err = exception.internalServerError(err)
  }
  result = new APIResponse(STATUS_CODE.SUCCESS, err);
  sendResponse(res, result);
}

function hndlError(err, req, res, next) {
  // unhandled error
  sendError(res, err);
}

function sendSuccess(res, result) {
  result = new APIResponse(STATUS_CODE.SUCCESS, result);
  sendResponse(res, result);
}

function sendSuccessWithMsg(res, msg) {
  rslt = { message: msg };
  result = new APIResponse(STATUS_CODE.SUCCESS, rslt);
  sendResponse(res, result);
}

module.exports = {
  sendResponse,
  sendError,
  hndlError,
  sendSuccess,
  sendSuccessWithMsg,
  sendError_200,
}