

// ============================ Load internal module ================= //

const jwt = require("jsonwebtoken");
const exceptions = require("./customExceptions");
const { JWT_SECRET_KEY, SSO_TOKEN_KEY } = require("../config/config");
const constants = require("../constants");
const redisClient = require("../utils/redis");
const messages = require("../messages");

// ============================= End ================================= //

// Generate token
const generateToken = async (data, msg) => {
  try {
    const jwtToken = jwt.sign({ id: data.id, role: data.role }, JWT_SECRET_KEY);
    data.token = jwtToken;
    await redisClient.setJWTToken(data);
    return jwtToken;
  } catch (err) {
    throw exceptions.internalServerError(messages.tokenGenException);
  }
};


const verifyToken = async (token) => {
  try {
    const checkToken = await redisClient.getValue(token);
    if (!checkToken)
      throw exceptions.unAuthenticatedAccess(messages.unauthorized, constants.STATUS_CODE.INVALID_TOKEN)
    return await jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    throw e;
  }
};

// Export module
module.exports = {
  generateToken,
  verifyToken,
};

