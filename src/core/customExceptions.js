
const Exception = require("./Exception");
const { ERROR_TYPE} = require("../constants");




module.exports = {
  internalServerError(err,errMsg) {
    return new Exception(ERROR_TYPE.INTERNAL,errMsg || "Please try after sometime", err);
  },
  badRequestError(errMsg,err) {
    return new Exception(ERROR_TYPE.BAD_REQUEST,errMsg||"Bad request",err);
  },
  unAuthenticatedAccess(errMsg,err) {
    return new Exception(ERROR_TYPE.UNAUTHORIZED,errMsg || "Unauthorized access", err);
  },
  forbiddenAccess(errMsg,err) {
    return new Exception(ERROR_TYPE.FORBIDDEN,errMsg || "Forbidden access", err);
  },
  notFoundError(errMsg,err) {
    return new Exception(ERROR_TYPE.NOT_FOUND,errMsg || "No route found", err);
  },
  // conflictError(errMsg,err){
  //   return new Exception(ERROR_TYPE., errMsg || "duplicate entry not allowed", err);
  // },
};


