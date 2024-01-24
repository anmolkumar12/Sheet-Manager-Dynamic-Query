//= ========================= Load Modules Start =======================

const resHndlr = require("../core/resHandler");
const { ROUTE_PREFIX } = require("../constants");
const tableRoute = require("./tableRoute");
//= ========================= Export Module Start ==============================

module.exports = function (app) {
  app.use(`${ROUTE_PREFIX}sheet`, tableRoute);
  app.use(resHndlr.hndlError);
};

//= ========================= Export Module End ===============================
