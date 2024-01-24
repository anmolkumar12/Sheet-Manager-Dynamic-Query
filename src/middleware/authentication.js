
// //= ========================= Load Modules Start ===========================

// //= ========================= Load external Module =========================

// //= ========================= Load internal Module =========================

const constants = require("../constants");
const jwtHandler = require("../core/jwtHandler");
const exceptions = require("../core/customExceptions");
const messages = require("../messages");
const redisClient = require("../utils/redis");
// const { ROLES } = require("../constants");


// //= ========================= Load Modules End =============================


// This function is used to authenticate and authorize token
const authenticateAndAuthorizeToken = () => {
  return async function (req, res, next) {
    try {
      const jwtToken = req.get("Authorization");
      console.log(jwtToken,'jwtToken')
      req.user = await jwtHandler.verifyToken(jwtToken);

      console.log(req.user, "tokenDecoded");
      
      // if (authorizedRoles.includes(req.user.role)) {
        // console.log(req.user.id)
        const userData = await redisClient.getValue(`user_${req.user.id}`);
        let userDetails = JSON.parse(userData);
        // if(req.user.role == ROLES.VENDOR) req.user.email = userDetails.email;
        if (userDetails.status != constants.STATUS.ACTIVE)
          throw exceptions.unAuthenticatedAccess(messages.inactiveAccount);
        next();
      // }
      // else
      //   throw exceptions.forbiddenAccess(messages.forbiddenAccess)
    } catch (e) {
      next(e);
    }
  }
};

// //= ========================= Export Module Start ===========================

module.exports = {
  authenticateAndAuthorizeToken,
};

// //= ========================= Export Module End ===========================

